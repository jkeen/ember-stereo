import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';
import { makeArray } from '@ember/array';
@classic
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

  listenForChanges(compare) {
    if (this.compare != compare) {
      if (this.compare) {
        makeArray(this.compare).forEach(url => {
          try {
            this.hifiSync.off(url.toString(), this.boundRecompute);
          } catch(e) {}
        })
      }
      this.compare = compare;
      makeArray(compare).forEach(url => {
        this.hifiSync.on(url.toString(), () => this.recompute())
      });
    }
  }

  compute(compare) {
    this.listenForChanges(compare);
    let result = this.hifiSync.isPlayingElsewhere(compare);
    if (result) {
      debug(`ember-hifi:${compare.toString()}`)(`is-playing-elsewhere = ${result}`);

      return result;  
    }
  }
}
