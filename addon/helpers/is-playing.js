import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';

/**
  A helper to detect if a sound is playing.
  ```hbs
    {{#if (is-playing this.url)}}
      <p>This url is currently loading</p>
    {{else}}
      <p>This url is not currently loading</p>
    {{/if}}
  ```

  Can also look for any system-level play event by passing in no argument
  ```hbs
    {{#if (is-playing)}}
      <p>Something is loading</p>
    {{else}}
      <p>Something is not loading</p>
    {{/if}}
  ```

  @class HifiIsPlaying
  @type Helper
  @param {String} url
*/
@classic
export default class HifiIsPlaying extends HifiBaseIsHelper {
  name = 'is-playing'

  listen = ['audio-played', 'audio-paused', 'current-sound-changed', 'current-sound-interrupted']

  checkSystem() {
    return this.hifi.isPlaying;
  }

  checkSound(sound) {
    return !!(sound && sound.isPlaying);
  }

  /**
    returns the state
    @method compute
    @param {String} [url]
    @return {boolean}
  */

  /* inherited */
}