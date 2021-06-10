import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debug from 'debug';
import { dedupeTracked } from 'tracked-toolbox';
import { get } from '@ember/object';
/**
A helper to detect if a sound is playing.
```hbs

{{sound-metadata}} // system

{{sound-metadata this.url key=foo}}
```
```

@class {{sound-metadata}}
@type Helper
@param {String} url
@returns {Object}
*/


export default class SoundMetadata extends StereoBaseIsHelper {
  @dedupeTracked metadata = {};

  get result() {
    if (this.identifier == 'system') {
      debug(`ember-stereo:helpers:sound-metadata:${this.identifier}`)(`metadata = ${JSON.stringify(this.stereo.currentSound?.metadata)}`)
      this.metadata = this.stereo.currentSound?.metadata || {};
    }
    else {
      debug(`ember-stereo:helpers:sound-metadata:${this.identifier}`)(`metadata = ${JSON.stringify(this.sound?.metadata)}`)
      this.metadata = this.sound?.metadata || {};
    }

    if (this.options?.key && this.metadata && get(this.metadata, this.options.key)) {
      return get(this.metadata, this.options.key);
    }
    else if (!this.options?.key && this.metadata) {
      return this.metadata;
    }

    return null
  }
}
