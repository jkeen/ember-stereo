import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debug from 'debug';

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
  name = 'sound-is-loaded'
  debugName = 'ember-stereo:helpers:sound-is-loading'

  get result() {
    if (this.identifier == 'system') {
      debug(`${this.debugName}:${this.identifier}`)(`render = ${!!this.stereo.currentSound}`)
      return !!this.stereo.isLoading;
    }
    else {
      debug(`${this.debugName}:${this.identifier}`)(`render = ${this.sound?.isLoaded}`)
      return this.sound?.isLoading || this.isLoading;
    }
  }
}
