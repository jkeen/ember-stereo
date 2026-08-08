import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';

var _class, _descriptor;

/**
 * `{{casting-available}}` — true when a cast target (AirPlay/Cast) is reachable.
 *
 * @class CastingAvailableHelper
 */
let CastingAvailable = (_class = class CastingAvailable extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    // Asking whether casting is available means the app uses casting — kick off
    // the lazy Chromecast SDK load (idempotent) so Cast targets get detected.
    this.stereo.ensureChromecastSetup();
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
