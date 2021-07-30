import StereoBaseActionHelper from 'ember-stereo/-private/helpers/action-helper';

/**
  A helper to rewind a sound by x.
  ```hbs
  <button {{on 'click' (rewind-sound @identifier increment=15000)}}>
    Rewind 15 seconds
  </button>
  ```
  @class {{rewind-sound}}
  @type Helper
  @param {String} url
  @param {String} increment
*/

export default class rewindSound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound) {
      sound.rewind(this.options?.increment || 15000)
    }
    else {
      return false
    }
  }
}

