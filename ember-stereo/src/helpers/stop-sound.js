import StereoBaseActionHelper from '../-private/helpers/action-helper';

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
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
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
