import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debug from 'debug';

/**
  A helper to detect if a sound is seekable.
  ```hbs
    {{#if (sound-is-seekable this.url)}}
      <p>The currently loaded sound is seekable</p>
    {{else}}
      <p>The currently loaded sound is not seekable</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (sound-is-seekable)}}
      <p>The currently loaded sound is seekable</p>
    {{else}}
      <p>The currently loaded sound is not seekable</p>
    {{/if}}
  ```

  @class {{sound-is-seekable}}
  @type Helper
  @param {String} url
*/

export default class SoundIsSeekable extends StereoBaseIsHelper {
  get result() {
    if (this.identifier === 'system') {
      debug(`ember-stereo:helpers:sound-is-seekable:${this.identifier}`)(`render = ${this.stereo.isSeekable}`)
      return this.stereo.isSeekable;
    }
    else {
      debug(`ember-stereo:helpers:sound-is-seekable:${this.identifier}`)(`render = ${this.stereo.isSeekable}`)
      return this.sound?.isSeekable;
    }
  }
}
