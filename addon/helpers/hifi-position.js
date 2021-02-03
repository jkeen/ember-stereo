import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { tracked } from '@glimmer/tracking';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { dedupeTracked } from 'tracked-toolbox';
import { throttle } from '@ember/runloop';
import {numericDuration} from './numeric-duration';
import debug from 'debug';
/**
  A helper to get a sound's position.
  ```hbs
   {{hifi-position this.url}}</p>
  ```
  
  @class HifiPosition
  @type Helper
  @param {String} url
  @returns {Float}
*/

@classic
export default class HifiPosition extends Helper {
  @service hifi;

  name = 'hifi-position';
  listen = ['audio-position-changed', 'audio-position-will-change']
  default = 0
  @dedupeTracked result;

  handleEvent(sound) {
    if (hasEqualUrls(sound.url, this.registered)) {
      throttle(this.registered, this.recompute.bind(this), 1000);
    }
    else if (sound && this.registered == 'system') {
      throttle(this.registered, this.recompute.bind(this), 1000);
    }
  }

  registerListeners([identifier], {format}) {
    if (!this.registered) {
      this.registered = identifier;

      this.listen.forEach(eventName => {
        this.hifi.on(eventName, this.handleEvent.bind(this))
      });
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
    returns the position in milliseconds
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, percent,
    @return {Float}
  */

  compute([identifier='system'], {format=false, defaultValue}) {
    let result;
    this.registerListeners([identifier], {format, defaultValue});

    let sound = this.findSound(identifier)
    if (sound) {
      result = sound.position;
    }

    if (format == 'percent' || format == 'percentage') {
      if (sound) {
        result = ((sound.position / sound.duration) * 100);
      }
      else {
        result = defaultValue || 0;
      }
    }
    else if (format == 'time') {
      if (sound) {
        result = numericDuration([result])
      }
      else {
        result = defaultValue || "00:00";
      }
    }
    else {
      result = result;
    }

    this.result = result;
    debug(`ember-hifi:helpers:${this.name}:${identifier}:${format}`)(`render = ${this.result}`); 
    return this.result;
  }
}
