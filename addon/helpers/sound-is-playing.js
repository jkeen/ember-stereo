import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
A helper to detect if a sound is playing.
```hbs
{{#if (sound-is-playing this.urlOrSound)}}
<p>This url is currently loading</p>
{{else}}
<p>This url is not currently loading</p>
{{/if}}
```

@class {{sound-is-playing}}
@type Helper
@param {String} url
*/

export default class SoundIsPlaying extends StereoBaseIsHelper {
  name = 'sound-is-playing'

  get result() {
    debugMessage(this, `render = ${this.sound?.isPlaying}`)
    return this.sound?.isPlaying
  }
}
