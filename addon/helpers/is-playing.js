import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';

@classic
export default class HifiIsPlaying extends HifiBaseIsHelper {
  name = 'is-playing'
  listen = ['audio-played', 'audio-paused', 'current-sound-changed', 'current-sound-interrupted']

  checkSystem() {
    return this.hifi.isPlaying;
  }

  checkSound(sound) {
    return sound && sound.isPlaying
  }
}