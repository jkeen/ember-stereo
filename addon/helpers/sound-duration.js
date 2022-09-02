import { numericDuration } from './numeric-duration';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

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
export default class SoundDuration extends StereoBaseIsHelper {
  name = 'sound-duration';

  get result() {
    let { defaultValue, format } = this.options;
    let result = defaultValue;

    if (format == 'time') {
      if (this.sound?.duration) {
        if (this.sound?.duration === Infinity) {
          result = '∞';
        } else {
          result = numericDuration([this.sound?.duration]);
        }
      } else {
        result = defaultValue || '--:--';
      }
    } else {
      result = this.sound?.duration || defaultValue;
    }

    debugMessage(this, `render = ${result}`);
    return result;
  }
}
