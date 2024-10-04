import StereoBaseIsHelper from '../-private/helpers/is-helper';
import { add } from 'date-fns';

/**
  A helper to get a sound's position.
  ```hbs
   {{sound-position @identifier}} #=> 144000
   {{sound-position @identifier format="time"}} #=> "02:24"
   {{sound-position @identifier format="percent"}} #=> "56"

   ```

  @class {{sound-position-timestamp}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Float} position
  @param {Date} currentTime
  @param {Date} startsAt
  @return {Date}
*/
export default class SoundPositionTimestamp extends StereoBaseIsHelper {
  name = 'sound-position-timestamp';

  get result() {
    let result;
    let position = this.options?.position || this.sound?.position;
    let currentTime = this.sound?.currentTime;
    let startsAt = this.options?.startsAt;

    if (currentTime) {
      result = new Date(currentTime);
    } else if (startsAt) {
      result = add(new Date(startsAt), {
        seconds: position / 1000,
      });
    }

    if (result instanceof Date && !isNaN(result)) {
      return result;
    } else {
      return undefined;
    }
  }
}
