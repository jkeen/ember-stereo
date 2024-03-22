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
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
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
