import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';

/**
  A helper to detect if a sound is fast-forwardable.
  ```hbs
    {{#if (is-fast-forwardable this.url)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (is-fast-forwardable)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  @class HifiIsFastForwardable
  @type Helper
  @param {String} url
*/

@classic
export default class HifiIsFastForwardable extends HifiBaseIsHelper {
  name = 'is-fast-forwardable'
  listen = ['audio-loaded']

  checkSystem() {
    return !!this.hifi.isFastForwardable;
  }

  checkSound(sound) {
    return !!(sound && sound.isFastForwardable);
  }

  /**
    returns the state
    @method compute
    @param {String} [url]
    @return {boolean}
  */

  /* inherited */
}