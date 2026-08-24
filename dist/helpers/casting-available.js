import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';

var _class, _descriptor;

/**
 * `{{casting-available}}` is true when casting (AirPlay/Cast) can be started.
 *
 * @class CastingAvailableHelper
 */
let CastingAvailable = (_class = class CastingAvailable extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    this.stereo.ensureCastSdkSetup();
    return this.stereo.isCastingAvailable;
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { CastingAvailable as default };
//# sourceMappingURL=casting-available.js.map
