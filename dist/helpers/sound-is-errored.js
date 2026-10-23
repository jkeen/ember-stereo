import { b as _defineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';

/**
  A helper to detect if a sound is errored.
  ```hbs
    {{#if (sound-is-errored @identifier)}}
      <p>This sound is errored</p>
    {{else}}
      <p>This sound is not errored</p>
    {{/if}}
  ```

  @class {{sound-is-errored}}
  @type {Helper}
  @param {String} url
*/

/**
  @method compute
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @param {String} connectionName? only report errors from this connection
  @return {Boolean}
*/
class SoundIsErrored extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-errored');
  }
  get result() {
    if (!this.sound) {
      return false;
    }
    let {
      connectionName
    } = this.options;
    if (connectionName) {
      return !!this.sound.failures?.some(failure => failure.error && (failure.connectionKey === connectionName || failure.connectionName === connectionName));
    }
    return this.sound.isErrored;
  }
}

export { SoundIsErrored as default };
//# sourceMappingURL=sound-is-errored.js.map
