import StereoBaseIsHelper from '../-private/helpers/is-helper';
import { add } from 'date-fns';

/**
  A helper to get a sound's position timestamp based on the playingDate property in an HLS file, or from the position + a startsAt parameter.
  ```hbs

  this.startsAt = new Date('2024-10-01T00:00:00Z');
  {{sound-start-timestamp @identifier}} #=> playingDate property from HLS
  {{sound-start-timestamp @identifier startsAt=this.startsAt}} #=> new Date('2024-10-01T00:00:00Z')
   ```

  @class {{sound-start-timestamp}}
  @type {Helper}
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Date} startsAt required if currentTime is not provided
  @param {Float} position
  @param {Date} currentTime
  @return {Date}
*/
export default class SoundPositionTimestamp extends StereoBaseIsHelper {
  name = 'sound-start-timestamp';

  get result() {
    let result;
    if (this.sound?.startTime && this.sound?.isLoaded) {
      result = new Date(this.sound.startTime);
    } else if (this.options?.startsAt) {
      // no end time available
      result = new Date(this.options?.startsAt);
    }

    if (result instanceof Date && !isNaN(result)) {
      return result;
    } else {
      return undefined;
    }
  }
}
