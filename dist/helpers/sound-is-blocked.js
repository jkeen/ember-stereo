import { b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';

/**
  A helper to detect if a sound is blocked.
  ```hbs
    {{#if (sound-is-blocked @identifier)}}
      <p>This sound has been blocked by browser autoplay. User intervention is required</p>
    {{else}}
      <p>This sound has not been blocked by browser autoplay</p>
    {{/if}}
  ```

  @class {{sound-is-blocked}}
  @type {Helper}
  @param {String} url
*/
/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Boolean}
*/
class SoundIsBlocked extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-blocked');
  }
  get result() {
    return this.sound && this.sound.isBlocked;
  }
}

export { SoundIsBlocked as default };
//# sourceMappingURL=sound-is-blocked.js.map
