import HifiBaseIsHelper from 'ember-hifi/-private/helpers/is-helper';
import debug from 'debug';

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

export default class HifiIsFastForwardable extends HifiBaseIsHelper {
  get result() {
    if (this.identifier === 'system') {
      debug(`ember-hifi:helpers:is-fastforwardable:${this.identifier}`)(`render = ${this.hifi.isFastForwardable}`)
      return this.hifi.isFastForwardable;
    }
    else {
      debug(`ember-hifi:helpers:is-fastforwardable:${this.identifier}`)(`render = ${this.sound?.isFastForwardable}`)
      return this.sound?.isFastForwardable;
    }
  }
}

