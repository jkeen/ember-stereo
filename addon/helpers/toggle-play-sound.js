import StereoBaseActionHelper from 'ember-stereo/-private/helpers/action-helper';

/**
  A helper to toggle play/pause a sound
  ```hbs
    <button {{on 'click' (toggle-play-sound @identifier}}>
      Play/Pause
    </button>
  ```
  @class {{toggle-play-sound}}
  @type Helper
  @param {String} url
  */
export default class togglePlaySound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound) {
      sound.togglePause()
    }
    else {
      this.stereo.play(this.identifier, this.options)
    }
  }
}
