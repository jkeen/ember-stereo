import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import normalizeIdentifier from './normalize-identifier.js';

function isAnObject(identifier) {
  return identifier !== undefined && identifier !== null && (typeof identifier === 'object' || identifier.then);
}

/**
 * This class caches things based on a strings or objects. You shouldn't have to interact with this class.
 * @private
 * @class UntrackedObjectCache
 */
class UntrackedObjectCache {
  constructor() {
    _defineProperty(this, "objectCache", new WeakMap());
    _defineProperty(this, "keyCache", {});
    _defineProperty(this, "name", 'ember-stereo:untracked-object-cache');
  }
  has(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    if (isAnObject(identifier)) {
      return this.objectCache.has(identifier);
    } else {
      return identifier in this.keyCache;
    }
  }
  find(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    if (isAnObject(identifier) && this.objectCache.has(identifier)) {
      return this.objectCache.get(identifier);
    } else if (this.keyCache[identifier]) {
      return this.keyCache[identifier];
    }
  }
  remove(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    if (isAnObject(identifier) && this.objectCache.has(identifier)) {
      this.objectCache.delete(identifier);
    }
    if (this.keyCache[identifier]) {
      delete this.keyCache[identifier];
    }
  }
  store(_identifier, value) {
    let identifier = normalizeIdentifier(_identifier);
    if (identifier) {
      if (isAnObject(identifier)) {
        this.objectCache.set(identifier, value);
      } else {
        this.keyCache[identifier] = value;
      }
    }
  }
}

export { UntrackedObjectCache as default };
//# sourceMappingURL=untracked-object-cache.js.map
