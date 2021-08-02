import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
  A helper to detect if a sound is loading.
  ```hbs
    {{#if (sound-is-loading @identifier)}}
      <p>This sound is currently loading</p>
    {{else}}
      <p>This sound is not currently loading</p>
    {{/if}}
  ```

  @class {{sound-is-loading}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Boolean}
*/
export default class SoundIsLoading extends StereoBaseIsHelper {
  name = 'sound-is-loading'

  get result() {
    debugMessage(this, `render = ${this.sound?.isLoaded}`)
    return (this.sound && this.sound.isLoading) || this.isLoading
  }
}
