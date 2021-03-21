import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-hifi/-private/utils/prepare-options";
/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (hifi-load this.url)}}>
      Load
    </button>
  ```
  @class HifiLoad
  @type Helper
  @param {String} url
  */
export default class HifiLoad extends Helper {
  @service
  hifi;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([urls], {options = {}, metadata = {}, remote=false}) {
    options = prepareOptions({options, metadata, remote});

    return () => {
      return this.hifi.load(urls, options).then((result) => result.sound);
    };
  }
}
