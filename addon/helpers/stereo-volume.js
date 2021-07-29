import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';


/**

  ```hbs
    {{stereo-volume}} # returns current stereo volume
  ```
  @class {{stereo-volume}}
  @type Helper
  */

export default class StereoVolume extends Helper {
  @service stereo;

  compute() {
    return this.stereo.volume;
  }
}

