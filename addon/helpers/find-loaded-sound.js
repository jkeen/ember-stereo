import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

/**
  A helper to find (or wait) for a loaded sound.
  ```hbs
   {{#let (find-loaded-sound @identifier) as |sound|}}
     //do something with the sound
   {{/let}}
  ```
  @class {{fastforward-sound}}
  @type Helper
  @param {String} url
  @param {String} increment
*/

export default class FindLoadedSound extends StereoBaseIsHelper {
  name = 'find-loaded-sound'

  get result() {
    return this.sound;
  }
}
