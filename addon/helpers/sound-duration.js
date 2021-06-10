import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import hasEqualUrls from "ember-stereo/-private/utils/has-equal-urls";
import { dedupeTracked } from "tracked-toolbox";
import { numericDuration } from "./numeric-duration";
import debug from "debug";
import { tracked } from '@glimmer/tracking';

/**
  A helper to get a sound's duration in milliseconds.
  ```hbs
   <p>Duration of loaded sound is {{sound-duration this.url}}ms</p>
   <p>Duration of loaded sound in h:mm:ss {{sound-duration this.url format=time}}</p>
   <p>Duration of sound that this helper just tried to load in h:mm:ss {{sound-duration this.url format=time load=true}}</p>
   ```
  @class SoundDuration
  @type Helper
  @param {String} url
  @returns {any}
*/

export default class SoundDuration extends Helper {
  @service stereo;
  @dedupeTracked sound;
  @tracked result;

  default = "N/A";


  reset() {
    this.sound = null
  }

  /**
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, ms,
  * @param {Boolean} options.load load the sound if it's not loaded?
  */
  compute([identifier = "system"], { format = false, load = false, defaultValue }) {
    if (identifier !== this.identifier) {
      this.reset();
      this.identifier = identifier || "system";
      if (this.identifier == "system") {
        this.sound = this.stereo.currentSound
        this.stereo.on('current-sound-changed', ({ sound }) => {
          this.sound = sound;
        })
      } else if (this.identifier !== "system") {
        this.sound = this.stereo.findLoaded(this.identifier);
        if (!this.sound) {
          if (load) {
            this.stereo
              .load(this.identifier)
              .then(({ sound }) => (this.sound = sound));
          } else {
            this.stereo.on(
              "new-load-request",
              async ({ loadPromise, urlsOrPromise }) => {
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
          result = defaultValue || "--:--";
        }
      } else {
        result = this.sound?.duration || defaultValue;
      }
    }

    this.result = result;
    debug(`ember-stereo:helpers:sound-duration:${identifier}:${format}`)(
      `render = ${result}`
    );
    return this.result;
  }
}
