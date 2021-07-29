import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';


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
  @type Helper
  @param {String} url
* @param {Boolean} load? load the sound if it's not loaded
*/

export default class SoundIsFastForwardable extends StereoBaseIsHelper {
  name = 'sound-is-fastforwardable'

  get result() {
    debugMessage(this, `render = ${this.sound?.isFastForwardable}`)
    return this.sound?.isFastForwardable;
  }
}

