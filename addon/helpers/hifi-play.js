import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "../-private/prepare-options";

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (hifi-play this.url)}}>
      Play
    </button>
  ```
  @class HifiPlay
  @type Helper
  @param {String} url
  */
export default class HifiPlay extends Helper {
  @service
  hifi;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([urls], options = {}, metadata = {}) {
    return () => {
      return this.hifi
        .play(urls, prepareOptions(options, metadata))
        .then((result) => result.sound);
    };
  }
}
