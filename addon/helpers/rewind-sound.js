import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to rewind a sound by x.
  ```hbs
  <button {{on 'click' (rewind-sound @identifier increment=15000)}}>
    Rewind 15 seconds
  </button>
  ```
  @class {{rewind-sound}}
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
    }
  }
}

