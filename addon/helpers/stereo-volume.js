import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';


/**
  returns current stereo volume when used as a helper. When used as a modifier it transforms an range input control into a volume control

  ```hbs
    {{!-- use it as a helper like this --}}
    The stereo system volume is set at {{stereo-volume}}

    {{!-- use it as a modifier like this --}}
    <label>
      I control the stereo volume
      <Input type="range" {{stereo-volume}}/>
    </label>

    ```
  @class {{stereo-volume}}
  @type Helper
  */

/**
  @method compute
  @returns {Integer}
*/
export default class StereoVolume extends Helper {
  @service stereo;

  compute() {
    return this.stereo.volume;
  }
}

