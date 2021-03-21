import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import hasEqualUrls from "ember-hifi/-private/utils/has-equal-urls";
import { dedupeTracked } from "tracked-toolbox";
import { numericDuration } from "./numeric-duration";
import debug from "debug";

/**
  A helper to get a sound's duration in milliseconds.
  ```hbs
   <p>Duration of sound is {{hifi-duration this.url}}ms</p>
  ```

  @class HifiDuration
  @type Helper
  @param {String} url
  @returns {Float}
*/

export default class HifiDuration extends Helper {
  @service hifi;
  @dedupeTracked sound;

  default = "N/A";

  /**
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, ms, s,
  * @param {Boolean} options.load load the sound if it's not loaded?
  */
  compute(
    [identifier = "system"],
    { format = false, load = false, defaultValue }
  ) {
    if (identifier !== this.identifier) {
      this.identifier = identifier || "system";
      if (this.identifier == "system") {
        this.sound = this.hifi.currentSound;
      } else if (this.identifier !== "system") {
        let sound = this.hifi.findLoaded(this.identifier);
        if (sound) {
          this.sound = sound;
        } else {
          if (load) {
            this.hifi
              .load(this.identifier)
              .then(({ sound }) => (this.sound = sound));
          } else {
            this.hifi.on(
              "new-load-request",
              async ({ loadPromise, urlsOrPromise, options }) => {
                let isEqual = await hasEqualUrls(
                  this.identifier,
                  urlsOrPromise
                );
                if (isEqual) {
                  loadPromise.then(({ sound }) => (this.sound = sound));
                }
              }
            );
          }
        }
      }
    }

    let result = defaultValue;
    if (this.sound?.duration === Infinity) {
      //this is a stream
      result = defaultValue || "∞";
    } else {
      if (format == "time") {
        if (this.sound?.duration) {
          result = numericDuration([this.sound?.duration]);
        } else {
          result = defaultValue || "00:00";
        }
      } else {
        result = this.sound?.duration || defaultValue;
      }
    }

    debug(`ember-hifi:helpers:hifi-duration:${identifier}:${format}`)(
      `render = ${result}`
    );
    return result;
  }
}
