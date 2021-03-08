import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './-is-helper';

/**
  A helper to detect if a sound is loaded.
  ```hbs
    {{#if (is-loaded this.url)}}
      <p>The currently loaded sound is loaded</p>
    {{else}}
      <p>The currently loaded sound is not loaded</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (is-loaded)}}
      <p>The currently loaded sound is loaded</p>
    {{else}}
      <p>There is no current sound</p>
    {{/if}}
  ```

  @class {{is-loaded}}
  @type Helper
  @param {String} url
*/
@classic
export default class HifiIsLoaded extends HifiBaseIsHelper {
  get result() {
    if (this.identifier == 'system') {
      return !!this.hifi.currentSound;
    }
    else {
      return this.sound?.isLoaded;
    }
  }
}