import { b as _defineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
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
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
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
