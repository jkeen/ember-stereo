import StereoBaseActionHelper from 'ember-stereo/-private/helpers/action-helper';

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
export default class SeekSound extends StereoBaseActionHelper {
  performAction(sound, eventOrItem) {
    if (sound) {
      let unit = (this.options["unit"] || "percentage");
      let value = this.options.position === undefined ? eventOrItem : this.options.position

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
}
