import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import EmberObject from '@ember/object';
import EmberEvented from '@ember/object/evented';

/**
 * Partial wrapper for Ember's Evented Mixin, enabling
 * a pure class-based derivation
 * @private
 * @class Evented
 */
class Evented {
  constructor() {
    _defineProperty(this, "eventManager", EmberObject.extend(EmberEvented).create());
  }
  on(name, target, method) {
    this.eventManager.on(name, target, method);
    return this;
  }
  off(name, target, method) {
    this.eventManager.off(name, target, method);
    return this;
  }
  one(name, target, method) {
    this.eventManager.one(name, target, method);
    return this;
  }
  has(name) {
    return this.eventManager.has(name);
  }
  trigger(name, ...args) {
    this.eventManager.trigger(name, ...args);
  }
}

export { Evented as default };
//# sourceMappingURL=evented.js.map
