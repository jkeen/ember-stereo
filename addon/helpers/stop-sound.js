import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';


/**
  A helper to stop a sound
  ```hbs
    <button {{on 'click' (stop-sound this.url)}}>
      Play
    </button>
  ```
  @class {{stop-sound}}
  @type Helper
  @param {String} url
  */

export default class stopSound extends Helper {
  @service stereo;

  compute([identifier] /*, metadata = {} */) {
    return () => {
      if (identifier) {
        let sound = this.stereo.findLoaded(identifier)
        if (sound) {
          return sound.stop()
        }
        else {
          return false;
        }
      }
    }
  }
}

