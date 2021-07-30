import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import { inject as service } from '@ember/service';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { makeArray } from '@ember/array';
/**
  A helper to display error details.
  ```hbs
  {{sound-error-details @identifier}}

  {{sound-error-details @identifier connectionName="NativeAudio"}} // only display errors from native audio
  ```

  @class {{sound-error-details}}
  @type Helper
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {String} connectionName? name of connection's errors to get
  @returns {any}
*/

const UNINITIALIZED = null;
export default class SoundIsErrored extends Helper {
  name = 'sound-is-errored';
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked url;

  get result() {
    return this.stereo.cachedErrors.find(e => hasEqualUrls(e.url, this.url))
  }

  compute([identifier], {connectionName = 'NativeAudio'}) {
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      this.stereo.resolveIdentifier.perform(this.identifier).then(url => this.url = url).catch(e => {})
    }

    if (!this.result) { return }

    var error = this.result;
    if (connectionName && error.errors[connectionName]) {
      debugMessage(this, `render = ${error.errors[connectionName]}`);
      return error.errors[connectionName];
    }
    else {
      return error.errors.generic || error.errors[Object.keys(error.errors)[0]];
    }
  }
}
