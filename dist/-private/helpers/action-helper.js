import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';
import prepareOptions from '../utils/prepare-options.js';
import { dedupeTracked } from 'tracked-toolbox';

var _class, _descriptor, _descriptor2, _descriptor3;
let ActionHelper = (_class = class ActionHelper extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "identifier", null);
    _initializerDefineProperty(this, "options", _descriptor2, this);
    _initializerDefineProperty(this, "_sound", _descriptor3, this);
  }
  get sound() {
    return this._sound;
  }
  compute([identifier], options = {}) {
    this.options = prepareOptions(options);

    // Looked up every time, since a promise identifier can collapse onto another Sound after it resolves.
    this._sound = this.stereo.findSound(identifier);
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      if (!this.sound?.isResolved && options.load) {
        this.stereo.load(this.identifier, this.options);
      }
    }
    return e => this.performAction(this.sound, e);
  }
  performAction() {
    return false;
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
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
}), _class);

export { ActionHelper as default };
//# sourceMappingURL=action-helper.js.map
