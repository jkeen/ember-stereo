import normalizeIdentifier from './normalize-identifier';

function isAnObject(identifier) {
  return (
    identifier !== undefined &&
    identifier !== null &&
    (typeof identifier === 'object' || identifier.then)
  );
}

/**
 * Same identifier, same Sound, always. Object and promise identifiers are held
 * weakly. Deliberately untracked so findSound can store during render.
 * @private
 * @hide
 * @class SoundIdentityMap
 */
export default class SoundIdentityMap {
  objectCache = new WeakMap();
  keyCache = {};

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

  store(_identifier, sound) {
    let identifier = normalizeIdentifier(_identifier);

    if (identifier) {
      if (isAnObject(identifier)) {
        this.objectCache.set(identifier, sound);
      } else {
        this.keyCache[identifier] = sound;
      }
    }
  }
}
