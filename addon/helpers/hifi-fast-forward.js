import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
@classic
export default class HifiFastForward extends Helper {
  @service
  hifi;

  compute([compare], options = {}) {
    let increment = parseInt((options["increment"] || 5000), 10);

    return () => {
      if (compare) {
        let sound = this.hifi.findLoaded(compare)
        if (sound) {
          return sound.fastForward(increment);
        }
        else {
          return false;
        }
      }
      else if (this.hifi.currentSound) {
        this.hifi.fastForward(increment)
      }
    }
  }
}

