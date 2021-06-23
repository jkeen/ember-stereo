import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';

const UNINITIALIZED = Object.freeze({});
export default class StereoBaseIsHelper extends Helper {
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked sound = UNINITIALIZED
  @dedupeTracked options = UNINITIALIZED

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  compute([identifier], {key = undefined}) {
    this.options = {key};

    if (identifier !== this.identifier) {
      this.sound = UNINITIALIZED; // if identifier changes, reinitialize sound
      this.identifier = identifier || 'system';
      if (this.identifier !== 'system') {
        let sound = this.stereo.findLoaded(this.identifier)
        if (sound) {
          this.sound = sound;
        }
        else {
          this.stereo.on('new-load-request', async ({loadPromise, urlsOrPromise, /* options */}) => {
            let isEqual = await hasEqualIdentifiers(this.identifier, urlsOrPromise);
            if (isEqual) {
              loadPromise.then(({sound, /* failures */}) => {
                this.sound = sound
              });
            }
          });
        }
      }
    }

    return this.result;
  }

  get result() {
    return false
  }
}
