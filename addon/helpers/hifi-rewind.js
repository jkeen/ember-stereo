import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
@classic
export default class HifiRewind extends Helper {
  @service
  hifi;

  compute([url], metadata = {}) {
    return () => {
      if (url) {
        let sound = this.hifi.findLoaded(url)
        if (sound) {
          sound.rewind(5000);
        }  
      }
      else if (this.hifi.currentSound) {
        this.hifi.rewind(5000)
      }
    }
  }
}

