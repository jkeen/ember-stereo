import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debug from 'debug';

/**
A helper to detect if a sound is playing.
```hbs
{{#if (sound-is-playing this.url)}}
<p>This url is currently loading</p>
{{else}}
<p>This url is not currently loading</p>
{{/if}}
```

Can also look for any system-level play event by passing in no argument
```hbs
{{#if (sound-is-playing)}}
<p>Something is loading</p>
{{else}}
<p>Something is not loading</p>
{{/if}}
```

@class {{sound-is-playing}}
@type Helper
@param {String} url
*/

export default class SoundIsPlaying extends StereoBaseIsHelper {
  get result() {
    if (this.identifier == 'system') {
      debug(`ember-stereo:helpers:sound-is-playing:${this.identifier}`)(`render = ${this.stereo.isPlaying}`)
      return this.stereo.isPlaying;
    }
    else {
      debug(`ember-stereo:helpers:sound-is-playing:${this.identifier}`)(`render = ${this.sound?.isPlaying}`)
      return this.sound?.isPlaying;
    }
  }
}
