import { helper } from '@ember/component/helper';

function numericDuration([duration]) {
  // Callers pass strings as readily as numbers, and Number.isFinite doesn't coerce.
  let milliseconds = Number(duration);
  if (milliseconds === Infinity) {
    return '∞';
  }

  // `Infinity % 60` and `NaN % 60` are both NaN, so without this an endless or
  // not-yet-known sound formats as "NaN:NaN".
  if (!Number.isFinite(milliseconds)) {
    return '--:--';
  }
  var seconds = parseInt(milliseconds / 1000 % 60),
    minutes = parseInt(milliseconds / (1000 * 60) % 60),
    hours = parseInt(milliseconds / (1000 * 60 * 60) % 24);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  if (hours > 0) {
    return hours + ':' + minutes + ':' + seconds;
  } else {
    return minutes + ':' + seconds;
  }
}
var numericDuration_default = helper(numericDuration);

export { numericDuration_default as default, numericDuration };
//# sourceMappingURL=numeric-duration.js.map
