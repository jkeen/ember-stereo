import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
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

  handleEvent(sound) {
    if (hasEqualUrls(sound.url, this.registered)) {
      this.recompute();
    }
    else if (sound && this.registered == 'system') {
      this.recompute();
    }
  }

  registerListeners([identifier], {load, format}) {
    if (!this.registered) {
      this.registered = identifier;

      this.listen.forEach(eventName => {
        this.hifi.on(eventName, this.handleEvent.bind(this))
      });

      if (load) {
        this.hifi.load(identifier).then(() => this.boundRecompute(identifier));
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
    let result;
    this.registerListeners([identifier], {format, defaultValue, load});

    let sound = this.findSound(identifier)
    if (sound) {
      result = sound.duration;
    }

    if (result === Infinity) {
      //this is a stream
      result = defaultValue || "∞";
    }
    else {
      if (format == 'time') {
        if (sound) {
          result = numericDuration([result])
        }
        else {
          result = defaultValue || '00:00';
        }
      }
      else {
        result = result || defaultValue;
      }
    }

    this.result = result;
    debug(`ember-hifi:helpers:${this.name}:${identifier}:${format}`)(`render = ${this.result}`); 
    return this.result;
  }
}
