import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';
import debug from 'debug'
import { get } from '@ember/object';
/**
  A helper to detect if a sound is playing.
  ```hbs
    {{#if (is-playing this.url)}}
      <p>This url is currently loading</p>
    {{else}}
      <p>This url is not currently loading</p>
    {{/if}}
  ```

  Can also look for any system-level play event by passing in no argument
  ```hbs
    {{#if (is-playing)}}
      <p>Something is loading</p>
    {{else}}
      <p>Something is not loading</p>
    {{/if}}
  ```

  @class HifiIsPlaying
  @type Helper
  @param {String} url
*/
@classic
export default class HifiMetadata extends HifiBaseIsHelper {
  name = 'hifi-metadata'

  listen = ['audio-loaded', 'audio-loading', 'audio-metadata-changed', 'current-sound-changed']

  /**
    returns the state
    @method compute
    @param {String} [url]
    @return {boolean}
  */


 compute([compare = 'system', value = 'title']) {
  if (compare.toString().trim().length == 0) {
    compare = 'system';
  }
  this.registerListeners(compare);
  let metadata = {};
  if (compare == 'system' && this.hifi.currentSound) {
    metadata = get(this.hifi.currentSound, 'options.metadata') || {};
  }
  else {
    let sound = this.hifi.findLoaded(compare);
    if (sound) {
      metadata = get(this.hifi.currentSound, 'options.metadata') || {};
    }
  }
  this.result = metadata[value]
  debug(`ember-hifi:helpers:${this.name}`)(`${compare} render=${this.result}`); 

  return this.result;
}
}