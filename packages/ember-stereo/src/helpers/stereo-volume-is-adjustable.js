import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

/**
  returns true if not mobile device. Mobile devices can't have audio adjusted at the stereo/sound level.

  ```hbs
    {{#if (stereo-volume-is-adjustable)}}
      //show volume controls here
    {{/if}}

    ```
  @class {{stereo-volume}}
  @type {Helper}
  */

/**
  @method compute
  @return {Integer}
*/
export default class StereoVolumeIsAdjustable extends Helper {
  @service stereo;

  compute() {
    return !this.stereo.isMobileDevice;
  }
}
