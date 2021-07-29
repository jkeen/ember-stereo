import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-stereo/-private/utils/prepare-options";

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (play-sound @identifier}}>
      Play
    </button>
  ```
  @class {{play-sound}}
  @type Helper
  @param {String} url
  @param {Object} options
  @param {Object} metadata
  */
export default class PlaySound extends Helper {
  @service stereo;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([urls], options = {}) {
    prepareOptions(options)
    return async () => {
      try {
        let { sound } = await this.stereo.play(urls, options)
        return sound;
      } catch(e) {
        return false;
      }
    };
  }
}
