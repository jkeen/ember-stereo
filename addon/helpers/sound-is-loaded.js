import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
  A helper to detect if a sound is loaded.
  ```hbs
    {{#if (sound-is-loaded this.url)}}
      <p>The currently loaded sound is loaded</p>
    {{else}}
      <p>The currently loaded sound is not loaded</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (sound-is-loaded)}}
      <p>The currently loaded sound is loaded</p>
    {{else}}
      <p>There is no current sound</p>
    {{/if}}
  ```

  @class {{sound-is-loaded}}
  @type Helper
  @param {String} url
*/
export default class SoundIsLoaded extends StereoBaseIsHelper {
  name = 'sound-is-loaded'

  get result() {
    if (this.identifier == 'system') {
      debugMessage(this, `render = ${!!this.stereo.currentSound}`)
      return !!this.stereo.currentSound;
    }
    else {
      debugMessage(this, `render = ${this.sound?.isLoaded}`)
      return (this.stereo.soundCache.cachedList || []).filter(url => this.sound && url === this.sound.url).length > 0;
    }
  }
}
