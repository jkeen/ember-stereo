import { isTesting, macroCondition } from '@embroider/macros';
import NativeAudio from './native-audio';

// After a seek, the device keeps reporting the pre-seek position for a beat; ignore it until it lands within tolerance of the target (or the window lapses), so the poll can't snap the playhead back.
const SEEK_SETTLE_TOLERANCE_MS = 1500;
const SEEK_SETTLE_WINDOW_MS = 4000;

// Safari fires a spurious 'ended' after a fresh-src seek while AirPlaying; only honor 'ended' once the clock has reached the media's end.
const END_TOLERANCE_MS = 1500;

/**
 * NativeAudio that always drives the shared, route-holding outlet element, using the `SharedAudioAccess` handshake for single ownership of the AirPlay route. Never part of the normal strategy waterfall; the service force-injects it at the top of the strategy list only while casting.
 *
 * @class NativeAudioCasting
 * @extends NativeAudio
 */
export default class NativeAudioCasting extends NativeAudio {
  static key = 'NativeAudioCasting';
  static toString() {
    return 'NativeAudioCasting';
  }

  // No mime gating: the device fetches whatever URL it's handed.
  static canPlay() {
    return true;
  }

  // Single-ownership of the one route element comes from SharedAudioAccess's
  // requestControl handshake. oneAtATime is fine to participate in: like any
  // shared-element NativeAudio, a connection that has lost control falls back to
  // its internal clone, so oneAtATime pausing a stale cast connection can't
  // pause the live route.

  // ---- dead-reckon clock state ----------------------------------------------
  // (Not class fields would-be-clobbered concerns: BaseSound's constructor runs
  // setup() before subclass field initializers, but setup() never touches these,
  // so plain fields are safe.)
  _anchorMs = 0;
  _anchorWall = 0;
  // The last position the element reported, so we can tell "the clock advanced"
  // (adopt it) from "the clock is frozen" (dead-reckon).
  _lastReportedMs = null;
  _seekSettleTarget = null;
  _seekSettleUntil = 0;

  // Changing the routed element's `src` makes Safari drop and re-establish the AirPlay route; suppress the resulting cast-target-change events so the flap can't trigger a spurious disengage. Hooks arrive via `options` because the owner isn't set until after construction.
  requestControl() {
    this.options?.beginOutletChange?.();
    try {
      return super.requestControl();
    } finally {
      this.options?.endOutletChange?.();
    }
  }

  // NativeAudio's #timestamp cache-buster churns the URL every load, and any src reset on the routed element drops the AirPlay route.
  defeatBrowserCaching() {}

  // An already-correct element must not be reloaded (that drops the route), but then no fresh element events fire, so announce ready ourselves.
  setup() {
    let element = this.requestControl();
    this._registerEvents(element);
    this.retryCount = 0;

    if (macroCondition(isTesting())) {
      element.muted = true;
    }

    if (!this.urlsAreEqual(element.src, this.url)) {
      this.debug(`casting: pointing outlet at ${this.url}`);
      element.src = this.url;
      element.load();
    } else if (element.readyState >= 1 /* HAVE_METADATA */) {
      this.debug('casting: outlet already loaded this url; not reloading');
      this._onAudioReady();
    }
  }

  // ---- clock -----------------------------------------------------------------

  _anchor(positionMs) {
    this._anchorMs = positionMs;
    this._anchorWall = Date.now();
  }

  _estimate() {
    return this.isPlaying
      ? this._anchorMs + (Date.now() - this._anchorWall)
      : this._anchorMs;
  }

  // The element's reported position, or null before metadata (so a pre-load 0
  // can't be mistaken for a real position).
  _reportedPosition() {
    let element = this.audioElement;
    if (!element || element.readyState < 1) {
      return null;
    }
    return (element.currentTime || 0) * 1000;
  }

  // Carries elapsed across a backend swap (e.g. local→cast): a live stream's currentTime restarts per connection; the dead-reckon anchor doesn't.
  seedPosition(positionMs) {
    this._anchor(positionMs);
    this._position = positionMs;
    this._lastReportedMs = null;
  }

