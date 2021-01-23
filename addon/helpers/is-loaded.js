import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';

@classic
export default class HifiIsLoaded extends HifiBaseIsHelper {
  name = 'is-loaded'
  listen = ['audio-loaded', 'audio-loading', 'audio-ended']

  checkSystem() {
    if (this.hifi.currentSound) {
      return this.checkSound(this.hifi.currentSound);
    }
    else {
      return false;
    }
  }

  checkSound(sound) {
    return !!sound;
  }
}