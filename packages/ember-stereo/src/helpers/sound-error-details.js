import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import debugMessage from 'ember-stereo/-private/utils/debug-message';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { tracked } from '@glimmer/tracking';;

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
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {String} connectionName? name of connection's errors to get
  @return {any}
*/

const UNINITIALIZED = null;
export default class SoundIsErrored extends Helper {
  name = 'sound-is-errored';
  @service stereo;

  identifier = UNINITIALIZED;
  @tracked url;

  get result() {
    return this.stereo.cachedErrors.find((e) => hasEqualUrls(e.url, this.url));
  }

  compute([identifier], { connectionName }) {
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      this.stereo.resolveIdentifier
        .perform(this.identifier)
        .then((url) => (this.url = url))
        .catch();
    }

    if (!this.result) {
      return;
    }

    var errObject = this.result;
    if (connectionName) {
      debugMessage(this, `render = ${errObject.errors[connectionName]}`);
      return errObject.errors[connectionName];
    } else {
      let errors = [];
      this.stereo.connectionNames.forEach((name) => {
        if (errObject.errors[name]) {
          errors.push(errObject.errors[name]);
        }
      });

      return errors[0] || errObject.errors.generic;
    }
  }
}
