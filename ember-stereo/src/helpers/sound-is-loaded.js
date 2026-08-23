import StereoBaseIsHelper from '../-private/helpers/is-helper';
import debugMessage from '../-private/utils/debug-message';

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
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @return {Boolean}
*/
export default class SoundIsLoaded extends StereoBaseIsHelper {
  name = 'sound-is-loaded';

  get result() {
    debugMessage(this, `render = ${this.sound?.isLoaded}`);
    return this.sound && this.sound.isLoaded;
  }
}
