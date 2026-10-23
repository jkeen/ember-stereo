import ActionHelper from '../-private/helpers/action-helper.js';

/**
  A helper to rewind a sound by x.
  ```hbs
  <button {{on 'click' (rewind-sound @identifier increment=15000)}}>
    Rewind 15 seconds
  </button>
  ```
  @class {{rewind-sound}}
  @type {Helper}
*/

class rewindSound extends ActionHelper {
  /**
    @method compute
    @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
    @param {Integer} increment time in ms
    @return {Function}
  */
  performAction(sound) {
    if (sound) {
      sound.rewind(this.options?.increment || 15000);
    } else {
      return false;
    }
  }
}

export { rewindSound as default };
//# sourceMappingURL=rewind-sound.js.map
