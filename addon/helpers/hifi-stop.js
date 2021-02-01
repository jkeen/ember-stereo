import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
@classic
export default class HifiTogglePlay extends Helper {
  @service
  hifi;

  compute([identifier], metadata = {}) {
    return () => {
      if (identifier) {
        let sound = this.hifi.findLoaded(identifier)
        if (sound) {
          return sound.stop()
        }
        else {
          return false;
        }
      }
      else if (this.hifi.currentSound) {
        this.hifi.stop()
      }
    }
  }
}

