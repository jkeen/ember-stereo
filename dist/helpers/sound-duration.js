import { b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { numericDuration } from './numeric-duration.js';
import debugMessage from '../-private/utils/debug-message.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';

/**
  A helper to get a sound's duration in milliseconds.
  ```hbs
   <p>Duration of loaded sound is {{sound-duration @identifier}}ms</p>
   <p>Duration of loaded sound in h:mm:ss {{sound-duration identifier format=time}}</p>
   <p>Duration of sound that this helper just tried to load in h:mm:ss {{sound-duration identifier format=time load=true}}</p>
   ```
  @class {{sound-duration}}
  @type {Helper}
  */

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {String} format? time, ms,
  @param {String} defaultValue? time when duration is unknown
  @param {Boolean} load? load the sound if it's not loaded?
  @return {any}
*/
class SoundDuration extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-duration');
  }
  get result() {
    let {
      defaultValue,
      format
    } = this.options;
    let result = defaultValue;
    let duration = this.sound?.duration || this.options?.duration;
    if (format == 'time') {
      if (duration) {
        if (duration === Infinity) {
          result = '∞';
        } else {
          result = numericDuration([duration]);
        }
      } else {
        result = defaultValue || '--:--';
      }
    } else {
      result = duration || defaultValue;
    }
    debugMessage(this, `render = ${result}`);
    return result;
  }
}

export { SoundDuration as default };
//# sourceMappingURL=sound-duration.js.map
