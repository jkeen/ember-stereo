import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to fast forward a sound by x.
  ```hbs
   <button {{on 'click' (fastforward-sound this.url increment=5000)}}>
    Fast Forward
  </button>
  ```
  @class fastForwardSound
  @type Helper
  @param {String} url
  @param {String} increment
*/

export default class fastForwardSound extends Helper {
  @service stereo;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([identifier], options = {}) {
    let increment = parseInt((options["increment"] || 5000), 10);

    return () => {
      if (identifier) {
        let sound = this.stereo.findLoaded(identifier)
        if (sound) {
          return sound.fastForward(increment);
        }
        else {
          return false;
        }
      }
      else if (this.stereo.currentSound) {
        this.stereo.fastForward(increment)
      }
    }
  }
}

