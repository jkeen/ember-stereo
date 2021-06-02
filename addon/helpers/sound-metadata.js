import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debug from 'debug';
import { dedupeTracked } from 'tracked-toolbox';
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
*/


export default class soundMetadata extends StereoBaseIsHelper {
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

    if (this.options?.key && this.metadata && this.metadata[this.options.key]) {
      return this.metadata[this.options.key];
    }
    else if (!this.options?.key && this.metadata) {
      return this.metadata;
    }

    return this.metadata
  }
}
