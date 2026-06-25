import { isTesting, macroCondition } from '@embroider/macros';
import NativeAudio from './native-audio';
import DeadReckonClock from '../-private/utils/dead-reckon-clock';

// After a seek, the device's clock keeps reporting the pre-seek position for a
// beat. Ignore its reported position until it lands within this tolerance of the
// seek target (or the window lapses), so the poll can't snap the playhead back.
const SEEK_SETTLE_TOLERANCE_MS = 1500;
const SEEK_SETTLE_WINDOW_MS = 4000;

// Safari fires a spurious 'ended' after a fresh-src seek while AirPlaying; only
// honor an 'ended' once the clock has actually reached the media's end, so a
// bogus one can't strand play-state (and freeze the clock).
const END_TOLERANCE_MS = 1500;

/**
 * Casting is "NativeAudio that always drives the shared, route-holding outlet
 * element." It IS a `NativeAudio` — it reuses the proven element wiring, the
 * url-guarded event handling, and (crucially) the `SharedAudioAccess`
 * `requestControl`/`releaseControl` handshake that lets many connections share
 * one `<audio>` element with a single owner at a time. That handshake — not
 * `oneAtATime` — is how the codebase has always coordinated a shared element,
 * and it gives single-owner of the AirPlay route for free.
 *
 * Only the genuinely cast-specific behaviour is overridden here:
 *  - the dead-reckon clock (Safari freezes `currentTime` while AirPlaying),
 *  - `pause`/`stop` never drop `src` (that would tear down the route),
 *  - optimistic play/pause state (Safari doesn't reliably fire element
 *    `playing`/`pause` while routed to a device),
 *  - a guarded `ended` and a seek-settle window for the spurious post-seek
 *    events Safari emits on a routed element,
 *  - route-flap suppression around control acquisition (changing the routed
 *    element's `src` makes Safari drop+re-establish the route).
 *
 * It is never part of the normal strategy waterfall; the service force-injects it
 * at the top of the strategy list only while casting (see `_buildStrategies`).
 *
 * @class NativeAudioCasting
 * @extends NativeAudio
 */
export default class NativeAudioCasting extends DeadReckonClock(NativeAudio) {
  static key = 'NativeAudioCasting';
  static toString() {
    return 'NativeAudioCasting';
  }

  // Only ever placed in the strategy list by the service while casting, so it
  // never needs to gate on mime type — the device fetches whatever URL it's
  // handed. Bypasses NativeAudio's HLS/mime `canPlay` checks.
  static canPlay() {
    return true;
  }

  // Single-ownership of the one route element comes from SharedAudioAccess's
  // requestControl handshake. oneAtATime is fine to participate in: like any
  // shared-element NativeAudio, a connection that has lost control falls back to
  // its internal clone, so oneAtATime pausing a stale cast connection can't
  // pause the live route.

  // ---- dead-reckon clock state ----------------------------------------------
  // _anchorMs/_anchorWall + _anchor()/_estimate() come from the DeadReckonClock
  // mixin (shared with the Chromecast connection so the two can't drift).
  // The last position the element reported, so we can tell "the clock advanced"
  // (adopt it) from "the clock is frozen" (dead-reckon).
  _lastReportedMs = null;
  // While settling a just-issued seek: the target to wait for and the deadline.
  _seekSettleTarget = null;
  _seekSettleUntil = 0;

  // Changing the routed element's `src` (here in setup, and in NativeAudio's
  // playTask via loadAudio) makes Safari drop + re-establish the AirPlay route,
  // firing cast-target-change events. Suppress those for a settle window around
  // any control acquisition so the flap can't trigger a spurious disengage. The
  // hooks come in via `options` (set before setup() runs) rather than a service
  // lookup, since the owner isn't set on the connection until after construction.
  requestControl() {
    this.options?.beginOutletChange?.();
    try {
      return super.requestControl();
    } finally {
      this.options?.endOutletChange?.();
    }
  }

  // AirPlay routes are fragile: any src reset or reload on the routed element
  // drops the route. NativeAudio is tuned for LOCAL playback and resets src
  // aggressively — these two overrides make our element ops idempotent so the
  // src is set once and the routed element is never needlessly reloaded.

  // No cache-busting. NativeAudio appends a #timestamp to stream URLs on every
  // load to defeat stream caching; on a routed element that URL churn forces
  // reloads that drop the AirPlay route (this is why LIVE casting had no sound).
  defeatBrowserCaching() {}

  // Set src once. Reloading an already-correct (and possibly already-routed and
  // prewarmed) element drops the route, so skip the reload and, when the element
  // is already loaded, announce ready ourselves (no fresh element events fire).
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

  // ---- clock (anchor/estimate come from the DeadReckonClock mixin) -----------

