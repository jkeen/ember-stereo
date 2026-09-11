import ActionHelper from '../-private/helpers/action-helper.js';

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
class stopSound extends ActionHelper {
  performAction(sound) {
    if (sound) {
      sound.stop();
    } else {
      return false;
    }
  }
}

export { stopSound as default };
//# sourceMappingURL=stop-sound.js.map
