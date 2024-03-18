import StereoBaseIsHelper from '../-private/helpers/is-helper';
import debugMessage from '../-private/utils/debug-message';

/**
  A helper to detect if a sound is fastforwardable.
  ```hbs
    {{#if (sound-is-fastforwardable @identifier)}}
      <p>This sound is fastforwardable</p>
    {{else}}
      <p>This sound is not fastforwardable</p>
    {{/if}}
  ```

  @class {{sound-is-fastforwardable}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Boolean} load? load the sound if it's not loaded
  @return {Boolean}
*/

export default class SoundIsFastForwardable extends StereoBaseIsHelper {
  name = 'sound-is-fastforwardable';

  get result() {
    debugMessage(this, `render = ${this.sound?.isFastForwardable}`);
    return this.sound?.isFastForwardable;
  }
}
