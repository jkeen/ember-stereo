import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import { inject as service } from '@ember/service';

/**
  A helper to detect if a sound is errored.
  ```hbs
    {{#if (sound-is-errored @identifier}}
      <p>This sound is errored</p>
    {{else}}
      <p>This sound is not errored</p>
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
    let errors = this.stereo.cachedErrors.filter(async e => await hasEqualIdentifiers(e.url, identifier))

    if (connectionName) {
      return errors.filter(e => e.connectionName === connectionName).length > 0
    }
    else {
      return errors.length > 0;
    }
  }
}
