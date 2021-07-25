import { numericDuration } from "./numeric-duration";
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

/**
  A helper to get a sound's duration in milliseconds.
  ```hbs
   <p>Duration of loaded sound is {{sound-duration this.url}}ms</p>
   <p>Duration of loaded sound in h:mm:ss {{sound-duration this.url format=time}}</p>
   <p>Duration of sound that this helper just tried to load in h:mm:ss {{sound-duration this.url format=time load=true}}</p>
   ```
  @class {{sound-duration}}
  @type Helper
  @param {String} [url]
* @param {Object} options
* @param {String} options.format time, ms,
* @param {Boolean} options.load load the sound if it's not loaded?
  @returns {any}
*/
export default class SoundDuration extends StereoBaseIsHelper {
  name = 'sound-duration'

  get result() {
    let { defaultValue, format } = this.options
    let result = defaultValue;
    if (this.sound?.duration === Infinity) {
      //this is a stream
      result = defaultValue || "∞";
    } else {
      if (format == "time") {
        if (this.sound?.duration) {
          result = numericDuration([this.sound?.duration]);
        } else {
          result = defaultValue || "--:--";
        }
      } else {
        result = this.sound?.duration || defaultValue;
      }
    }

    debugMessage(this, `render = ${result}`);
    return result;
  }
}
