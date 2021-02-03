import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to rewind a sound by x.
  ```hbs
  <button {{on 'click' (hifi-rewind this.url increment=5000)}}>
    Rewind
  </button>
  ```
  @class HifiFastForward
  @type Helper
  @param {String} url
  @param {String} increment
*/
@classic
export default class HifiRewind extends Helper {
  @service
  hifi;

  compute([compare], options = {}) {
    let increment = parseInt((options["increment"] || 5000), 10);

    return () => {
      if (compare) {
        let sound = this.hifi.findLoaded(compare)
        if (sound) {
          return sound.rewind(increment);
        }
        else {
          return false;
        }
      }
      else if (this.hifi.currentSound) {
        this.hifi.rewind(increment)
      }
    }
  }
}

