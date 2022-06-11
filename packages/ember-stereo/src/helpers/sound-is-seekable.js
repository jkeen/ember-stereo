import FindSoundHelper from 'ember-stereo/-private/helpers/find-sound-helper';
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
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Boolean} load? load the sound if it's not loaded
  @return {Boolean}
*/

export default class SoundIsSeekable extends FindSoundHelper {
  name = 'sound-is-seekable';

  get result() {
    debugMessage(this, `render = ${this.sound?.isSeekable}`);
    return this.sound?.isSeekable;
  }
}
