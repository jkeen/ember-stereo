import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';
import normalizeIdentifier from './normalize-identifier.js';
import { TrackedWeakMap, TrackedObject } from 'tracked-built-ins';
import { makeArray } from '@ember/array';

var _class, _descriptor, _descriptor2, _descriptor3;
function isAnObject(identifier) {
  return identifier !== undefined && identifier !== null && (typeof identifier === 'object' || identifier.then);
}

/**
 * This class caches things based on a strings or objects. You shouldn't have to interact with this class.
 * @class ObjectCache
 */
let ObjectCache = (_class = class ObjectCache {
  constructor() {
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    // used by subclasses
    _initializerDefineProperty(this, "objectCache", _descriptor2, this);
    _initializerDefineProperty(this, "keyCache", _descriptor3, this);
    _defineProperty(this, "name", 'ember-stereo:object-cache');
  }
  has(idOrIds) {
    let id = makeArray(idOrIds).find(id => {
      return this._has(id);
    });
    return this._has(id);
  }
  find(idOrIds) {
    let id = makeArray(idOrIds).find(id => {
      return this._find(id);
    });
    return this._find(id);
  }
  remove(idOrIds) {
    return makeArray(idOrIds).forEach(id => {
      return this._remove(id);
    });
  }
  store(idOrIds, value) {
    return makeArray(idOrIds).forEach(id => {
      return this._store(id, value);
    });
  }
  _has(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    if (isAnObject(identifier)) {
      return this.objectCache.has(identifier);
    } else {
      return identifier in this.keyCache;
    }
  }
  _find(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    if (isAnObject(identifier) && this.objectCache.has(identifier)) {
      return this.objectCache.get(identifier);
    } else if (this.keyCache[identifier]) {
      return this.keyCache[identifier];
    }
  }
  _remove(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    if (isAnObject(identifier) && this.objectCache.has(identifier)) {
      this.objectCache.delete(identifier);
    }
    if (this.keyCache[identifier]) {
      delete this.keyCache[identifier];
    }
  }
  _store(_identifier, value) {
    let identifier = normalizeIdentifier(_identifier);
    if (identifier) {
      if (isAnObject(identifier)) {
        this.objectCache.set(identifier, value);
      } else {
        this.keyCache[identifier] = value;
      }
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "objectCache", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new TrackedWeakMap();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "keyCache", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new TrackedObject();
  }
})), _class);

export { ObjectCache as default };
//# sourceMappingURL=object-cache.js.map
