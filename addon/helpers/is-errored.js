import classic from 'ember-classic-decorator';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { inject as service } from '@ember/service';

import debug from 'debug';
/**
  A helper to detect if a sound is errored.
  ```hbs
    {{#if (is-errored this.url)}}
      <p>The currently loaded sound is errored</p>
    {{else}}
      <p>The currently loaded sound is not errored</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (is-errored)}}
      <p>The currently loaded sound is errored</p>
    {{else}}
      <p>Sound is ok</p>
    {{/if}}
  ```

  @class HifiIsErrored
  @type Helper
  @param {String} url
*/

const UNINITIALIZED = Object.freeze({});

@classic
export default class HifiIsErrored extends Helper {
  @service hifi;

  name = 'is-errored';
  @dedupeTracked result = false;
  identifier = UNINITIALIZED;

  /**
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, ms, s,
  * @param {Boolean} options.load load the sound if it's not loaded?
  */
  compute([identifier = 'system'], {connectionName}) {
    if (identifier !== this.identifier) {
      this.result = UNINITIALIZED; // if identifier changes, reinitialize sound
      this.identifier = identifier || 'system';
      if (this.identifier !== 'system') {
        let error = this.hifi.errorCache.find(this.identifier);
        if (error) {
          this.result = true;
        }
        else {
          this.hifi.on('audio-load-error', async (sound) => {
            this.result = await hasEqualUrls(this.identifier, sound.url);
          });
        }
      }
    }

    return this.result === true;
  }
}
