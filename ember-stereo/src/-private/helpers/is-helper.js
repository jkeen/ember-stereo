import { service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';

const UNINITIALIZED = null;
export default class StereoBaseIsHelper extends Helper {
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked task = UNINITIALIZED;
  @dedupeTracked foundSound = UNINITIALIZED;
  @dedupeTracked _sound = UNINITIALIZED;
  @dedupeTracked options = UNINITIALIZED;

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  get isLoading() {
    return this.sound?.isLoading;
  }

  get sound() {
    // findSound returns an identity-stable Sound that exists before its
    // connection loads; result getters read proxied state that's undefined
    // until it resolves.
    return this._sound || this.foundSound;
  }

  get result() {
    return false;
  }

  compute([identifier], options = {}) {
    this.options = options;

    if (identifier !== this.identifier) {
      this.identifier = identifier;

      if (identifier && identifier.url && identifier.play) {
        this._sound = identifier;
      } else if (identifier) {
        this.foundSound = this.stereo.findSound(identifier);
      }

      if (!this.sound?.isResolved && options.load) {
        this.stereo.load(identifier, this.options);
      }
    }

    return this.result;
  }
}
