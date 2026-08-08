import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
const UNINITIALIZED = null;
let StereoBaseIsHelper = (_class = class StereoBaseIsHelper extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "identifier", UNINITIALIZED);
    _initializerDefineProperty(this, "task", _descriptor2, this);
    _initializerDefineProperty(this, "foundSound", _descriptor3, this);
    _initializerDefineProperty(this, "_sound", _descriptor4, this);
    _initializerDefineProperty(this, "options", _descriptor5, this);
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
    // findSound returns an identity-stable Sound that exists before its
    // connection loads; result getters read proxied state that's undefined
    // until it resolves.
    return this._sound || this.foundSound;
  }
  get result() {
    return false;
  }
  compute([identifier], options = {}) {
    this.options = options;
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      if (identifier && identifier.url && identifier.play) {
        this._sound = identifier;
      } else if (identifier) {
        this.foundSound = this.stereo.findSound(identifier);
      }
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
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "task", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return UNINITIALIZED;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "foundSound", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return UNINITIALIZED;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "_sound", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return UNINITIALIZED;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "options", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return UNINITIALIZED;
  }
}), _class);

export { StereoBaseIsHelper as default };
//# sourceMappingURL=is-helper.js.map
