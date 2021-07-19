import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (play-sound this.url)}}>
      Play
    </button>
  ```
  @class {{pause-sound}}
  @type Helper
  @param {String} url


  */
export default class pauseSound extends Helper {
  @service stereo;

  compute([identifier] /*, metadata = {} */) {
    return () => {
      if (identifier) {
        let sound = this.stereo.findLoaded(identifier)
        if (sound) {
          return sound.pause()
        }
        else {
          return false;
        }
      }
      else if (this.stereo.currentSound) {
        this.stereo.pause()
      }
    }
  }
}
