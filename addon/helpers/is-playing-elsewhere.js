import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';

@classic
export default class HifiIsPlayingElsewhere extends Helper {
  @service hifi;
  @service hifiSync;

  constructor() {
    super(...arguments);

    this.boundRecompute = () => this.recompute();

    this.hifiSync.on('change', this.boundRecompute);
    this.hifi.on('audio-played', this.boundRecompute);
    this.hifi.on('audio-paused', this.boundRecompute);
    this.hifi.on('current-sound-changed', this.boundRecompute);
  }

  willDestroy() {
    this.hifiSync.off('change', this.boundRecompute);
    this.hifi.off('audio-played', this.boundRecompute);
    this.hifi.off('audio-paused', this.boundRecompute);
    this.hifi.off('current-sound-changed', this.boundRecompute);
  }

  compute(compare) {
    if (compare.url) {
      let result = this.hifiSync.isPlayingElsewhere(compare.url);
      debug(`ember-hifi:${compare.url.toString()}`)(`is-playing-elsewhere = ${result}`);

      return result;
    }
    else {
      let result = this.hifiSync.isPlayingElsewhere(compare.toString());
      debug(`ember-hifi:${compare.toString()}`)(`is-playing-elsewhere = ${result}`);

      return result;
    }
  }
}
