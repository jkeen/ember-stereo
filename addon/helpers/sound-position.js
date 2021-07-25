import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import {numericDuration} from 'ember-stereo/helpers/numeric-duration';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import {tracked} from '@glimmer/tracking';

/**
  A helper to get a sound's position.
  ```hbs
   {{sound-position this.url}} #=> 144000
   {{sound-position this.url format="time"}} #=> "02:24"
   {{sound-position this.url format="percent"}} #=> "56"

   ```

  @class {{sound-position}}
  @type Helper
  @param {String} url
  @returns {Float}
*/

export default class SoundPosition extends StereoBaseIsHelper {
  name = 'sound-position'

  /**
    returns the position in milliseconds
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, percent,
    @return {Float}
  */

  get result() {
    let { format, defaultValue } = this.options;
    let result;

    if (format == 'percent' || format == 'percentage') {
      if (this.sound) {
        result = ((this.sound.position / this.sound.duration) * 100);
      }
      else {
        result = defaultValue || 0;
      }
    }
    else if (format == 'time') {
      if (this.sound?.position !== undefined) {
        result = numericDuration([this.sound.position])
      }
      else {
        result = defaultValue || "00:00";
      }
    }
    else if (this.sound?.position === undefined && defaultValue) {
      result = defaultValue;
    }
    else {
      result = this.sound?.position;
    }

    debugMessage(this, `${format} render = ${result}`);
    return result
  }
}
