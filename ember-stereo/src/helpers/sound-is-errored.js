import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from '../-private/utils/has-equal-urls';
import { inject as service } from '@ember/service';

/**
  A helper to detect if a sound is errored.
  ```hbs
    {{#if (sound-is-errored @identifier)}}
      <p>This sound is errored</p>
    {{else}}
      <p>This sound is not errored</p>
    {{/if}}
  ```

  @class {{sound-is-errored}}
  @type {Helper}
  @param {String} url
*/

const UNINITIALIZED = Object.freeze({});

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {String} format time, ms, s,
  @param {Boolean} load load the sound if it's not loaded?
*/
export default class SoundIsErrored extends Helper {
  name = 'sound-is-errored';
  @service stereo;
  @dedupeTracked result = false;
  identifier = UNINITIALIZED;

  compute([identifier = 'system'], { connectionName }) {
    let errors = this.stereo.cachedErrors.filter(async (e) =>
      hasEqualUrls(e.url, identifier)
    );

    if (connectionName) {
      return (
        errors.filter((e) => e.connectionName === connectionName).length > 0
      );
    } else {
      return errors.length > 0;
    }
  }
}
