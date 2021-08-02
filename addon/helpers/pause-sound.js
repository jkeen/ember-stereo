import StereoBaseActionHelper from 'ember-stereo/-private/helpers/action-helper';

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (play-sound @identifier}}>
      Play
    </button>
  ```
  @class {{pause-sound}}
  @type {Helper}
  */

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Function}
*/
export default class pauseSound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound) {
      sound.pause()
    }
    else {
      return false
    }
  }
}
