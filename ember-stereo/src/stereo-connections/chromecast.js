import { isTesting, macroCondition } from '@embroider/macros';
import BaseSound from './base';
import DeadReckonClock from '../-private/utils/dead-reckon-clock';
import { getMimeType } from '../-private/utils/mime-types';

// Honor an 'ended' only once the clock has reached the media's end (the receiver
// reports IDLE on stop too, not just finish).
const END_TOLERANCE_MS = 1500;

/**
 * A connection that plays through a Google Cast (Chromecast) session. It is NOT
 * element-based (no `<audio>`) — the media runs on the device. It is the exact
 * analogue of `NativeAudioCasting`: many of these share ONE session through a
 * {@link SharedCastAccess} (`options.castAccess`), the way the AirPlay
 * connections share one `<audio>` outlet through `SharedAudioAccess`. The shared
 * access owns the single `RemotePlayer`/`RemotePlayerController`; this connection
 * `requestControl`s it on setup and only drives/relays it while it `hasControl`.
 *
 * Built explicitly by the service while a Cast session is active and force-
 * injected at the top of the strategy waterfall (never the local fallback), so
 * `canPlay` is always true.
 *
 * @class Chromecast
 * @extends BaseSound
 */
export default class Chromecast extends DeadReckonClock(BaseSound) {
  static key = 'Chromecast';
  static toString() {
    return 'Chromecast';
  }

  // Only ever force-injected by the service while casting; never gates on mime.
  static canPlay() {
    return true;
  }

  // The shared Cast session/player/controller (one per session, service-owned).
  get _access() {
    return this.options?.castAccess ?? null;
  }
  get _player() {
    return this._access?.player ?? null;
  }
  get _controller() {
    return this._access?.controller ?? null;
  }

  // Are we the sound currently driving the shared session? Only the owner may
  // touch the controller or relay its events — the analogue of NativeAudio
  // owning the shared element. (No registry, e.g. a bare unit test, ⇒ active.)
  get _hasControl() {
    let access = this._access;
    return !access || access.hasControl(this);
  }

  setup() {
    let access = this._access;
    if (!access || !access.session) {
      throw new Error('Chromecast connection requires an active Cast session');
    }

    // Take control of the shared session; the prior owner is released (and
    // pauses itself) so only one sound ever drives the one media pipeline.
    let player = access.requestControl(this);

    // Already playing this exact media (a resume / re-take) — adopt it.
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
    // Auto-play on load: on a real receiver a post-load playOrPause doesn't
    // reliably start playback, so loading paused leaves it stuck (spinner +
    // paused). The receiver starts playing, fires PLAYING → audio-played; the
    // swap's play()/pause() then reconciles to the actual intent.
    request.autoplay = true;
    // Start at the handoff position (e.g. engaging cast mid-archive). Loading at
    // the position is reliable; a post-load seek on a just-started session isn't.
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
  // The shared access registers the controller listeners once and calls these on
  // the current owner, so a superseded sound never relays the session's state.

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

  // Lost control of the shared session to another sound. Pause ourselves locally
  // (do NOT touch the session — the new owner runs it now) so isPlaying flips
  // false and our dead-reckon position loop exits. Mirrors NativeAudio's
  // releaseControl → _onAudioPaused handoff.
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

  // ---- clock (anchor/estimate come from the DeadReckonClock mixin) -----------

  // Carry elapsed across a backend swap for a live stream (whose remote
  // currentTime restarts per session); seekable media uses the remote clock.
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
    // A sound that no longer holds control must not touch the shared session.
    if (!this._hasControl) {
      return;
    }
    // Only resume a genuine PAUSED. During load (IDLE/BUFFERING) a redundant
    // play() from the swap/app would playOrPause-toggle the autoplaying session
    // into a pause — so let autoplay proceed and only act on a real pause.
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
    // Pause only — the Cast session outlives any single sound (feed switches
    // reuse it); the session is ended explicitly by the service's stopCasting.
    this.pause();
  }

  // Released during a swap or superseded by a newer cast connection: give up
  // control (if we still hold it) but never end the session (service-owned).
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
