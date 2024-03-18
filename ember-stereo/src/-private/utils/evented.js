import EmberObject from '@ember/object';
import EmberEvented from '@ember/object/evented';

/**
 * Partial wrapper for Ember's Evented Mixin, enabling
 * a pure class-based derivation
 * @private
 * @class Evented
 */
export default class Evented {
  eventManager = EmberObject.extend(EmberEvented).create();

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
