import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { inject as service } from '@ember/service';
import debug from 'debug';
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
            let isEqual = await hasEqualUrls(this.identifier, sound.url);
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
        debug(`ember-stereo:helpers:error-details:${identifier}`)(`render = ${error[connectionName]}`);
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
