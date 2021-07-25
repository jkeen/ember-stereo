import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';


/**
  A helper to detect if a sound is fast-forwardable.
  ```hbs
    {{#if (sound-is-fastforwardable this.urlOrSound)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  @class {{sound-is-fastforwardable}}
  @type Helper
  @param {String} url
  @param {Boolean} options.load load the sound if it's not loaded?

*/

export default class SoundIsFastForwardable extends StereoBaseIsHelper {
  name = 'sound-is-fastforwardable'

  get result() {
    debugMessage(this, `render = ${this.sound?.isFastForwardable}`)
    return this.sound?.isFastForwardable;
  }
}

