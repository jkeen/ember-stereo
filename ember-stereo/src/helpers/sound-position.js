import StereoBaseIsHelper from '../-private/helpers/is-helper';
import { numericDuration } from './numeric-duration';
import debugMessage from '..//-private/utils/debug-message';

/**
  A helper to get a sound's position.
  ```hbs
   {{sound-position @identifier}} #=> 144000
   {{sound-position @identifier format="time"}} #=> "02:24"
   {{sound-position @identifier format="percent"}} #=> "56"

   ```

  @class {{sound-position}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {String} format time, percent,
  @return {Float}
*/
export default class SoundPosition extends StereoBaseIsHelper {
  name = 'sound-position';

  get result() {
    let { format, defaultValue } = this.options;
    let result;

    let position = this.options?.position || this.sound?.position;
    let duration = this.options?.duration || this.sound?.duration;

    if (format == 'percent' || format == 'percentage') {
      if (position && duration) {
        result = (position / duration) * 100;
      } else {
        result = defaultValue || 0;
      }
    } else if (format == 'time') {
      if (position !== undefined) {
        result = numericDuration([position]);
      } else {
        result = defaultValue || '00:00';
      }
    } else if (position === undefined && defaultValue) {
      result = defaultValue;
    } else {
      result = position
    }

    debugMessage(this, `${format} render = ${result}`);
    return result;
  }
}
