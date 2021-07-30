import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import prepareOptions from "ember-stereo/-private/utils/prepare-options";
import { dedupeTracked } from 'tracked-toolbox';
import resolveUrls from "ember-stereo/-private/utils/resolve-urls";

export default class ActionHelper extends Helper {
  @service stereo;
  @dedupeTracked identifier;
  @dedupeTracked options;

  compute([identifier], options = {}) {
    resolveUrls(identifier).then(urls => this.identifier = urls)
    this.options = prepareOptions(options)

    return (e) => {
      if (this.identifier) {
        let sound = this.stereo.findLoaded(this.identifier);
        this.performAction(sound, e);
      }
    };
  }

  performAction(object, event) {
    return false;
  }
}
