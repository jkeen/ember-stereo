import { isTesting, macroCondition } from '@embroider/macros';
import BaseSound from './base';
import isSameAudio from '../-private/utils/is-same-audio';
import RemotePosition from '../-private/casting/remote-position';
import { getMimeType } from '../-private/utils/mime-types';
import { loadCastSdk } from '../-private/casting/google-cast-sdk-loader';

// The receiver reports IDLE on stop as well as on finish, so only an IDLE near the end counts as 'ended'.
const END_TOLERANCE_MS = 1500;

/**
 * Plays through a Google Cast session, with media playing directly on the device.
 *
 * @class Chromecast
 * @extends BaseSound
 */
export default class Chromecast extends BaseSound {
  static key = 'Chromecast';
  static toString() {
    return 'Chromecast';
  }

  static canPlay() {
    return true;
  }

  static preload() {
    return loadCastSdk();
  }

  // setup() runs from the BaseSound constructor, before any class field initialiser.
  get _remotePosition() {
    return (this.__remotePosition ??= new RemotePosition());
  }

  get _access() {
    return this.options?.castAccess ?? null;
  }
  get _player() {
    return this._access?.player ?? null;
  }
  get _controller() {
    return this._access?.controller ?? null;
  }

  get _hasControl() {
    let access = this._access;
    return !access || access.hasControl(this);
  }

  _receiverMetadata() {
    let metadata = new window.chrome.cast.media.GenericMediaMetadata();
    let { title, artist } = this.metadata ?? {};
    if (title) {
      metadata.title = title;
    }
    if (artist) {
      metadata.subtitle = artist;
    }
    return metadata;
  }

  setup() {
    let access = this._access;
    if (!access || !access.session) {
      throw new Error('Chromecast connection requires an active Cast session');
    }

    let player = access.requestControl(this);

    if (
      player?.mediaInfo &&
      isSameAudio(player.mediaInfo.contentId, this.url, { exact: true })
    ) {
      this._onLoaded();
      // Announcing the play starts the position poll, and the Sound's connection setter re-announces it once assigned.
      if (
        player.playerState === window.chrome?.cast?.media?.PlayerState?.PLAYING
      ) {
        this.seedPosition((player.currentTime || 0) * 1000);
        this.trigger('audio-played', { sound: this });
      }
    } else {
      this._loadMedia(access.session);
    }
  }

  _loadMedia(session) {
    let chromeCast = window.chrome.cast;
    let contentType =
      this.options?.contentType || getMimeType(this.url) || 'audio/mpeg';

    let mediaInfo = new chromeCast.media.MediaInfo(this.url, contentType);
    mediaInfo.metadata = this._receiverMetadata();
    // Helps the receiver pick its HLS pipeline.
    if (contentType.includes('mpegurl')) {
      mediaInfo.hlsSegmentFormat = 'aac';
    }

    let request = new chromeCast.media.LoadRequest(mediaInfo);
    // A post-load play() doesn't reliably start a real receiver.
    request.autoplay = this.options?.autoplay ?? true;
    // A post-load seek on a just-started session is unreliable.
    let startMs = this.options?.startTime;
    if (startMs != null && isFinite(startMs) && startMs > 0) {
      request.currentTime = startMs / 1000;
    }

    session.loadMedia(request).then(
      () => this._onLoaded(),
      (error) =>
        this.trigger('audio-load-error', {
          sound: this,
          error: this._describeError(error),
        })
    );
  }

  _onLoaded() {
    this.trigger('audio-duration-changed', { sound: this });
    this.trigger('audio-ready', { sound: this });
    this.trigger('audio-loaded', { sound: this });
  }

  _describeError(error) {
    if (!error) {
      return 'Chromecast load error';
    }
    return error.description || error.code || String(error);
  }

  _onPlayerStateChanged() {
    let states = window.chrome.cast.media.PlayerState;
    this.debug(`player state: ${this._player?.playerState}`);
    switch (this._player?.playerState) {
      case states.PLAYING:
        this.trigger('audio-played', { sound: this });
        break;
      case states.PAUSED:
        this.trigger('audio-paused', { sound: this });
        break;
      case states.BUFFERING:
        this.isLoading = true;
        break;
      case states.IDLE:
        if (this._isGenuineEnd()) {
          this.trigger('audio-ended', { sound: this });
        } else {
          // A stopped stream reports IDLE, and another window pausing it must read as a pause here.
          this.trigger('audio-paused', { sound: this });
        }
        break;
    }
  }

  _onDurationChanged() {
    this.trigger('audio-duration-changed', { sound: this });
  }

  releaseControl() {
    this._access?.releaseControl(this);
    this.trigger('audio-paused', { sound: this });
  }

  _isGenuineEnd() {
    let player = this._player;
    if (!player || !isFinite(player.duration) || player.duration <= 0) {
      return false;
    }
    return (
      player.currentTime * 1000 >= player.duration * 1000 - END_TOLERANCE_MS
    );
  }

  // A live stream's remote currentTime restarts per session.
  seedPosition(positionMs) {
    this._remotePosition.seed(positionMs);
    this._position = positionMs;
  }

  _reportedPosition() {
    let player = this._player;
    return player ? (player.currentTime || 0) * 1000 : null;
  }

  _currentPosition() {
    return this._remotePosition.positionFor({
      reportedMs: this._reportedPosition(),
      isPlaying: this.isPlaying,
      isStream: this.isStream,
    });
  }

  _setPosition(positionMs) {
    this.debug(`seek -> ${positionMs}ms (control=${this._hasControl})`);
    if (this._hasControl && this._player && this._controller) {
      this._player.currentTime = positionMs / 1000;
      this._controller.seek();
    }
    return positionMs;
  }

  _audioDuration() {
    let duration = this._player?.duration;
    if (!duration || !isFinite(duration)) {
      return Infinity; // live stream
    }
    return duration * 1000;
  }

  _setVolume(volume) {
    if (macroCondition(isTesting())) {
      this.debug(`skipping set volume in test env: ${volume}`);
      return;
    }
    if (this._hasControl && this._player && this._controller) {
      this._player.volumeLevel = volume / 100;
      this._controller.setVolumeLevel();
    }
  }

  play() {
    let states = window.chrome.cast.media.PlayerState;
    let state = this._player?.playerState;
    this.debug(`play (state=${state}, control=${this._hasControl})`);
    if (!this._hasControl) {
      return;
    }
    // A paused live stream cannot rebuffer, and resuming one can end the whole session, so rejoin at the live edge with a fresh load.
    if (
      this.isStream &&
      state !== states.PLAYING &&
      state !== states.BUFFERING
    ) {
      this._loadMedia(this._access.session);
      return;
    }
    // During IDLE or BUFFERING a redundant play() toggles the autoplaying session into a pause.
    if (state === states.PAUSED) {
      this._controller?.playOrPause();
    }
  }

  pause() {
    let states = window.chrome.cast.media.PlayerState;
    let state = this._player?.playerState;
    this.debug(`pause (state=${state}, control=${this._hasControl})`);
    if (!this._hasControl) {
      return;
    }
    // Stop a live stream outright: a receiver holding a paused stream is a session waiting to die.
    if (this.isStream) {
      this._controller?.stop();
      this.trigger('audio-paused', { sound: this });
      return;
    }
    if (state === states.PLAYING) {
      this._controller?.playOrPause();
    }
  }

  stop() {
    this.pause();
  }

  teardown() {
    this._access?.releaseControl(this);
    this.trigger('_will_destroy', { sound: this });
    this.isDestroyed = true;
  }
}
