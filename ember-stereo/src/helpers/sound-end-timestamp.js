import StereoBaseIsHelper from '../-private/helpers/is-helper';
import { add } from 'date-fns';

/**
  A helper to get a sound's position timestamp based on the playingDate property in an HLS file, or from the position + a startsAt parameter.
  ```hbs

  this.endsAt = new Date('2024-10-01T00:00:00Z'); // fallback
  {{sound-end-timestamp @identifier}} #=> playingDate property from HLS
  {{sound-end-timestamp @identifier endsAt=this.endsAt}} #=> new Date('2024-10-01T00:00:00Z')
   ```

  @class {{sound-end-timestamp}}
  @type {Helper}
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Date} startsAt required if currentTime is not provided
  @param {Float} position
  @param {Date} currentTime
  @return {Date}
*/
export default class SoundEndTimestamp extends StereoBaseIsHelper {
  name = 'sound-end-timestamp';

  get result() {
    let result;
    if (this.sound?.endTime && this.sound?.isLoaded) {
      result = new Date(this.sound.endTime);
    } else if (this.options?.endsAt) {
      return new Date(this.options?.endsAt);
    } else if (this.options?.startsAt) {
      // no end time available
      result = add(new Date(this.options?.startsAt), {
        seconds: this.sound.duration / 1000,
      });
    }

    if (result instanceof Date && !isNaN(result)) {
      return result;
    } else {
      return undefined;
    }
  }
}
