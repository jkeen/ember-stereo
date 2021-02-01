import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { tracked } from '@glimmer/tracking';
import { dedupeTracked } from 'tracked-toolbox';
import { throttle } from '@ember/runloop';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import {numericDuration} from './numeric-duration';
import debug from 'debug';

/**
  A helper to get a sound's duration in milliseconds.
  ```hbs
   <p>Duration of sound is {{hifi-duration this.url}}ms</p>
  ```

  @class HifiDuration
  @type Helper
  @param {String} url
  @returns {Float}
*/

@classic
export default class HifiDuration extends Helper {
  @service hifi;

  name = 'hifi-duration';
  listen = ['audio-duration-changed', 'audio-loaded'];
  default = 'N/A'
  @dedupeTracked result;

  registerListeners([identifier], {load, format}) {
    this.boundRecompute = (e) => this.recompute(e)

    if (!this.registered) {
      this.registered = identifier;

      this.hifi.on('audio-loaded', (sound) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          throttle(this.registered, this.boundRecompute, 1000);
        }
        else if (sound && this.registered == 'system') {
          throttle(this.registered, this.boundRecompute, 1000);
        }
      });

      this.hifi.on('audio-duration-changed', (sound) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          throttle(this.registered, this.boundRecompute, 1000);
        }
        else if (sound && this.registered == 'system') {
          throttle(this.registered, this.boundRecompute, 1000);
        }
      });

      if (load) {
        this.hifi.load(identifier).then(() => {
          this.boundRecompute(identifier);
        })
      }
    }
  }

  findSound(identifier) {
    if (identifier == 'system') {
      return this.hifi.currentSound;
    }
    else {
      return this.hifi.findLoaded(identifier);
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

    let sound = this.findSound(identifier)
    if (sound) {
      result = sound.duration;
    }

    if (result === Infinity) {
      //this is a stream
      this.result = defaultValue || "∞";
    }
    else {
      if (format == 'time') {
        if (sound) {
          this.result = numericDuration([result])
        }
        else {
          this.result = defaultValue || '00:00';
        }
      }
      else {
        this.result = result || defaultValue;
      }
    }


    debug(`ember-hifi:helpers:${this.name}:${identifier}:${format}`)(`render = ${this.result}`); 
    return this.result;
  }
}
