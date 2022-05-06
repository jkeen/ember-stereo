import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import { numericDuration } from 'ember-stereo/helpers/numeric-duration';

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
    if (format == 'percent' || format == 'percentage') {
      if (this.sound) {
        result = (this.sound.position / this.sound.duration) * 100;
      } else {
        result = defaultValue || 0;
      }
    } else if (format == 'time') {
      if (this.sound?.position !== undefined) {
        result = numericDuration([this.sound.position]);
      } else {
        result = defaultValue || '00:00';
      }
    } else if (this.sound?.position === undefined && defaultValue) {
      result = defaultValue;
    } else {
      result = this.sound?.position;
    }

    debugMessage(this, `${format} render = ${result}`);
    return result;
  }
}