  _currentPosition() {
    // A live stream's currentTime resets on every backend swap and freezes under AirPlay, so dead-reckon purely from the anchor.
    if (this.isStream) {
      return this.isPlaying ? this._estimate() : this._anchorMs;
    }

    let reported = this._reportedPosition();

    // Adopting the stale pre-seek position would snap the playhead back; dead-reckon until the device catches up or the window lapses.
    if (this._seekSettleTarget != null) {
      let settling = Date.now() < this._seekSettleUntil;
      let caughtUp =
        reported != null &&
        Math.abs(reported - this._seekSettleTarget) <= SEEK_SETTLE_TOLERANCE_MS;
      if (settling && !caughtUp) {
        return this.isPlaying ? this._estimate() : this._anchorMs;
      }
      this._seekSettleTarget = null;
    }

    if (reported != null && reported !== this._lastReportedMs) {
      this._lastReportedMs = reported;
      if (this.isPlaying) {
        this._anchor(reported);
      }
      return reported;
    } else if (this.isPlaying) {
      return this._estimate();
    }
    return this._anchorMs;
  }

  _setPosition(positionMs) {
    this._anchor(positionMs);
    this._seekSettleTarget = positionMs;
    this._seekSettleUntil = Date.now() + SEEK_SETTLE_WINDOW_MS;
    this._lastReportedMs = null; // a fresh seek invalidates the freeze detector

    let element = this.audioElement;
    let seconds = positionMs / 1000;
    let apply = () => {
      try {
        // While routed, a plain currentTime write often moves only the local clock without repositioning the remote stream; pause → seek → play forces the device to re-fetch at the new position, and the seek-settle window masks the brief pause.
        if (element.webkitCurrentPlaybackTargetIsWireless && !element.paused) {
          element.pause();
          element.currentTime = seconds;
          let played = element.play();
          if (played && typeof played.catch === 'function') {
            played.catch(() => {});
          }
        } else {
          element.currentTime = seconds;
        }
      } catch (e) {
        // not seekable yet — ignore
      }
    };

    if (element.readyState >= 1 /* HAVE_METADATA */) {
      apply();
    } else {
      element.addEventListener('loadedmetadata', apply, { once: true });
    }

    return positionMs;
  }


  play(options) {
    let result = super.play(options);
    this._anchor(this._estimate());
    // Deliberately no optimistic "playing": the routed element fires a real 'playing' when the device starts, and the buffer before that should read as loading.
    return result;
  }

  pause() {
    // Never drop `src`: NativeAudio.pause() routes streams through stop(), which removes src and would kill the AirPlay route.
    this._anchorMs = this._estimate();
    this.audioElement?.pause();
    this.trigger('audio-paused', { sound: this });
  }

  stop() {
    // Stop is a pause here: dropping `src` would kill the route, which outlives any single sound.
    this.pause();
  }

  _onAudioPaused() {
    // Safari fires a spurious 'pause' right after a seek while AirPlaying; our own pause() reports directly.
    if (this._seekSettleTarget != null) {
      return;
    }
    super._onAudioPaused();
  }

  _onAudioEnded() {
    if (this._isGenuineEnd()) {
      super._onAudioEnded();
    }
  }

  _isGenuineEnd() {
    let element = this.audioElement;
    if (!element || !Number.isFinite(element.duration)) {
      return false;
    }
    let durationMs = element.duration * 1000;
    let positionMs = (element.currentTime || 0) * 1000;
    return durationMs > 0 && positionMs >= durationMs - END_TOLERANCE_MS;
  }

  _setVolume(volume) {
    if (macroCondition(isTesting())) {
      this.debug(`skipping set volume in test env: ${volume}`);
      return;
    }
    super._setVolume(volume);
  }

  // Never requestControl (as NativeAudio.teardown does): that would steal the route back from whichever connection now owns the shared element.
  teardown() {
    this.durationWorkaroundTask?.cancelAll?.();
    this.trigger('_will_destroy', { sound: this });
    this._unregisterEvents(this.sharedAudioAccess?.audioElement ?? this.audioElement);
    this.isDestroyed = true;
  }
}
