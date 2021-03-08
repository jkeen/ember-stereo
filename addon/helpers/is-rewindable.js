import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './-is-helper';

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

  @class {{is-rewindable}}
  @type Helper
  @param {String} url
*/

@classic
export default class HifiIsRewindable extends HifiBaseIsHelper {
  get result() {
    if (this.identifier === 'system') {
      return this.hifi.isRewindable;
    }
    else {
      return this.sound?.isRewindable;
    }
  }
}