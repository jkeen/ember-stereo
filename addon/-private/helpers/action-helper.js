import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import prepareOptions from 'ember-stereo/-private/utils/prepare-options';
import { dedupeTracked } from 'tracked-toolbox';
import BaseSound from 'ember-stereo/stereo-connections/base';

export default class ActionHelper extends Helper {
  @service stereo;
  identifier = null;
  @dedupeTracked options;
  @dedupeTracked _sound;
  @dedupeTracked soundProxy;

  get sound() {
    if (this._sound) {
      return this._sound;
    } else if (this.soundProxy && this.soundProxy.isResolved) {
      return this.soundProxy.value;
    }

    return null;
  }

  compute([identifier], options = {}) {
    this.options = prepareOptions(options);

    if (identifier !== this.identifier) {
      this.identifier = identifier;
      if (this.identifier instanceof BaseSound) {
        this._sound = this.identifier;
      }

      if (this.identifier) {
        this.soundProxy = this.stereo.soundProxy(identifier);
      }

      if (!this.sound) {
        if (options.load) {
          this.stereo.load(this.identifier, this.options);
        }
      }
    }

    return (e) => this.performAction(this.sound, e);
  }

  performAction() {
    return false;
  }
}
