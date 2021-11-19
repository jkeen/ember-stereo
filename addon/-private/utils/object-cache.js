import { tracked } from '@glimmer/tracking';
import normalizeIdentifier from './normalize-identifier';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

/**
* This class caches things based on a strings or objects. You shouldn't have to interact with this class.
*/

export default class ObjectCache extends EmberObject {
  @service stereo;

  @tracked objectCache = new WeakMap();
  @tracked keyCache = {}
  name = 'ember-stereo:object-cache'

  has(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    return this.objectCache.has(identifier) || (identifier in this.keyCache)
  }

  find(_identifier) {
    let identifier = normalizeIdentifier(_identifier);

    if (this.objectCache.has(identifier)) {
      return this.objectCache.get(identifier)
    } else if (this.keyCache[identifier]) {
      return this.keyCache[identifier]
    }
  }

  remove(_identifier) {
    let identifier = normalizeIdentifier(_identifier);

    if (this.objectCache.has(identifier)) {
      this.objectCache.remove(identifier)
    }
    if (this.keyCache[identifier]) {
      delete this.keyCache[identifier]
    }
  }

  store(_identifier, value) {
    let identifier = normalizeIdentifier(_identifier);

    if (identifier) {
      if (identifier.then || (typeof identifier === 'object')) {
        this.objectCache.set(identifier, value)
      } else {
        this.keyCache[identifier] = value
      }
    }
  }
}
