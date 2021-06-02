import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debug from 'debug';

/**
  A helper to detect if a sound is rewindable.
  ```hbs
    {{#if (sound-is-rewindable this.url)}}
      <p>The currently loaded sound is rewindable</p>
    {{else}}
      <p>The currently loaded sound is not rewindable</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (sound-is-rewindable)}}
      <p>The currently loaded sound is rewindable</p>
    {{else}}
      <p>The currently loaded sound is not rewindable</p>
    {{/if}}
  ```

  @class {{sound-is-rewindable}}
  @type Helper
  @param {String} url
*/

export default class SoundIsRewindable extends StereoBaseIsHelper {
  get result() {
    if (this.identifier === 'system') {
      debug(`ember-stereo:helpers:sound-is-rewindable:${this.identifier}`)(`render = ${this.stereo.isRewindable}`)
      return this.stereo.isRewindable;
    }
    else {
      debug(`ember-stereo:helpers:sound-is-rewindable:${this.identifier}`)(`render = ${this.stereo.isRewindable}`)
      return this.sound?.isRewindable;
    }
  }
}
