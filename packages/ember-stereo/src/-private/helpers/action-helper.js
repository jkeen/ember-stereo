import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import prepareOptions from 'ember-stereo/-private/utils/prepare-options';
import BaseSound from 'ember-stereo/stereo-connections/base';
import { tracked } from '@glimmer/tracking';
export default class ActionHelper extends Helper {
  @service stereo;
  identifier = null;
  @tracked options;
  @tracked _sound;
  @tracked soundProxy;

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
      if (identifier instanceof BaseSound) {
        this._sound = this.identifier;
      }

      if (identifier) {
        this.soundProxy = this.stereo.soundProxy(identifier);
      }

      if (!this.sound) {
        if (options.load) {
          this.stereo.load(this.identifier, this.options);
        }
      }

      this.identifier = identifier;
    }

    return (e) => this.performAction(this.sound, e);
  }

  performAction() {
    return false;
  }
}
