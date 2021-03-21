import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-hifi/-private/utils/prepare-options";

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (hifi-play this.url)}}>
      Play
    </button>
  ```
  @class HifiPause
  @type Helper
  @param {String} url
  */
export default class HifiPause extends Helper {
  @service
  hifi;

  compute([identifier] /*, metadata = {} */) {
    return () => {
      if (identifier) {
        let sound = this.hifi.findLoaded(identifier)
        if (sound) {
          return sound.pause()
        }
        else {
          return false;
        }
      }
      else if (this.hifi.currentSound) {
        this.hifi.pause()
      }
    }
  }
}
