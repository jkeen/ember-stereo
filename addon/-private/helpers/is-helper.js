import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import BaseSound from 'ember-stereo/stereo-connections/base';

const UNINITIALIZED = null;
export default class StereoBaseIsHelper extends Helper {
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked task = UNINITIALIZED
  @dedupeTracked soundProxy = UNINITIALIZED
  @dedupeTracked _sound = UNINITIALIZED
  @dedupeTracked options = UNINITIALIZED

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  get isLoading() {
    return (this.sound && this.sound.isLoading) || (this.soundProxy && this.soundProxy.isLoading)
  }

  get sound() {
    if (this._sound) {
      return this._sound;
    }
    else if (this.soundProxy && this.soundProxy.isResolved) {
      return this.soundProxy.value
    }

    return null;
  }

  get result() {
    return false;
  }

  compute([identifier], options = {}) {
    this.options = options;

    if (identifier !== this.identifier) {
      this.identifier = identifier

      if (identifier instanceof BaseSound) {
        this._sound = identifier;
      }
      if (identifier) {
        this.soundProxy = this.stereo.soundProxy(identifier);
      }

      if (!this.sound) {
        if (options.load) {
          this.stereo.load(identifier, this.options);
        }
      }
    }

    return this.result;
  }
}
