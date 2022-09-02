import StereoBaseActionHelper from 'ember-stereo/-private/helpers/action-helper';

/**
  A helper to stop a sound
  ```hbs
    <button {{on 'click' (stop-sound @identifier)}}>
      Stop
    </button>
  ```
  @class {{stop-sound}}
  @type {Helper}
  @param {String} url
  */

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Function}
*/
export default class stopSound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound) {
      sound.stop();
    } else {
      return false;
    }
  }
}
