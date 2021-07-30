import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

/**
  A helper to detect if a sound is blocked.
  ```hbs
    {{#if (sound-is-blocked @identifier)}}
      <p>This sound has been blocked by browser autoplay. User intervention is required</p>
    {{else}}
      <p>This sound has not been blocked by browser autoplay</p>
    {{/if}}
  ```

  @class {{sound-is-blocked}}
  @type Helper
  @param {String} url
*/
/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @returns {Boolean}
*/
export default class SoundIsBlocked extends StereoBaseIsHelper {
  name = 'sound-is-blocked'

  get result() {
    return this.sound && this.sound.isBlocked;
  }
}
