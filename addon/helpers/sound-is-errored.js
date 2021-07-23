import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import { inject as service } from '@ember/service';

/**
  A helper to detect if a sound is errored.
  ```hbs
    {{#if (sound-is-errored this.url)}}
      <p>The currently loaded sound is errored</p>
    {{else}}
      <p>The currently loaded sound is not errored</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (sound-is-errored)}}
      <p>The currently loaded sound is errored</p>
    {{else}}
      <p>Sound is ok</p>
    {{/if}}
  ```

  @class {{sound-is-errored}}
  @type Helper
  @param {String} url
*/

const UNINITIALIZED = Object.freeze({});


export default class SoundIsErrored extends Helper {
  name = 'sound-is-errored';
  @service stereo;
  @dedupeTracked result = false;
  identifier = UNINITIALIZED;

  /**
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, ms, s,
  * @param {Boolean} options.load load the sound if it's not loaded?
  */
  compute([identifier = 'system'], { connectionName }) {
    if (identifier !== this.identifier) {
      this.result = UNINITIALIZED; // if identifier changes, reinitialize sound
      this.identifier = identifier || 'system';
      if (this.identifier !== 'system') {
        let error = this.stereo.errorCache.find(this.identifier);

        if (error && connectionName && error[connectionName]) {
          this.result = true;
        }
        else if (error) {
          this.result = true;
        }
        else {
          this.stereo.on('audio-load-error', async ({sound}) => {
            this.result = await hasEqualIdentifiers(this.identifier, sound.url);
          });
        }
      }
    }

    return this.result === true;
  }
}
