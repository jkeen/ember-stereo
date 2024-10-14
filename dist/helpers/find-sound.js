import { b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import StereoBaseIsHelper from '../-private/helpers/is-helper.js';

/**
  A helper to find (or wait) for a loaded sound.
  ```hbs
   {{#let (find-sound @identifier) as |sound|}}
     //do something with the sound when it loads or if it's loaded
   {{/let}}
  ```
  @class {{find-sound}}
  @type {Helper}
*/

class FindSound extends StereoBaseIsHelper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'find-sound');
  }
  /**
    @method compute
    @param {Any} identifier url, urls, url objects, promise that resolves to a url
    @return {Sound}
  */

  get result() {
    return this.sound;
  }
}

export { FindSound as default };
//# sourceMappingURL=find-sound.js.map
