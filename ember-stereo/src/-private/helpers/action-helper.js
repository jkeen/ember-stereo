import { service } from '@ember/service';
import Helper from '@ember/component/helper';
import prepareOptions from '../utils/prepare-options';
import { dedupeTracked } from 'tracked-toolbox';

export default class ActionHelper extends Helper {
  @service stereo;
  identifier = null;
  @dedupeTracked options;
  @dedupeTracked _sound;

  get sound() {
    return this._sound;
  }

  compute([identifier], options = {}) {
    this.options = prepareOptions(options);

    // Looked up every time, since a promise identifier can collapse onto another Sound after it resolves.
    this._sound = this.stereo.findSound(identifier);

    if (identifier !== this.identifier) {
      this.identifier = identifier;

      if (!this.sound?.isResolved && options.load) {
        this.stereo.load(this.identifier, this.options);
      }
    }

    return (e) => this.performAction(this.sound, e);
  }

  performAction() {
    return false;
  }
}
