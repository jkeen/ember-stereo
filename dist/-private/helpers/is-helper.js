import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';

var _class, _descriptor, _descriptor2, _descriptor3;
const UNINITIALIZED = null;
let StereoBaseIsHelper = (_class = class StereoBaseIsHelper extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "identifier", UNINITIALIZED);
    _initializerDefineProperty(this, "_sound", _descriptor2, this);
    _initializerDefineProperty(this, "options", _descriptor3, this);
  }
  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  get isLoading() {
    return this.sound?.isLoading;
  }
  get sound() {
    return this._sound;
  }
  get result() {
    return false;
  }
  compute([identifier], options = {}) {
    this.options = options;

    // Looked up every time, since a promise identifier can collapse onto another Sound after it resolves.
    this._sound = this.stereo.findSound(identifier);
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      if (!this.sound?.isResolved && options.load) {
        this.stereo.load(identifier, this.options);
      }
    }
    return this.result;
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_sound", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return UNINITIALIZED;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "options", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return UNINITIALIZED;
  }
}), _class);

export { StereoBaseIsHelper as default };
//# sourceMappingURL=is-helper.js.map
