import HifiBaseIsHelper from 'ember-hifi/-private/helpers/is-helper';
import debug from 'debug';

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
export default class HifiIsLoaded extends HifiBaseIsHelper {
  name = 'is-loaded'

  get result() {
    if (this.identifier == 'system') {
      debug(`ember-hifi:helpers:is-loading:${this.identifier}`)(`render = ${!!this.hifi.currentSound}`)
      return !!this.hifi.currentSound;
    }
    else {
      debug(`ember-hifi:helpers:is-loading:${this.identifier}`)(`render = ${this.sound?.isLoaded}`)
      return this.sound?.isLoaded;
    }
  }
}