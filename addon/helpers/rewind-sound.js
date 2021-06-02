import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to rewind a sound by x.
  ```hbs
  <button {{on 'click' (rewind-sound this.url increment=5000)}}>
    Rewind
  </button>
  ```
  @class fastForwardSound
  @type Helper
  @param {String} url
  @param {String} increment
*/

export default class rewindSound extends Helper {
  @service stereo;

  compute([compare], options = {}) {
    let increment = parseInt((options["increment"] || 5000), 10);

    return () => {
      if (compare) {
        let sound = this.stereo.findLoaded(compare)
        if (sound) {
          return sound.rewind(increment);
        }
        else {
          return false;
        }
      }
      else if (this.stereo.currentSound) {
        this.stereo.rewind(increment)
      }
    }
  }
}

