import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

/**
  A helper to detect if a sound is loading.
  ```hbs
    {{#if (sound-is-loading this.url)}}
      <p>This url is currently loading</p>
    {{else}}
      <p>This url is not currently loading</p>
    {{/if}}
  ```

  Can also look for any system-level loading event by passing in no argument
  ```hbs
    {{#if (sound-is-loading)}}
      <p>Something is loading</p>
    {{else}}
      <p>Something is not loading</p>
    {{/if}}
  ```

  @class {{sound-is-loading}}
  @type Helper
  @param {String} url
*/

export default class SoundIsLoading extends StereoBaseIsHelper {
  name = 'sound-is-loading'

  get result() {
    if (this.identifier == 'system') {
      debugMessage(this, `render = ${!!this.stereo.currentSound}`)
      return !!this.stereo.isLoading;
    }
    else {
      debugMessage(this, `render = ${this.sound?.isLoaded}`)
      return (this.sound && this.sound.isLoading) || this.isLoading;
    }
  }
}
