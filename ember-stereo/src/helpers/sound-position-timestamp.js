import StereoBaseIsHelper from '../-private/helpers/is-helper';
import { add } from 'date-fns';

/**
  A helper to get a sound's position timestamp based on the playingDate property in an HLS file, or from the position + a startsAt parameter.
  ```hbs

  this.startsAt = new Date('2024-10-01T00:00:00Z');
  {{sound-position-timestamp @identifier}} #=> playingDate property from HLS
  {{sound-position-timestamp @identifier startsAt=this.startsAt}} #=> new Date('2024-10-01T00:00:00Z')
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
    let position = this.options?.position || this.sound?.position || 0;
    let currentTime = this.sound?.currentTime;
    let startsAt = this.options?.startsAt;

    if (startsAt && !this.sound?.isLoaded) {
      return new Date(startsAt);
    }

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
