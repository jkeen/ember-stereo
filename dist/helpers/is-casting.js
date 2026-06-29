import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';

var _class, _descriptor;

/**
 * `{{is-casting}}` — true while audio is routed to a remote device (AirPlay/Cast).
 *
 * @class IsCastingHelper
 */
let IsCasting = (_class = class IsCasting extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    return this.stereo.isCasting;
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { IsCasting as default };
//# sourceMappingURL=is-casting.js.map
