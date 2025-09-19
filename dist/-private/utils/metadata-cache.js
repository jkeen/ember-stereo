import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import ObjectCache from './object-cache.js';
import normalizeIdentifier from './normalize-identifier.js';

/**
* This class caches metadata.
  @private
  @class MetadataCache
*/

class MetadataCache extends ObjectCache {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'ember-stereo:metadata-cache');
  }
  _store(_identifier, value) {
    let identifier = normalizeIdentifier(_identifier);
    if (identifier) {
      let oldMetadata = this.find(_identifier);
      this.keyCache[identifier] = value;

      // TODO: It would be nice if we didn't have to set
      // the entire metadata to trigger this event

      let sound = this.stereo.findLoadedSound(identifier);
      if (sound) {
        sound.trigger('audio-metadata-changed', {
          old: oldMetadata,
          new: value,
          sound
        });
      }
    }
  }
}

export { MetadataCache as default };
//# sourceMappingURL=metadata-cache.js.map