  // The element's reported position, or null before metadata (so a pre-load 0
  // can't be mistaken for a real position).
  _reportedPosition() {
    let element = this.audioElement;
    if (!element || element.readyState < 1) {
      return null;
    }
    return (element.currentTime || 0) * 1000;
  }

  // Seed the clock so elapsed continues across a backend swap (e.g. local→cast).
  // For a live stream the element's currentTime restarts per connection and
  // can't carry elapsed; the dead-reckon anchor can.
  seedPosition(positionMs) {
    this._anchor(positionMs);
    this._position = positionMs;
    this._lastReportedMs = null;
  }

  // Recompute position from the best source: the element's clock when it's
  // moving, dead reckoning when it's stalled but we're playing, the anchor when
  // paused. Called every tick by BaseSound's updatePositionTask while playing.
  _currentPosition() {
    // A live stream's element.currentTime is "time since THIS connection started"
    // — it resets on every backend swap and freezes under AirPlay. Neither is the
    // elapsed we want, so dead-reckon purely from the anchor (seeded across swaps).
    if (this.isStream) {
      return this.isPlaying ? this._estimate() : this._anchorMs;
    }

    let reported = this._reportedPosition();

    // A just-issued seek: the device may report the pre-seek position for a
    // beat. Don't adopt it (it would snap the playhead back) — dead-reckon from
    // the target until the device catches up or the settle window lapses.
    if (this._seekSettleTarget != null) {
      let settling = Date.now() < this._seekSettleUntil;
      let caughtUp =
        reported != null &&
        Math.abs(reported - this._seekSettleTarget) <= SEEK_SETTLE_TOLERANCE_MS;
      if (settling && !caughtUp) {
        return this.isPlaying ? this._estimate() : this._anchorMs;
      }
      this._seekSettleTarget = null; // caught up, or the window lapsed
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
      // The listener (if any) is {once:true} and has now self-removed; clear our
      // tracking so teardown/a later seek don't try to remove a stale ref.
      this._pendingSeekElement = null;
      this._pendingSeekApply = null;
      try {
        // While routed to a device, a plain currentTime write often moves only
        // the local clock without repositioning the remote stream — especially
        // after a mid-cast stream change. A pause → seek → play cycle forces the
        // device to re-fetch at the new position. The seek-settle window masks
        // the brief pause; our own 'pause' handler ignores it during a seek.
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
      // Replace any earlier deferred seek so we never leave more than one
      // listener on the shared element, and so teardown can remove this one.
      this._cancelPendingSeek();
      this._pendingSeekElement = element;
      this._pendingSeekApply = apply;
      element.addEventListener('loadedmetadata', apply, { once: true });
    }

    return positionMs;
  }

  // Drop a deferred seek whose metadata never arrived, so the listener (and the
  // connection it closes over) doesn't outlive this connection on the shared
  // route element.
  _cancelPendingSeek() {
    if (this._pendingSeekElement && this._pendingSeekApply) {
      this._pendingSeekElement.removeEventListener(
        'loadedmetadata',
        this._pendingSeekApply
      );
    }
    this._pendingSeekElement = null;
    this._pendingSeekApply = null;
  }

  // ---- playback (optimistic state + route preservation) ----------------------

  play(options) {
    let result = super.play(options);
    this._anchor(this._estimate());
    // Don't optimistically flip to "playing": the routed element fires a real
    // 'playing' when audio actually starts (confirmed on device), and the buffer
    // before that should read as loading, not playing. Faking played here made
    // the control look like it was playing while silently buffering, and
    // suppressed the loading spinner.
    return result;
  }

  pause() {
    // Pause only — never drop `src` (NativeAudio.pause() routes streams through
    // stop(), which removes src and would kill the AirPlay route).
    this._anchorMs = this._estimate();
    this.audioElement?.pause();
    this.trigger('audio-paused', { sound: this });
  }

  stop() {
    // Stop is a pause here: dropping `src` would kill the route, and the route
    // outliving any single sound is the whole point of the outlet element.
    this.pause();
  }

  _onAudioPaused() {
    // Safari fires a spurious 'pause' on the element right after a seek while
    // AirPlaying; ignore it during the settle window so it can't flip play-state
    // false. (Our own pause() drives audio-paused directly.)
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

  // Released during a swap (disengage) or superseded by a newer cast connection.
  // Unregister our listeners from the route element but never destroy it (it's
  // SharedAudioAccess-owned) and never requestControl (NativeAudio.teardown does,
  // which would steal the route back from whichever connection now owns it).
  teardown() {
    this.durationWorkaroundTask?.cancelAll?.();
    this._cancelPendingSeek();
    this.trigger('_will_destroy', { sound: this });
    this._unregisterEvents(this.sharedAudioAccess?.audioElement ?? this.audioElement);
    this.isDestroyed = true;
  }
}
