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

  get eventName() {
    return this.args.named.on || 'click'
  }

  get metadata() {
    return this.args.named.metadata || {}
  }

  @action async handleAction() {
    if (this.hifiSync.isPlayingElsewhere(this.urlOrPromise)) {
      this.hifiSync.pause();
      this.remotelyPaused = true;
    }
    else if (this.remotelyPaused) {
      // remotely play
      this.hifiSync.play(this.urlOrPromise);
      this.remotelyPaused = false;
    }
    else if (this.sound) {
      this.sound.togglePause();
    }
    else {
      if (typeof this.urlOrPromise == 'function') {
        let result = await this.hifi.play(this.urlOrPromise(), {metadata: this.metadata});
        this.sound = result.sound
      }
      else {
        let result = await this.hifi.play(this.urlOrPromise, {metadata: this.metadata});
        this.sound = result.sound
      }  
    }
    
    this.onStateChange(this.sound);
  }

  async didReceiveArguments() {
    this.element.setAttribute('data-hifi-state', 'unplayed');
    let state = this.hifiSync.getState(this.urlOrPromise);
    this.onStateChange(state);

    this.sound = this.hifi.findLoaded(this.urlOrPromise);
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

  async didInstall() {
    if (this.urlOrPromise && this.options.preload) {
      this.hifi.load(this.urlOrPromise, {metadata: this.metadata});
    }
    this.element.addEventListener(this.eventName, this.handleAction, true);

    this.hifi.on('new-load-request', this.onNewLoadRequest)
    this.hifi.on('pre-load', this)
  }

  willRemove() {
    if (this.urlOrPromise) {
      // this.hifiSync.off(this.urlOrPromise, (e) => this.onStateChange(e));
    }
    this.element.removeEventListener(this.eventName, this.handleAction, true);
  }
}


