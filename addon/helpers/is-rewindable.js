import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';

@classic
export default class HifiIsRewindable extends HifiBaseIsHelper {
  name = 'is-rewindable'
  listen = ['audio-loaded']

  checkSystem() {
    if (this.hifi.currentSound) {
      return this.checkSound(this.hifi.currentSound);
    }
    else {
      return false;
    }
  }

  checkSound(sound) {
    return sound && sound.isRewindable;
  }
}