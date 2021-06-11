import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-stereo/-private/utils/prepare-options";

/**
  A helper to toggle play/pause a sound
  ```hbs
    <button {{on 'click' (toggle-play-sound this.url)}}>
      Play
    </button>
  ```
  @class {{toggle-play-sound}}
  @type Helper
  @param {String} url
  */
export default class togglePlaySound extends Helper {
  @service stereo;

  compute([compare], { options = {}, metadata = {} }) {
    return () => {

      if (!compare) {
        this.stereo.togglePause();
      } else {
        let sound = this.stereo.findLoaded(compare);
        if (sound) {
          return sound.togglePause();
        } else {
          return this.stereo.play(compare, prepareOptions({options, metadata}));
        }
      }
    };
  }
}
