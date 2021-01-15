import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';

@classic
export default class HifiIsPlaying extends Helper {
  @service hifi;

  constructor() {
    super(...arguments);
    this.boundRecompute = () => this.recompute();

    this.hifi.on('audio-played', this.boundRecompute);
    this.hifi.on('audio-paused', this.boundRecompute);
    this.hifi.on('current-sound-changed', this.boundRecompute);
    this.hifi.on('current-sound-interrupted', this.boundRecompute);
    this.hifi.on('audio-loading', this.boundRecompute);
    this.hifi.on('audio-loaded', this.boundRecompute);
    this.hifi.on('audio-ended', this.boundRecompute);

  }

  willDestroy() {
    this.hifi.off('audio-played', this.boundRecompute);
    this.hifi.off('audio-paused', this.boundRecompute);
    this.hifi.off('current-sound-changed', this.boundRecompute);
    this.hifi.off('current-sound-interrupted', this.boundRecompute);
    this.hifi.off('audio-loading', this.boundRecompute);
    this.hifi.off('audio-loaded', this.boundRecompute);
    this.hifi.off('audio-ended', this.boundRecompute);
  }

  compute(compare) {
    let result;
    if (!compare.toString()) {
      result = this.hifi.isPlaying;
      debug(`ember-hifi:system`)(`is-playing = ${result}`);
    }
    else {
      let sound = this.hifi.findLoaded(compare);
      result = sound && sound.isPlaying;  
      debug(`ember-hifi${(sound ? ':' + sound.url : '')}`)(`is-playing = ${result}`);
    }

    return result
  }
}
