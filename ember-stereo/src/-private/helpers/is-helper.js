import { service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';

const UNINITIALIZED = null;
export default class StereoBaseIsHelper extends Helper {
  @service stereo;

  identifier = UNINITIALIZED;
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
    return this._sound;
  }

  get result() {
    return false;
  }

  compute([identifier], options = {}) {
    this.options = options;

    // Looked up every time, since a promise identifier can collapse onto another Sound after it resolves.
    this._sound = this.stereo.findSound(identifier);

    if (identifier !== this.identifier) {
      this.identifier = identifier;

      if (!this.sound?.isResolved && options.load) {
        this.stereo.load(identifier, this.options);
      }
    }

    return this.result;
  }
}
