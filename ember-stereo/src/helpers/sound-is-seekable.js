import StereoBaseIsHelper from '../-private/helpers/is-helper';
import debugMessage from '../-private/utils/debug-message';

/**
  A helper to detect if a sound is seekable.
  ```hbs
    {{#if (sound-is-seekable @identifier)}}
      <p>This sound is seekable</p>
    {{else}}
      <p>This sound is not seekable</p>
    {{/if}}
  ```

  @class {{sound-is-seekable}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @param {Boolean} load? load the sound if it's not loaded
  @return {Boolean}
*/

export default class SoundIsSeekable extends StereoBaseIsHelper {
  name = 'sound-is-seekable';

  get result() {
    debugMessage(this, `render = ${this.sound?.isSeekable}`);
    return this.sound?.isSeekable;
  }
}
