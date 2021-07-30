import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

/**
  A helper to find (or wait) for a loaded sound.
  ```hbs
   {{#let (find-loaded-sound @identifier) as |sound|}}
     //do something with the sound when it loads or if it's loaded
   {{/let}}
  ```
  @class {{find-loaded-sound}}
  @type Helper
*/

export default class FindLoadedSound extends StereoBaseIsHelper {
  name = 'find-loaded-sound'

  /**
    @method compute
    @param {Any} identifier url, urls, url objects, promise that resolves to a url
    @returns {Sound}
  */

  get result() {
    return this.sound;
  }
}
