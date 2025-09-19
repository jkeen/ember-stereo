import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { inject } from '@ember/service';
import Helper from '@ember/component/helper';

var _class, _descriptor;

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
let StereoVolumeIsAdjustable = (_class = class StereoVolumeIsAdjustable extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    return !this.stereo.isMobileDevice;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { StereoVolumeIsAdjustable as default };
//# sourceMappingURL=stereo-volume-is-adjustable.js.map
