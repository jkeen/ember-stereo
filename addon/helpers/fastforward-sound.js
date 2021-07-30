import StereoBaseActionHelper from 'ember-stereo/-private/helpers/action-helper';

/**
  A helper to fast forward a sound by x.
  ```hbs
   <button {{on 'click' (fastforward-sound @identifier increment=5000)}}>
    Fast Forward
  </button>
  ```
  @class {{fastforward-sound}}
  @type Helper
  @param {String} url
  @param {String} increment
*/

export default class fastForwardSound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound) {
      sound.fastforward(this.options?.increment || 15000)
    }
    else {
      return false
    }
  }
}

