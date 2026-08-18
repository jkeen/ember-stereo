import { service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to get whether or not autoplay is allowed on the webpage.
  ```hbs
   {{#if (autoplay-allowed)}}
      Autoplay is allowed
   {{/if}}
   ```
  @class {{autoplay-allowed}}
  @type {Helper}
  @return {Boolean}
*/

/**
  @method compute
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @return {Boolean}
*/
export default class autoPlayAllowed extends Helper {
  @service stereo;

  compute() {
    return this.stereo.autoPlayAllowed;
  }
}
