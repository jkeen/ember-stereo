import FindSoundHelper from 'ember-stereo/-private/helpers/find-sound-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

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

export default class SoundIsRewindable extends FindSoundHelper {
  name = 'sound-is-rewindable';

  get result() {
    debugMessage(this, `render = ${this.stereo.isRewindable}`);
    return this.sound?.isRewindable;
  }
}
