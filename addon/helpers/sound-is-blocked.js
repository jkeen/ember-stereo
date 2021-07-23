import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

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

  @class {{sound-is-blocked}}
  @type Helper
  @param {String} url
*/
export default class SoundIsBlocked extends StereoBaseIsHelper {
  name = 'sound-is-blocked'

  get result() {
    if (this.identifier == 'system') {
      return this.stereo.isBlocked;
    }
    else {
      return this.sound && this.sound.isBlocked;
    }
  }
}
