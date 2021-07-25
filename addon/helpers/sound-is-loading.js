import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
  A helper to detect if a sound is loading.
  ```hbs
    {{#if (sound-is-loading this.urlOrSound)}}
      <p>This url is currently loading</p>
    {{else}}
      <p>This url is not currently loading</p>
    {{/if}}
  ```

  @class {{sound-is-loading}}
  @type Helper
  @param {String} url
*/

export default class SoundIsLoading extends StereoBaseIsHelper {
  name = 'sound-is-loading'

  get result() {
    debugMessage(this, `render = ${this.sound?.isLoaded}`)
    return (this.sound && this.sound.isLoading) || this.isLoading;
  }
}
