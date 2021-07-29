import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to get whether or not autoplay is allowed on the webpage.
  ```hbs
   {{#if (autoplay-allowed)}}
      Autoplay is allowed
   {{/if}}
   ```

  @class {{autoplay-allowed}}
  @type Helper
  @returns {Sound}
*/

export default class autoPlayAllowed extends Helper {
  @service stereo;

  compute() {
    return this.stereo.autoPlayAllowed;
  }
}
