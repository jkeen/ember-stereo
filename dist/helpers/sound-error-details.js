import { b as _defineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';

/**
  A helper to display error details.
  ```hbs
  {{sound-error-details @identifier}}

  {{sound-error-details @identifier connectionName="NativeAudio"}} // only display errors from native audio
  ```

  @class {{sound-error-details}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @param {String} connectionName? name of connection's errors to get
  @return {any}
*/
class SoundErrorDetails extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-error-details');
  }
  get result() {
    if (!this.sound) {
      return undefined;
    }
    let {
      connectionName
    } = this.options;
    if (connectionName) {
      return this.sound.failures?.find(failure => failure.error && (failure.connectionKey === connectionName || failure.connectionName === connectionName))?.error;
    }
    return this.sound.error || this.sound.errors[0];
  }
}

export { SoundErrorDetails as default };
//# sourceMappingURL=sound-error-details.js.map
