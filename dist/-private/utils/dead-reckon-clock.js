import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';

/**
 * A tiny dead-reckon clock, mixed into the cast connections (Chromecast,
 * NativeAudioCasting). Their underlying clock can freeze (Safari pauses
 * `currentTime` while AirPlaying) or restart per session/connection, so for a
 * live stream they estimate elapsed from a wall-clock anchor instead of the
 * device clock. Each connection seeds the anchor across a backend swap and reads
 * it via `_estimate()`; keeping this one copy means the two transports can't
 * drift out of lockstep.
 *
 * Usage: `class Foo extends DeadReckonClock(BaseSound) { ... }`.
 *
 * @function DeadReckonClock
 * @param {Class} Base the connection class to extend
 * @returns {Class}
 */
function DeadReckonClock(Base) {
  return class extends Base {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "_anchorMs", 0);
      _defineProperty(this, "_anchorWall", 0);
    }
    // Pin "we were at `positionMs` as of wall-clock now".
    _anchor(positionMs) {
      this._anchorMs = positionMs;
      this._anchorWall = Date.now();
    }

    // Estimated elapsed: the anchor plus wall-clock drift while playing, or the
    // frozen anchor when paused.
    _estimate() {
      return this.isPlaying ? this._anchorMs + (Date.now() - this._anchorWall) : this._anchorMs;
    }
  };
}

export { DeadReckonClock as default };
//# sourceMappingURL=dead-reckon-clock.js.map
