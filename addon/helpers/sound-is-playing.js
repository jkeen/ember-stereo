import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
A helper to detect if a sound is playing.
```hbs
{{#if (sound-is-playing @identifier)}}
  <p>This sound is currently playing</p>
{{else}}
  <p>This sound is not currently playing</p>
{{/if}}
```

  @class {{sound-is-playing}}
  @type {Helper}
*/
/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Boolean}
*/

export default class SoundIsPlaying extends StereoBaseIsHelper {
  name = 'sound-is-playing'

  get result() {
    debugMessage(this, `render = ${this.sound?.isPlaying}`)
    return this.sound?.isPlaying
  }
}
