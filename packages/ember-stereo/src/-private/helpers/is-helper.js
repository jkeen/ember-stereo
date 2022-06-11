import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import { tracked } from '@glimmer/tracking';;

const UNINITIALIZED = null;
export default class StereoBaseIsHelper extends Helper {
  @service stereo;

  identifier = UNINITIALIZED;
  @tracked task = UNINITIALIZED;
  @tracked soundProxy = UNINITIALIZED;
  @tracked _sound = UNINITIALIZED;
  @tracked options = UNINITIALIZED;

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  get isLoading() {
    return (this.sound && this.sound.isLoading) || (this.soundProxy && this.soundProxy.isLoading);
  }

  get sound() {
    if (this._sound) {
      return this._sound;
    } else if (this.soundProxy && this.soundProxy.isResolved) {
      return this.soundProxy.value;
    }

    return null;
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
