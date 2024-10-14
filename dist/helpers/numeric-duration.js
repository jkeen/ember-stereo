import { helper } from '@ember/component/helper';

function numericDuration([duration]) {
  var seconds = parseInt(duration / 1000 % 60),
    minutes = parseInt(duration / (1000 * 60) % 60),
    hours = parseInt(duration / (1000 * 60 * 60) % 24);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  if (hours > 0) {
    return hours + ':' + minutes + ':' + seconds;
  } else {
    return minutes + ':' + seconds;
  }
}
var numericDuration$1 = helper(numericDuration);

export { numericDuration$1 as default, numericDuration };
//# sourceMappingURL=numeric-duration.js.map
