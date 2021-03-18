import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './-is-helper';
import debug from 'debug';
import { dedupeTracked } from 'tracked-toolbox';
/**
A helper to detect if a sound is playing.
```hbs

{{hifi-metadata}} // system

{{hifi-metadata this.url key=foo}}
```
```

@class {{hifi-metadata}}
@type Helper
@param {String} url
*/


export default class HifiMetadata extends HifiBaseIsHelper {
  @dedupeTracked metadata = {};

  get result() {
    if (this.identifier == 'system') {
      debug(`ember-hifi:helpers:hifi-metadata:${this.identifier}`)(`metadata = ${this.hifi.currentSound?.metadata}`)
      this.metadata = this.hifi.currentSound?.metadata || {};
    }
    else {
      debug(`ember-hifi:helpers:hifi-metadata:${this.identifier}`)(`metadata = ${this.sound?.metadata}`)
      this.metadata = this.sound?.metadata || {};
    }

    if (this.options?.key && this.metadata && this.metadata[this.options.key]) {
      return this.metadata[this.options.key];
    }
    else {
      return this.metadata;
    }
  }
}