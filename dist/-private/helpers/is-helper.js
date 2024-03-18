import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { inject } from '@ember/service';
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
    _initializerDefineProperty(this, "soundProxy", _descriptor3, this);
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
    return this.sound && this.sound.isLoading || this.soundProxy && this.soundProxy.isLoading;
  }
  get sound() {
    if (this._sound) {
      return this._sound;
    } else if (this.soundProxy && this.soundProxy.value) {
      return this.soundProxy.value;
    }
    return null;
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
      }
      if (identifier) {
        this.soundProxy = this.stereo.soundProxy(identifier);
      }
      if (!this.sound) {
        if (options.load) {
          this.stereo.load(identifier, this.options);
        }
      }
    }
    return this.result;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
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
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "soundProxy", [dedupeTracked], {
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
})), _class);

export { StereoBaseIsHelper as default };
//# sourceMappingURL=is-helper.js.map
