import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
  A helper to detect if a sound is rewindable.
  ```hbs
    {{#if (sound-is-rewindable this.urlOrSound)}}
      <p>The sound with this.url is rewindable</p>
    {{else}}
      <p>The sound with this.url is not rewindable</p>
    {{/if}}
  ```

  @class {{sound-is-rewindable}}
  @type Helper
  @param {String} url
*/

export default class SoundIsRewindable extends StereoBaseIsHelper {
  name = 'sound-is-rewindable'

  get result() {
    debugMessage(this, `render = ${this.stereo.isRewindable}`)
    return this.sound?.isRewindable;
  }
}
