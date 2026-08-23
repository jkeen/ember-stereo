import StereoBaseIsHelper from '../-private/helpers/is-helper';

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

export default class FindSound extends StereoBaseIsHelper {
  name = 'find-sound';

  /**
    @method compute
    @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
    @return {Sound}
  */

  get result() {
    return this.sound;
  }
}
