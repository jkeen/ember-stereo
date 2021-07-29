import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to fast forward a sound by x.
  ```hbs
   <button {{on 'click' (fastforward-sound @identifier increment=5000)}}>
    Fast Forward
  </button>
  ```
  @class {{fastforward-sound}}
  @type Helper
  @param {String} url
  @param {String} increment
*/

export default class FastForwardSound extends Helper {
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
    }
  }
}

