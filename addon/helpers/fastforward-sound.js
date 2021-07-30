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
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Integer} increment time in ms
  @returns {Function}
*/
export default class fastForwardSound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound) {
      sound.fastForward(this.options.increment || 15000)
    }
    else {
      return false
    }
  }
}

