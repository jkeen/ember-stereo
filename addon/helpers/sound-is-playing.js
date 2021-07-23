import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

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
  name = 'sound-is-playing'

  get result() {
    if (this.identifier == 'system') {
      debugMessage(this, `render = ${this.stereo.isPlaying}`)
      return this.stereo.isPlaying
    }
    else {
      debugMessage(this, `render = ${this.sound?.isPlaying}`)
      return this.sound?.isPlaying
    }
  }
}
