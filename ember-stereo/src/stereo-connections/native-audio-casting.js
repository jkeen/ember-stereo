import { isTesting, macroCondition } from '@embroider/macros';
import NativeAudio from './native-audio';
import isSameAudio from '../-private/utils/is-same-audio';
import DeadReckonClock from '../-private/utils/dead-reckon-clock';

// After a seek, the device keeps reporting the pre-seek position for a beat.
const SEEK_SETTLE_TOLERANCE_MS = 1500;
const SEEK_SETTLE_WINDOW_MS = 4000;

// Safari fires a spurious 'ended' after a fresh-src seek while AirPlaying.
const END_TOLERANCE_MS = 1500;

const HAVE_METADATA = 1;

/**
 * NativeAudio that always drives the shared, route-holding outlet element,
 * using the `SharedAudioAccess` handshake to own the AirPlay route alone.
 * Never part of the normal strategy waterfall. The service force-injects it
 * at the top of the strategy list only while casting.
 *
 * @class NativeAudioCasting
 * @extends NativeAudio
 */
export default class NativeAudioCasting extends DeadReckonClock(NativeAudio) {
  static key = 'NativeAudioCasting';
  static toString() {
    return 'NativeAudioCasting';
  }

  // The device fetches whatever url it's handed.
  static canPlay() {
    return true;
  }

  _lastReportedMs = null;
  _seekSettleTarget = null;
  _seekSettleUntil = 0;

  // Changing the routed element's src makes Safari drop and rebuild the AirPlay route.
  requestControl() {
    this.options?.beginOutletChange?.();
    try {
      return super.requestControl();
    } finally {
      this.options?.endOutletChange?.();
    }
  }

  // Any src reset on the routed element drops the AirPlay route.
  defeatBrowserCaching() {}

  setup() {
    let element = this.requestControl();
    this._registerEvents(element);
    this.retryCount = 0;

    if (macroCondition(isTesting())) {
      element.muted = true;
    }

    if (!isSameAudio(element.src, this.url, { exact: true })) {
      this.debug(`casting: pointing outlet at ${this.url}`);
      element.src = this.url;
      element.load();
    } else if (element.readyState >= HAVE_METADATA) {
      this.debug('casting: outlet already loaded this url; not reloading');
      this._onAudioReady();
    }
  }

  _reportedPosition() {
    let element = this.audioElement;
    if (!element || element.readyState < HAVE_METADATA) {
      return null;
    }
    return (element.currentTime || 0) * 1000;
  }

  // A live stream's currentTime restarts per connection.
  seedPosition(positionMs) {
    this._anchor(positionMs);
    this._position = positionMs;
    this._lastReportedMs = null;
  }

  _currentPosition() {
    // A live stream's currentTime freezes under AirPlay.
    if (this.isStream) {
      return this.isPlaying ? this._estimate() : this._anchorMs;
    }

    let reported = this._reportedPosition();

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
      // A {once:true} listener has already self-removed by now, so drop the stale ref.
      this._pendingSeekElement = null;
      this._pendingSeekApply = null;
      try {
        // While routed, a plain currentTime write often moves only the local clock.
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
      } catch (e) {}
    };

    if (element.readyState >= HAVE_METADATA) {
      apply();
    } else {
      this._cancelPendingSeek();
      this._pendingSeekElement = element;
      this._pendingSeekApply = apply;
      element.addEventListener('loadedmetadata', apply, { once: true });
    }

    return positionMs;
  }

  _cancelPendingSeek() {
    if (this._pendingSeekElement && this._pendingSeekApply) {
      this._pendingSeekElement.removeEventListener(
        'loadedmetadata',
        this._pendingSeekApply,
      );
    }
    this._pendingSeekElement = null;
    this._pendingSeekApply = null;
  }

  play(options) {
    let result = super.play(options);
    this._anchor(this._estimate());
    return result;
  }

  pause() {
    this._anchorMs = this._estimate();
    this.audioElement?.pause();
    this.trigger('audio-paused', { sound: this });
  }

  stop() {
    this.pause();
  }

  _onAudioPaused() {
    // Safari fires a spurious 'pause' right after a seek while AirPlaying.
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

  teardown() {
    this.durationWorkaroundTask?.cancelAll?.();
    this._cancelPendingSeek();
    this.trigger('_will_destroy', { sound: this });
    this._unregisterEvents(
      this.sharedAudioAccess?.audioElement ?? this.audioElement,
    );
    this.isDestroyed = true;
  }
}
