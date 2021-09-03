import StereoBaseActionHelper from 'ember-stereo/-private/helpers/action-helper';

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (play-sound @identifier}}>
      Play
    </button>
  ```
  @class {{play-sound}}
  @type {Helper}
  @param {String} url
  @param {Object} options
  @param {Object} metadata
  */

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Hash} metadata? metadata that should be included with the sound
  @param {[String]} useConnections? array of connection names in preference order
  @return {Function}
*/
export default class playSound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound) {
      sound.play()
    }
    else {
      this.stereo.play(this.identifier, this.options)
    }
  }
}
