import ObjectCache from 'ember-stereo/-private/utils/object-cache';
import normalizeIdentifier from './normalize-identifier';

/**
* This class caches metadata.
  @private
*/

export default class MetadataCache extends ObjectCache {
  name = 'ember-stereo:metadata-cache'

  store(_identifier, value) {
    let identifier = normalizeIdentifier(_identifier);
    if (identifier) {
      let oldMetadata = this.find(_identifier)
      this.keyCache[identifier] = value

      // TODO: It would be nice if we didn't have to set
      // the entire metadata to trigger this event

      let sound = this.stereo.findLoadedSound(identifier);
      if (sound) {
        sound.trigger('audio-metadata-changed', {
          old: oldMetadata,
          new: value,
          sound,
        })
      }
    }
  }
}
