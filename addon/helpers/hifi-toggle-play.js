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
      if (!url) {
        this.hifi.togglePause();
      }
      else {
        let sound = this.hifi.findLoaded(url)
        if (sound) {
          return sound.togglePause();
        }  
      }
    }
  }
}

