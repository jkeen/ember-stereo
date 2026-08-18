/**
 * Safari pauses `currentTime` on HLS while Airplaying, and Chromecast's clock
 * can freeze up. This helper tries to accomodate for that.
 *
 * Usage: `class Foo extends DeadReckonClock(BaseSound) { ... }`.
 *
 * @function DeadReckonClock
 * @param {Class} Base the connection class to extend
 * @return {Class}
 */
export default function DeadReckonClock(Base) {
  return class extends Base {
    _anchorMs = 0;
    _anchorWall = 0;

    _anchor(positionMs) {
      this._anchorMs = positionMs;
      this._anchorWall = Date.now();
    }

    _estimate() {
      return this.isPlaying
        ? this._anchorMs + (Date.now() - this._anchorWall)
        : this._anchorMs;
    }
  };
}
