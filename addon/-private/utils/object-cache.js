import { tracked } from '@glimmer/tracking';

/**
* This class caches things based on a strings or objects. You shouldn't have to interact with this class.
*
* @class ObjectCache
* @private
* @constructor
*/

export default class ObjectCache {
  @tracked objectCache = new WeakMap();
  @tracked keyCache = {}
  name = 'ember-stereo:object-cache'

  constructor(stereo) {
    this.stereo = stereo;
  }

  has(identifier) {
    return this.objectCache.has(identifier) || (identifier in this.keyCache)
  }

  find(identifier) {
    if (this.objectCache.has(identifier)) {
      return this.objectCache.get(identifier)
    } else if (this.keyCache[identifier]) {
      return this.keyCache[identifier]
    }
  }

  remove(identifier) {
    if (this.objectCache.has(identifier)) {
      this.objectCache.remove(identifier)
    }
    if (this.keyCache[identifier]) {
      delete this.keyCache[identifier]
    }
  }

  store(identifier, value) {
    if (identifier) {
      if (identifier.then || (typeof identifier === 'object')) {
        this.objectCache.set(identifier, value)
      } else {
        this.keyCache[identifier] = value
      }
    }
  }
}
