import { b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';
import debugMessage from '../-private/utils/debug-message.js';

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

class SoundIsPlaying extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-playing');
  }
  get result() {
    debugMessage(this, `render = ${this.sound?.isPlaying}`);
    return this.sound?.isPlaying;
  }
}

export { SoundIsPlaying as default };
//# sourceMappingURL=sound-is-playing.js.map
