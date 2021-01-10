import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class HifiPlayModifier extends Modifier {
  @service hifi;

  get urlOrPromise() {
    return this.args.positional[0];
  }

  get options() {
    return this.args.named;
  }

  @action onClick() {
    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      this.hifi.play(this.urlOrPromise).then(s => {
        this.sound = s.sound
      })
    }
  }

  async didReceiveArguments() {
    // let { sound } = await this.hifi.load(this.url);
    // this.sound = sound;
  }

  didUpdateArguments() {

  }

  async didInstall() {
    this.element.addEventListener('click', this.onClick, true);
  }

  willRemove() {
    this.element.removeEventListener('click', this.onClick, true);
  }
}


