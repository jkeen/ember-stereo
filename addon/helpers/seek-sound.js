import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";

/**
  A helper to seek a sound
  ```hbs
    <button {{on 'click' (seek-sound @identifier 15000)}}>
      Jump ahead 15s
    </button>
  ```
  @class {{seek-sound}}
  @type Helper
  @param {String} url
  @param {String} position
  */
export default class SeekSound extends Helper {
  @service stereo;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([identifier, position], options = {}) {
    if (position === undefined && identifier) {
      identifier == 'system'
      position = identifier
    }

    return (eventOrItem) => {
      if (identifier) {
        let sound;
        if (identifier == 'system') {
          sound = this.stereo.currentSound;
        }
        else {
          sound = this.stereo.findLoaded(identifier)
        }

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
    };
  }
}
