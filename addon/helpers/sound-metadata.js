import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import { dedupeTracked } from 'tracked-toolbox';
import { get } from '@ember/object';
/**
A helper to detect if a sound is playing.
```hbs

{{sound-metadata (current-sound)}} // currently loaded sound metadata hash

{{sound-metadata @identifier key=title}} // metadata 'title' on sound matching @identifier
```
```

@class {{sound-metadata}}
@type Helper
@param {String} url
@returns {Object}
*/


export default class SoundMetadata extends StereoBaseIsHelper {
  name = 'sound-metadata'
  @dedupeTracked metadata = {};

  get result() {
    debugMessage(this, `metadata = ${JSON.stringify(this.sound?.metadata)}`)
    this.metadata = this.sound?.metadata || {};

    if (this.options?.key && this.metadata && get(this.metadata, this.options.key)) {
      return get(this.metadata, this.options.key);
    }
    else if (!this.options?.key && this.metadata) {
      return this.metadata;
    }

    return null
  }
}
