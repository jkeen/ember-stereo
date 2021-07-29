import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-stereo/-private/utils/prepare-options";

/**
  A helper to toggle play/pause a sound
  ```hbs
    <button {{on 'click' (toggle-play-sound @identifier}}>
      Play/Pause
    </button>
  ```
  @class {{toggle-play-sound}}
  @type Helper
  @param {String} url
  */
export default class togglePlaySound extends Helper {
  @service stereo;

  compute([identifier], options = {}) {
    options = prepareOptions(options)

    return () => {
      if (!identifier) {
        this.stereo.togglePause();
      } else {
        let sound = this.stereo.findLoaded(identifier);
        if (sound) {
          return sound.togglePause();
        } else {
          return this.stereo.play(identifier, options);
        }
      }
    };
  }
}
