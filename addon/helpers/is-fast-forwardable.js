import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';

@classic
export default class HifiIsFastForwardable extends HifiBaseIsHelper {
  name = 'is-fast-forwardable'
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
    return sound && sound.isFastForwardable;
  }
}