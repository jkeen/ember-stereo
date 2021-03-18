import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';
import { makeArray } from '@ember/array';
export default class HifiIsPlayingElsewhere extends Helper {
  @service hifi;
  @service hifiSync;

  constructor() {
    super(...arguments);

    this.boundRecompute = (e) => this.recompute(e);

    this.hifi.on('audio-played', this.boundRecompute);
    this.hifi.on('audio-paused', this.boundRecompute);
    this.hifi.on('current-sound-changed', this.boundRecompute);
    // this.hifiSync.on('change', (e) => this.recompute(e));
  }

  willDestroy() {
    // this.hifiSync.off('change', this.boundRecompute);
    this.hifi.off('audio-played', this.boundRecompute);
    this.hifi.off('audio-paused', this.boundRecompute);
    this.hifi.off('current-sound-changed', this.boundRecompute);
  }

  listenForChanges(identifier) {
    if (this.identifier != identifier) {
      if (this.identifier) {
        makeArray(this.identifier).forEach(url => {
          try {
            this.hifiSync.off(url.toString(), this.boundRecompute);
          } catch(e) {}
        })
      }
      this.identifier = identifier;
      makeArray(identifier).forEach(url => {
        this.hifiSync.on(url.toString(), () => this.recompute())
      });
    }
  }

  compute([identifier]) {
    this.listenForChanges(identifier);
    let result = this.hifiSync.isPlayingElsewhere(identifier);
    if (result) {
      debug(`ember-hifi:${identifier.toString()}`)(`is-playing-elsewhere = ${result}`);

      return result;  
    }
  }
}
