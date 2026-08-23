// After a seek, the device keeps reporting the pre-seek position for a beat.
const SEEK_SETTLE_TOLERANCE_MS = 1500;
const SEEK_SETTLE_WINDOW_MS = 4000;

/**
 * What we believe the position of a routed sound is. Safari freezes `currentTime` on HLS
 * while AirPlaying and a Cast receiver's clock can stall, so a reported position is a hint
 * rather than the truth, and this owns the rule for when to trust it over the stopwatch.
 *
 * @class RemotePosition
 */
export default class RemotePosition {
  constructor({
    toleranceMs = SEEK_SETTLE_TOLERANCE_MS,
    windowMs = SEEK_SETTLE_WINDOW_MS,
  } = {}) {
    this.toleranceMs = toleranceMs;
    this.windowMs = windowMs;
    this._anchorMs = 0;
    this._anchorWall = Date.now();
    this._lastReportedMs = null;
    this._settleTarget = null;
    this._settleUntil = 0;
  }

  anchor(positionMs) {
    this._anchorMs = positionMs;
    this._anchorWall = Date.now();
  }

  seed(positionMs) {
    this.anchor(positionMs);
    this._lastReportedMs = null;
    this._settleTarget = null;
    this._settleUntil = 0;
  }

  beginSeek(positionMs) {
    this.anchor(positionMs);
    this._lastReportedMs = null;
    this._settleTarget = positionMs;
    this._settleUntil = Date.now() + this.windowMs;
  }

  get isSettling() {
    if (this._settleTarget != null && Date.now() >= this._settleUntil) {
      this._settleTarget = null;
    }
    return this._settleTarget != null;
  }

  reanchor(isPlaying) {
    this.anchor(this.estimate(isPlaying));
  }

  estimate(isPlaying) {
    return isPlaying
      ? this._anchorMs + (Date.now() - this._anchorWall)
      : this._anchorMs;
  }

  positionFor({ reportedMs = null, isPlaying = false, isStream = false } = {}) {
    if (isStream) {
      return this.estimate(isPlaying);
    }

    if (this.isSettling) {
      let caughtUp =
        reportedMs != null &&
        Math.abs(reportedMs - this._settleTarget) <= this.toleranceMs;
      if (!caughtUp) {
        return this.estimate(isPlaying);
      }
      this._settleTarget = null;
    }

    if (reportedMs != null && reportedMs !== this._lastReportedMs) {
      this._lastReportedMs = reportedMs;
      if (isPlaying) {
        this.anchor(reportedMs);
      }
      return reportedMs;
    }

    return this.estimate(isPlaying);
  }
}
