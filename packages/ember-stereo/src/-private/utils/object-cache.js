import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import { TrackedObject, TrackedWeakMap } from 'tracked-built-ins';

import normalizeIdentifier from './normalize-identifier';

/**
 * This class caches things based on a strings or objects. You shouldn't have to interact with this class.
 */

export default class ObjectCache {
  @service stereo;

  @tracked objectCache = new TrackedWeakMap();
  @tracked keyCache = new TrackedObject();
  name = 'ember-stereo:object-cache';

  has(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    console.log(`has: ${identifier}`);
    return this.objectCache.has(identifier) || identifier in this.keyCache;
  }

  find(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    console.log(`find: ${identifier}`);

    if (this.objectCache.has(identifier)) {
      return this.objectCache.get(identifier);
    } else if (this.keyCache[identifier]) {
      return this.keyCache[identifier];
    }
  }

  remove(_identifier) {
    let identifier = normalizeIdentifier(_identifier);
    console.log(`remove: ${identifier}`);

    if (this.objectCache.has(identifier)) {
      this.objectCache.remove(identifier);
    }
    if (this.keyCache[identifier]) {
      delete this.keyCache[identifier];
    }
  }

  store(_identifier, value) {
    let identifier = normalizeIdentifier(_identifier);
    console.log(`store: ${identifier}`);

    if (identifier) {
      if (identifier.then || typeof identifier === 'object') {
        console.error(`set: ${identifier}`);

        this.objectCache.set(identifier, value);
      } else {
        this.keyCache[identifier] = value;
      }
    }
  }
}
