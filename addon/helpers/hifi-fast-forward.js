import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';

/**
  A helper to fast forward a sound by x.
  ```hbs
   {{hifi-fast-forward this.url increment=5000}}
  ```
  @class HifiFastForward
  @type Helper
  @param {String} url
  @param {String} increment
*/
@classic
export default class HifiFastForward extends Helper {
  @service
  hifi;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([identifier], options = {}) {
    let increment = parseInt((options["increment"] || 5000), 10);

    return () => {
      if (identifier) {
        let sound = this.hifi.findLoaded(identifier)
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

