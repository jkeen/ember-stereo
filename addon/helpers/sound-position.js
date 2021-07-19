import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import {numericDuration} from 'ember-stereo/helpers/numeric-duration';
import debug from 'debug';
import {tracked} from '@glimmer/tracking';
import { dedupeTracked } from 'tracked-toolbox'
import { didCancel } from 'ember-concurrency';

/**
  A helper to get a sound's position.
  ```hbs
   {{sound-position this.url}} #=> 144000
   {{sound-position this.url format="time"}} #=> "02:24"
   {{sound-position this.url format="percent"}} #=> "56"

   ```

  @class {{sound-position}}
  @type Helper
  @param {String} url
  @returns {Float}
*/

export default class soundPosition extends Helper {
  @service stereo;
  @tracked sound;
  @tracked result;

  default = 0

  /**
    returns the position in milliseconds
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, percent,
    @return {Float}
  */

  compute([identifier='system'], {format=false, defaultValue}) {
    if (identifier !== this.identifier) {
      this.identifier = identifier || 'system';
      if (this.identifier == 'system') {
        this.sound = this.stereo.currentSound
        this.stereo.on('current-sound-changed', ({ sound }) => {
          this.sound = sound;
        })
      }
      else if (this.identifier !== 'system') {
        let sound = this.stereo.findLoaded(this.identifier)
        if (sound) {
          this.sound = sound;
        }
        else {
          this.stereo.on('new-load-request', async ({loadPromise, urlsOrPromise /*, options */}) => {
            let isEqual = await hasEqualIdentifiers(this.identifier, urlsOrPromise);
            if (isEqual) {
              try {
                loadPromise.then(({ sound }) => (this.sound = sound));
              }
              catch (e) {
                if (!didCancel(e)) {
                  throw e;
                }
              }

            }
          });
        }
      }
    }
    let result;

    if (format == 'percent' || format == 'percentage') {
      if (this.sound) {
        result = ((this.sound.position / this.sound.duration) * 100);
      }
      else {
        result = defaultValue || 0;
      }
    }
    else if (format == 'time') {
      if (this.sound?.position !== undefined) {
        result = numericDuration([this.sound.position])
      }
      else {
        result = defaultValue || "00:00";
      }
    }
    else if (this.sound?.position === undefined && defaultValue) {
      result = defaultValue;
    }
    else {
      result = this.sound?.position;
    }

    this.result = result;

    debug(`ember-stereo:helpers:sound-position:${identifier}:${format}`)(`render = ${this.result}`);
    return this.result
  }
}
