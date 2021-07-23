import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import { inject as service } from '@ember/service';
import debugMessage from 'ember-stereo/-private/utils/debug-message';
import { makeArray } from '@ember/array';
/**
  A helper to display error details.
  ```hbs
    {{sound-error-details this.url}}
  ```

  @class {{sound-error-details}}
  @type Helper
  @param {String} url
*/

const UNINITIALIZED = Object.freeze({});

export default class SoundIsErrored extends Helper {
  name = 'sound-is-errored';
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked result = UNINITIALIZED

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  reset() {
    this.result = UNINITIALIZED
  }

  compute([identifier], {connectionName = 'NativeAudio'}) {
    if (identifier !== this.identifier) {
      this.result = UNINITIALIZED; // if identifier changes, reinitialize sound
      this.identifier = identifier || 'system';
      if (this.identifier !== 'system') {
        let result = this.stereo.errorCache.find(this.identifier)
        if (result) {
          this.result = makeArray(result);
        }
        else {
          this.stereo.on('audio-load-error', async ({sound}) => {
            let isEqual = await hasEqualIdentifiers(this.identifier, sound.url);
            if (isEqual) {
              this.result = this.stereo.errorCache.find(this.identifier)
            }
          });
        }
      }
    }

    if (!this.result) { return }
    if (this.result.length === 1) { // only one connection
      var error = this.result[0];
      if (connectionName && error[connectionName]) {
        debugMessage(this, `render = ${error[connectionName]}`);
        return error[connectionName];
      }
      else {
        return error[Object.keys(error)[0]];
      }
    }
    else if (this.result.length > 0) {
      return this.result
    }
  }
}
