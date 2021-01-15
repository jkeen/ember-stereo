import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
@classic
export default class HifiTogglePlay extends Helper {
  @service
  hifi;

  compute([url], metadata = {}) {
    return () => {
      if (url) {
        let sound = this.hifi.findLoaded(url)
        if (sound) {
          sound.stop();
        }  
      }
      else if (this.hifi.currentSound) {
        this.hifi.stop()
      }
    }
  }
}

