import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

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
  @type Helper
  @param {String} url
  @param {Boolean} load? load the sound if it's not loaded
*/

export default class SoundIsSeekable extends StereoBaseIsHelper {
  name = 'sound-is-seekable'

  get result() {
    debugMessage(this, `render = ${this.sound?.isSeekable}`)
    return this.sound?.isSeekable;
  }
}
