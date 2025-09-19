import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

var _class, _descriptor;

/**
  returns current stereo volume when used as a helper. When used as a modifier it transforms an range input control into a volume control

  ```hbs
    {{!-- use it as a helper like this --}}
    The stereo system volume is set at {{stereo-volume}}

    {{!-- use it as a modifier like this --}}
    <label>
      I control the stereo volume
      <Input @type="range" {{stereo-volume}}/>
    </label>

    ```
  @class {{stereo-volume}}
  @type {Helper}
  */

/**
  @method compute
  @return {Integer}
*/
let StereoVolume = (_class = class StereoVolume extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    return this.stereo.volume;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { StereoVolume as default };
//# sourceMappingURL=stereo-volume.js.map
