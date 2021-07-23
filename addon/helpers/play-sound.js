import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-stereo/-private/utils/prepare-options";

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (play-sound this.url)}}>
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
  compute([urls], options = {}, metadata = {}) {
    return async () => {
      try {
        let { sound } = await this.stereo.play(urls, prepareOptions({ options, metadata }))
        return sound;
      } catch(e) {
        return false;
      }
    };
  }
}
