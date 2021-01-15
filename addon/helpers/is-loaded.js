import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';

@classic
export default class HifiIsLoaded extends Helper {
  @service
  hifi;

  @service
  hifiCache;

  constructor() {
    super(...arguments);
    this.boundRecompute = () => this.recompute();

    this.hifi.on('audio-loading', this.boundRecompute);
    this.hifi.on('audio-loaded', this.boundRecompute);
    this.hifi.on('audio-ended', this.boundRecompute);
  }

  willDestroy() {
    this.hifi.off('audio-loading', this.boundRecompute);
    this.hifi.off('audio-loaded', this.boundRecompute);
    this.hifi.off('audio-ended', this.boundRecompute);
  }

  compute(compare) {
    let sound = this.hifi.findLoaded(compare);

    let result = !!sound;

    debug(`ember-hifi:${compare}`)(`is-loaded: ${result}`);
    return result;
  }
}
