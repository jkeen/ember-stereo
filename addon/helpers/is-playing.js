import HifiBaseIsHelper from './-is-helper';
import debug from 'debug';

/**
A helper to detect if a sound is playing.
```hbs
{{#if (is-playing this.url)}}
<p>This url is currently loading</p>
{{else}}
<p>This url is not currently loading</p>
{{/if}}
```

Can also look for any system-level play event by passing in no argument
```hbs
{{#if (is-playing)}}
<p>Something is loading</p>
{{else}}
<p>Something is not loading</p>
{{/if}}
```

@class {{is-playing}}
@type Helper
@param {String} url
*/

export default class HifiIsPlaying extends HifiBaseIsHelper {
  get result() {
    if (this.identifier == 'system') {
      debug(`ember-hifi:helpers:is-playing:${this.identifier}`)(`render = ${this.hifi.isPlaying}`)
      return this.hifi.isPlaying;
    }
    else {
      debug(`ember-hifi:helpers:is-playing:${this.identifier}`)(`render = ${this.sound?.isPlaying}`)
      return this.sound?.isPlaying;
    }
  }
}