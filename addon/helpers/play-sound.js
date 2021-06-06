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
  @class playSound
  @type Helper
  @param {String} url
  */
export default class PlaySound extends Helper {
  @service stereo;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([urls], options = {}, metadata = {}) {
    return () => {
      return this.stereo
        .play(urls, prepareOptions(options, metadata))
        .then((result) => result.sound);
    };
  }
}
