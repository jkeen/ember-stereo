import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

/**
  A helper to detect if a sound is playing.
  ```hbs
  {{sound-metadata (current-sound)}} // currently loaded sound metadata hash
  {{sound-metadata @identifier key=title}} // metadata 'title' on sound matching @identifier
  ```

  @class {{sound-metadata}}
  @type {Helper}
  @param {String} url
  @return {Object}
*/

export default class SoundMetadata extends Helper {
  name = 'sound-metadata';
  @service stereo;

  /**
    @method compute
    @param {Any} identifier url, urls, url objects, promise that resolves to a url
    @param {String} key? name of the key to fetch
    @return {Any}
  */

  compute([identifier], { key }) {
    let metadata = this.stereo.metadataCache.find(identifier);

    if (key && metadata && get(metadata, key)) {
      return get(metadata, key);
    } else if (!key && metadata) {
      return metadata;
    }
  }
}
