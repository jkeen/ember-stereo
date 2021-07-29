import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
  A helper to detect if a sound is loaded.
  ```hbs
    {{#if (sound-is-loaded @identifier)}}
      <p>The sound is loaded</p>
    {{else}}
      <p>This sound is not loaded</p>
    {{/if}}
  ```

  @class {{sound-is-loaded}}
  @type Helper
  @param {String} url
*/
export default class SoundIsLoaded extends StereoBaseIsHelper {
  name = 'sound-is-loaded'

  get result() {
    debugMessage(this, `render = ${this.sound?.isLoaded}`)
    let isLoaded = (this.stereo.soundCache.cachedList || []).filter(url => this.sound && url === this.sound.url).length > 0;

    return (isLoaded && this.sound && !this.sound.isLoading)
  }
}
