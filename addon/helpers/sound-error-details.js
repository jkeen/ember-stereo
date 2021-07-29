import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import { inject as service } from '@ember/service';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import resolveUrls from 'ember-stereo/-private/utils/resolve-urls';
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
  @param {String} url
  @param {String} connectionName?
*/

const UNINITIALIZED = Object.freeze({});

export default class SoundIsErrored extends Helper {
  name = 'sound-is-errored';
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked url;

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  get result() {
    return this.stereo.cachedErrors.find(e => hasEqualUrls(e.url, this.url))
  }

  compute([identifier], {connectionName = 'NativeAudio'}) {
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      resolveUrls(this.identifier).then(url => this.url = url)
    }

    if (!this.result) { return }

    var error = this.result;
    if (connectionName && error.errors[connectionName]) {
      debugMessage(this, `render = ${error.errors[connectionName]}`);
      return error[connectionName];
    }
    else {
      return error.errors.generic || error.errors[Object.keys(error.errors)[0]];
    }
  }
}
