import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-stereo/-private/utils/prepare-options";
/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (load-sound this.url)}}>
      Load
    </button>
  ```
  @class loadSound
  @type Helper
  @param {String} url
  */
export default class loadSound extends Helper {
  @service stereo;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([urls], {options = {}, metadata = {}, remote=false}) {
    options = prepareOptions({options, metadata, remote});

    return () => {
      return this.stereo.load(urls, options).then((result) => result.sound);
    };
  }
}
