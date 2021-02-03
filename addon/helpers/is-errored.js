import classic from 'ember-classic-decorator';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { inject as service } from '@ember/service';

import debug from 'debug';
/**
  A helper to detect if a sound is errored.
  ```hbs
    {{#if (is-errored this.url)}}
      <p>The currently loaded sound is errored</p>
    {{else}}
      <p>The currently loaded sound is not errored</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (is-errored)}}
      <p>The currently loaded sound is errored</p>
    {{else}}
      <p>Sound is ok</p>
    {{/if}}
  ```

  @class HifiIsErrored
  @type Helper
  @param {String} url
*/

@classic
export default class HifiIsErrored extends Helper {
  @service hifi;

  name = 'is-errored';
  listen = ['audio-load-error', 'audio-loaded'];
  @dedupeTracked result;

  registerListeners([identifier], {load, format}) {
    this.boundRecompute = (e) => this.recompute(e)

    if (!this.registered) {
      this.registered = identifier;

      this.hifi.on('audio-loaded', (sound) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          this.boundRecompute()
        }
        else if (sound && this.registered == 'system') {
          this.boundRecompute()
        }
      });

      this.hifi.on('audio-load-error', (sound) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          this.boundRecompute()
        }
        else if (sound && this.registered == 'system') {
          this.boundRecompute()
        }
      });
    }
  }

  /**
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, ms, s,
  * @param {Boolean} options.load load the sound if it's not loaded?
  */
  compute([identifier = 'system'], {format = false, load = false, defaultValue}) {
    this.registerListeners([identifier], {format, defaultValue, load});

    let result = this.result;
    let error = this.hifi.errorCache.find(identifier);
    this.result = !!error;

    debug(`ember-hifi:helpers:${this.name}:${identifier}:${format}`)(`render = ${this.result}`); 
    return this.result;
  }
}
