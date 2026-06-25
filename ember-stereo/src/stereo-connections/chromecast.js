import { isTesting, macroCondition } from '@embroider/macros';
import BaseSound from './base';
import DeadReckonClock from '../-private/utils/dead-reckon-clock';
import { getMimeType } from '../-private/utils/mime-types';

// The receiver reports IDLE on stop as well as on finish, so only an IDLE near the media's end counts as 'ended'.
const END_TOLERANCE_MS = 1500;

/**
 * Plays through a Google Cast session — no `<audio>` element; the media runs on the device. Many of these share ONE session through a {@link SharedCastAccess} (`options.castAccess`), which owns the single `RemotePlayer`/`RemotePlayerController`; this connection only drives or relays it while it `hasControl`.
 *
 * @class Chromecast
 * @extends BaseSound
 */
export default class Chromecast extends DeadReckonClock(BaseSound) {
  static key = 'Chromecast';
  static toString() {
    return 'Chromecast';
  }

  // Force-injected by the service while casting; never gates on mime.
  static canPlay() {
    return true;
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

  // Only the owner may touch the controller or relay its events; with no registry at all (a bare unit test) everything is permitted.
  get _hasControl() {
    let access = this._access;
    return !access || access.hasControl(this);
  }

  setup() {
    let access = this._access;
    if (!access || !access.session) {
      throw new Error('Chromecast connection requires an active Cast session');
    }

    // Releases the prior owner, which pauses itself.
    let player = access.requestControl(this);

    if (
      player?.mediaInfo &&
      this.urlsAreEqual(player.mediaInfo.contentId, this.url)
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
    mediaInfo.metadata = new chromeCast.media.GenericMediaMetadata();
    let metadata = this.metadata || {};
    if (metadata.title) {
      mediaInfo.metadata.title = metadata.title;
    }
    if (metadata.artist) {
      mediaInfo.metadata.subtitle = metadata.artist;
    }
    // Helps the receiver pick its HLS pipeline.
    if (contentType.includes('mpegurl')) {
      mediaInfo.hlsSegmentFormat = 'aac';
    }

    let request = new chromeCast.media.LoadRequest(mediaInfo);
    // On a real receiver a post-load playOrPause doesn't reliably start playback, so autoplay and let the swap's play()/pause() reconcile to intent.
    request.autoplay = true;
    // Load at the handoff position; a post-load seek on a just-started session is unreliable.
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

  // ---- controller events (dispatched by SharedCastAccess to the owner only) ---

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

  // Pauses locally only — never touch the session the new owner now runs — so isPlaying flips and the position loop exits.
  releaseControl() {
    this._access?.releaseControl(this);
    this.trigger('audio-paused', { sound: this });
  }

  _isGenuineEnd() {
    let player = this._player;
    if (!player || !isFinite(player.duration) || player.duration <= 0) {
      return false;
    }
    return player.currentTime * 1000 >= player.duration * 1000 - END_TOLERANCE_MS;
  }

  // ---- clock ----------------------------------------------------------------

  // A live stream's remote currentTime restarts per session, so carry elapsed across a backend swap; seekable media uses the remote clock.
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

  // ---- playback (state is driven by the controller events) -------------------

  play() {
    let states = window.chrome.cast.media.PlayerState;
    this.debug(`play (state=${this._player?.playerState}, control=${this._hasControl})`);
    if (!this._hasControl) {
      return;
    }
    // During load (IDLE/BUFFERING) a redundant play() would playOrPause-toggle the autoplaying session into a pause.
    if (this._player?.playerState === states.PAUSED) {
      this._controller?.playOrPause();
    }
  }

  pause() {
    let states = window.chrome.cast.media.PlayerState;
    this.debug(`pause (state=${this._player?.playerState}, control=${this._hasControl})`);
    if (!this._hasControl) {
      return;
    }
    if (this._player?.playerState === states.PLAYING) {
      this._controller?.playOrPause();
    }
  }

  stop() {
    // Pause only — the session outlives any single sound; the service's stopCasting ends it.
    this.pause();
  }

  teardown() {
    this._access?.releaseControl(this);
    this.trigger('_will_destroy', { sound: this });
    this.isDestroyed = true;
  }

  urlsAreEqual(url1, url2) {
    if (!url1 || !url2) {
      return false;
    }
    let parser1 = document.createElement('a');
    let parser2 = document.createElement('a');
    parser1.href = url1;
    parser2.href = url2;
    return parser1.href === parser2.href;
  }
}
