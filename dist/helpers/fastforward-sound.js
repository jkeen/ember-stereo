import ActionHelper from '../-private/helpers/action-helper.js';

/**
  A helper to fast forward a sound by x.
  ```hbs
   <button {{on 'click' (fastforward-sound @identifier increment=5000)}}>
    Fast Forward
  </button>
  ```
  @class {{fastforward-sound}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @param {Integer} increment time in ms
  @return {Function}
*/
class fastForwardSound extends ActionHelper {
  performAction(sound) {
    if (sound) {
      sound.fastForward(this.options.increment || 15000);
    } else {
      return false;
    }
  }
}

export { fastForwardSound as default };
//# sourceMappingURL=fastforward-sound.js.map
