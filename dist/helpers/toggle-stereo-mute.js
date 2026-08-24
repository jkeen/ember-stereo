import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';

var _class, _descriptor;

/**
  A helper to toggle stereo's mute status

  ```hbs
    <button {{on 'click' (toggle-stereo-mute)}}>
      Toggle Mute
    </button>
  ```
  @class {{toggle-stereo-mute}}
  @type {Helper}
  */

/**
  @method compute
  @return {Function}
*/
let ToggleStereoMute = (_class = class ToggleStereoMute extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    return () => {
      return this.stereo.toggleMute();
    };
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { ToggleStereoMute as default };
//# sourceMappingURL=toggle-stereo-mute.js.map
