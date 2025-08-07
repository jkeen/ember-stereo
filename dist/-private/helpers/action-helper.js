import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { inject } from '@ember/service';
import Helper from '@ember/component/helper';
import prepareOptions from '../utils/prepare-options.js';
import { dedupeTracked } from 'tracked-toolbox';
import Sound from '../../stereo-connections/base.js';

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
let ActionHelper = (_class = class ActionHelper extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "identifier", null);
    _initializerDefineProperty(this, "options", _descriptor2, this);
    _initializerDefineProperty(this, "_sound", _descriptor3, this);
    _initializerDefineProperty(this, "soundProxy", _descriptor4, this);
  }
  get sound() {
    if (this._sound) {
      return this._sound;
    } else if (this.soundProxy && this.soundProxy.isResolved) {
      return this.soundProxy.value;
    }
    return null;
  }
  compute([identifier], options = {}) {
    this.options = prepareOptions(options);
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      if (this.identifier instanceof Sound) {
        this._sound = this.identifier;
      }
      if (this.identifier) {
        this.soundProxy = this.stereo.soundProxy(identifier);
      }
      if (!this.sound) {
        if (options.load) {
          this.stereo.load(this.identifier, this.options);
        }
      }
    }
    return e => this.performAction(this.sound, e);
  }
  performAction() {
    return false;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "options", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_sound", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "soundProxy", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { ActionHelper as default };
//# sourceMappingURL=action-helper.js.map
