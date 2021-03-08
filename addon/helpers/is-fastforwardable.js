import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './-is-helper';

/**
  A helper to detect if a sound is fast-forwardable.
  ```hbs
    {{#if (is-fastforwardable this.url)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (is-fastforwardable)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  @class {{is-fastforwardable}}
  @type Helper
  @param {String} url
*/

@classic
export default class HifiIsFastForwardable extends HifiBaseIsHelper {
  get result() {
    if (this.identifier === 'system') {
      return this.hifi.isFastForwardable;
    }
    else {
      return this.sound?.isFastForwardable;
    }
  }
}

