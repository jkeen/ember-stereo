import { isTesting, macroCondition } from '@embroider/macros';
import BaseSound from './base';
import isSameAudio from '../-private/utils/is-same-audio';
import DeadReckonClock from '../-private/utils/dead-reckon-clock';
import { getMimeType } from '../-private/utils/mime-types';
import { loadCastSdk } from '../-private/utils/cast-sdk-loader';

// The receiver reports IDLE on stop as well as on finish, so only an IDLE near the end counts as 'ended'.
const END_TOLERANCE_MS = 1500;

/**
 * Plays through a Google Cast session, with media playing directly on the device.
 *
 * @class Chromecast
 * @extends BaseSound
 */
export default class Chromecast extends DeadReckonClock(BaseSound) {
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
      return;
    }

    this._loadMedia(access.session);
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
    this._anchor(positionMs);
    this._position = positionMs;
  }

  _currentPosition() {
    if (this.isStream) {
      return this.isPlaying ? this._estimate() : this._anchorMs;
    }
    return (this._player?.currentTime || 0) * 1000;
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
    this.debug(
      `play (state=${this._player?.playerState}, control=${this._hasControl})`
    );
    if (!this._hasControl) {
      return;
    }
    // During IDLE or BUFFERING a redundant play() toggles the autoplaying session into a pause.
    if (this._player?.playerState === states.PAUSED) {
      this._controller?.playOrPause();
    }
  }

  pause() {
    let states = window.chrome.cast.media.PlayerState;
    this.debug(
      `pause (state=${this._player?.playerState}, control=${this._hasControl})`
    );
    if (!this._hasControl) {
      return;
    }
    if (this._player?.playerState === states.PLAYING) {
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
