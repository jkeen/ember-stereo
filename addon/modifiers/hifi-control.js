import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class HifiControlModifier extends Modifier {
  @service hifi;
  @service hifiSync;

  // states: unplayed, loaded, playing, paused, playing-elsewhere, failed

  get urlOrPromise() {
    return this.args.positional[0];
  }

  get options() {
    return this.args.named;
  }

  @action async onClick() {
    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      if (typeof this.urlOrPromise == 'function') {
        if (this.sound) {
          this.sound.togglePause();
        }
        else {
          let result = await this.hifi.play(this.urlOrPromise());
          this.sound = result.sound
        }
      }
      else {
        if (this.sound) {
          this.sound.togglePause();
        }
        else {
          let result = await this.hifi.play(this.urlOrPromise);
          this.sound = result.sound
        }
      }
    }
    
    this.onStateChange(this.sound);
  }

  async didReceiveArguments() {
    this.hifiSync.subscribe(this.urlOrPromise, (e) => this.onStateChange(e));
    this.element.setAttribute('data-hifi-state', 'unplayed');
    let state = this.hifiSync.getState(this.urlOrPromise);
    this.onStateChange(state);

    this.sound = this.hifi.findLoaded(this.urlOrPromise);

    // let { sound } = await this.hifi.load(this.url);
    // this.sound = sound;
  }

  didUpdateArguments() {

  }

  onStateChange(sound) {
    if (sound) {
      if (sound.isPlaying) {
        this.element.setAttribute('data-hifi-state', 'playing');
      }
      else if (!sound.isPlaying) {
        this.element.setAttribute('data-hifi-state', 'paused');
      }
    }
    else {
      this.element.setAttribute('data-hifi-state', 'unplayed');
    }
  }

  onNewLoadRequest() {

  }

  onPreload() {

  }

  async didInstall() {
    this.element.addEventListener('click', this.onClick, true);

    this.hifi.on('new-load-request', this.onNewLoadRequest)
    this.hifi.on('pre-load', this)
  }

  willRemove() {
    this.element.removeEventListener('click', this.onClick, true);
  }
}


