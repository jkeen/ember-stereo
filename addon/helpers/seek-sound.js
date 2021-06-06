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
export default class SeekSound extends Helper {
  @service stereo;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([identifier, position], options = {}) {
    return (eventOrItem) => {
      if (identifier) {
        let sound = this.stereo.findLoaded(identifier)
        if (sound) {

          let unit = (options["unit"] || "percentage");
          let value = position === undefined ? eventOrItem : position

          if (eventOrItem?.target?.type == "range") {
            value = eventOrItem?.target?.value
            unit = "percentage";
          }

          if (unit == "percentage") {
            // this is a percentage
            let newPosition = (parseFloat(value, 10) / 100) * sound.duration
            return sound.position = newPosition;
          }
          else if (unit == "seconds") {
            return sound.position = (parseFloat(value, 10) * 1000);
          }

        }
        else {
          return false;
        }
      }
      else if (this.stereo.currentSound) {
        this.stereo.position = position
      }
    };
  }
}
