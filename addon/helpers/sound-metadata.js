import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
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

export default class SoundMetadata extends StereoBaseIsHelper {
  name = 'sound-metadata';
  @service stereo;

  /**
    @method compute
    @param {Any} identifier url, urls, url objects, promise that resolves to a url
    @param {String} key? name of the key to fetch
    @return {Any}
  */

  get metadata() {
    return this.stereo.metadataCache.find(this.identifier);
  }

  get result() {
    debugMessage(this, `metadata = ${JSON.stringify(this.metadata)}`);
    if (
      this.options?.key &&
      this.metadata &&
      get(this.metadata, this.options.key)
    ) {
      return get(this.metadata, this.options.key);
    } else if (!this.options?.key && this.metadata) {
      return this.metadata;
    }

    return null;
  }
}
