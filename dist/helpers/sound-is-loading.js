import { b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';
import debugMessage from '../-private/utils/debug-message.js';

/**
  A helper to detect if a sound is loading.
  ```hbs
    {{#if (sound-is-loading @identifier)}}
      <p>This sound is currently loading</p>
    {{else}}
      <p>This sound is not currently loading</p>
    {{/if}}
  ```

  @class {{sound-is-loading}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Boolean}
*/
class SoundIsLoading extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-loading');
  }
  get result() {
    debugMessage(this, `render = ${this.sound?.isLoaded}`);
    return this.sound && this.sound.isLoading || this.isLoading;
  }
}

export { SoundIsLoading as default };
//# sourceMappingURL=sound-is-loading.js.map
