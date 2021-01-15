import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';

@classic
export default class HifiIsLoading extends Helper {
  @service
  hifi;

  constructor() {
    super(...arguments);
    this.boundRecompute = () => this.recompute();

    this.hifi.on('audio-played', this.boundRecompute);
    this.hifi.on('audio-loading', this.boundRecompute);
    this.hifi.on('audio-loaded', this.boundRecompute);
    this.hifi.on('new-load-request', this.boundRecompute);
    this.hifi.on('pre-load', this.boundRecompute);
    this.hifi.on('current-sound-changed', this.boundRecompute);
  }

  willDestroy() {
    this.hifi.off('audio-played', this.boundRecompute);
    this.hifi.off('audio-loading', this.boundRecompute);
    this.hifi.off('audio-loaded', this.boundRecompute);
    this.hifi.off('new-load-request', this.boundRecompute);
    this.hifi.off('pre-load', this.boundRecompute);
    this.hifi.off('current-sound-changed', this.boundRecompute);
  }

  compute(compare) {

    if (!compare.toString()) {
      let result = this.hifi.isLoading;
      debug('ember-hifi:system')(`is-loading = ${result}`);
    }
    else {
      let sound = this.hifi.findLoaded(compare);
      let result = sound && sound.isLoading;
      debug(`ember-hifi${(sound ? ':' + sound.url : '')}`)(`is-loading = ${result}`);

      return result;
    }
  }
}
