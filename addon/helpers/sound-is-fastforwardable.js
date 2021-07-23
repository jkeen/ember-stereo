import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';


/**
  A helper to detect if a sound is fast-forwardable.
  ```hbs
    {{#if (sound-is-fastforwardable this.url)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (sound-is-fastforwardable)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  @class {{sound-is-fastforwardable}}
  @type Helper
  @param {String} url
*/

export default class SoundIsFastForwardable extends StereoBaseIsHelper {
  name = 'sound-is-fastforwardable'

  get result() {
    debugMessage(this, `render = ${this.stereo.isFastForwardable}`)

    if (this.identifier === 'system') {
      return this.stereo.isFastForwardable;
    }
    else {
      return this.sound?.isFastForwardable;
    }
  }
}

