import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to get whether or not autoplay is allowed on the webpage.
  ```hbs
   {{autoplay-allowed}} #=> sound

   ```

  @class {{autoplay-allowed}}
  @type Helper
  @returns {Sound}
*/

export default class autoPlayAllowed extends Helper {
  @service stereo;

  get result() {
    return this.stereo.autoPlayAllowed;
  }

  compute() {
    return this.result;
  }
}
