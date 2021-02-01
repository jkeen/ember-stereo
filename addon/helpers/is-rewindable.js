import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';
import Helper from '@ember/component/helper';

/**
  A helper to detect if a sound is rewindable.
  ```hbs
    {{#if (is-rewindable this.url)}}
      <p>The currently loaded sound is rewindable</p>
    {{else}}
      <p>The currently loaded sound is not rewindable</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (is-rewindable)}}
      <p>The currently loaded sound is rewindable</p>
    {{else}}
      <p>The currently loaded sound is not rewindable</p>
    {{/if}}
  ```

  @class HifiIsRewindable
  @type Helper
  @param {String} url
*/
@classic
export default class HifiIsRewindable extends HifiBaseIsHelper {
  name = 'is-rewindable'
  listen = ['audio-loaded']

  checkSystem() {
    return !!this.hifi.isRewindable;
  }

  checkSound(sound) {
    return !!(sound && sound.isRewindable);
  }
}