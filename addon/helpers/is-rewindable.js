import HifiBaseIsHelper from 'ember-hifi/-private/helpers/is-helper';
import debug from 'debug';

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

export default class HifiIsRewindable extends HifiBaseIsHelper {
  get result() {
    if (this.identifier === 'system') {
      debug(`ember-hifi:helpers:is-rewindable:${this.identifier}`)(`render = ${this.hifi.isRewindable}`)
      return this.hifi.isRewindable;
    }
    else {
      debug(`ember-hifi:helpers:is-rewindable:${this.identifier}`)(`render = ${this.hifi.isRewindable}`)
      return this.sound?.isRewindable;
    }
  }
}