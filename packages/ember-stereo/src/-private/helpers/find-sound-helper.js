import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StereoFindHelper extends Helper {
  @service stereo;
  @tracked identifier;

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  get sound() {
    return this.stereo.findLoadedSound(this.identifier);
  }

  get result() {
    return false;
  }

  compute([identifier], options = {}) {
    this.options = options;
    this.identifier = identifier;
    if (identifier !== this.identifier) {
      if (identifier && identifier.url && identifier.play) {
        this._sound = identifier;
      }
      // if (identifier) {
      //   this.soundProxy = this.stereo.soundProxy(identifier);
      // }

      // if (!this.sound) {
      //   if (options.load) {
      //     this.stereo.load(identifier, this.options);
      //   }
      // }
      this.identifier = identifier;
    }

    return this.result;
  }
}
