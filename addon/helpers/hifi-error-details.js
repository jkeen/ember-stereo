import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { inject as service } from '@ember/service';
import debug from 'debug';
import { makeArray } from '@ember/array';
/**
  A helper to display error details.
  ```hbs
    {{hifi-error-details this.url}}
  ```

  @class HifiErrorDetails
  @type Helper
  @param {String} url
*/

const UNINITIALIZED = Object.freeze({});

export default class HifiIsErrored extends Helper {
  @service hifi;
  
  identifier = UNINITIALIZED;
  @dedupeTracked result = UNINITIALIZED
  
  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  compute([identifier], {connectionName = 'NativeAudio'}) {
    if (identifier !== this.identifier) {
      this.result = UNINITIALIZED; // if identifier changes, reinitialize sound
      this.identifier = identifier || 'system';
      if (this.identifier !== 'system') {
        let result = this.hifi.errorCache.find(this.identifier)
        if (result) {
          this.result = makeArray(result);
        }
        else {
          this.hifi.on('audio-load-error', async ({error, sound}) => {
            let isEqual = await hasEqualUrls(this.identifier, sound.url);
            if (isEqual) {
              this.result = this.hifi.errorCache.find(this.identifier)
            }
          });
        }
      }
    }

    if (!this.result) { return }
    if (this.result.length === 1) { // only one connection
      var error = this.result[0];
      if (connectionName && error[connectionName]) {
        debug(`ember-hifi:helpers:error-details:${identifier}`)(`render = ${error[connectionName]}`); 
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
