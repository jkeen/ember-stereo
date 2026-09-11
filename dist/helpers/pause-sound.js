import ActionHelper from '../-private/helpers/action-helper.js';

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
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @return {Function}
*/
class pauseSound extends ActionHelper {
  performAction(sound) {
    if (sound) {
      sound.pause();
    } else {
      return false;
    }
  }
}

export { pauseSound as default };
//# sourceMappingURL=pause-sound.js.map
