import { b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';
import debugMessage from '../-private/utils/debug-message.js';

/**
  A helper to detect if a sound is rewindable.
  ```hbs
    {{#if (sound-is-rewindable @identifier)}}
      <p>This sound is rewindable</p>
    {{else}}
      <p>This sound is not rewindable</p>
    {{/if}}
  ```

  @class {{sound-is-rewindable}}
  @type {Helper}
  @param {String} url
  @param {Boolean} load? load the sound if it's not loaded
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Boolean} load? load the sound if it's not loaded
  @return {Boolean}
*/

class SoundIsRewindable extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-rewindable');
  }
  get result() {
    debugMessage(this, `render = ${this.stereo.isRewindable}`);
    return this.sound?.isRewindable;
  }
}

export { SoundIsRewindable as default };
//# sourceMappingURL=sound-is-rewindable.js.map
