import { b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';
import debugMessage from '../-private/utils/debug-message.js';

/**
  A helper to detect if a sound is loaded.
  ```hbs
    {{#if (sound-is-loaded @identifier)}}
      <p>The sound is loaded</p>
    {{else}}
      <p>This sound is not loaded</p>
    {{/if}}
  ```

  @class {{sound-is-loaded}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Boolean}
*/
class SoundIsLoaded extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-loaded');
  }
  get result() {
    debugMessage(this, `render = ${this.sound?.isLoaded}`);
    // let isLoaded = this.stereo.cachedSounds.filter(url => this.sound && url === this.sound.url).length > 0;

    return this.sound && this.sound.isLoaded;
  }
}

export { SoundIsLoaded as default };
//# sourceMappingURL=sound-is-loaded.js.map
