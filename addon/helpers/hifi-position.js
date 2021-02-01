import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { tracked } from '@glimmer/tracking';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { dedupeTracked } from 'tracked-toolbox';
import { throttle } from '@ember/runloop';
import {numericDuration} from './numeric-duration';
import { next } from '@ember/runloop';
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
  default = 0
  @dedupeTracked result;

  registerListeners([identifier], {format}) {
    if (!this.registered) {
      this.registered = identifier;
      this.boundRecompute = (e) => this.recompute(e)

      this.hifi.on('audio-position-changed', (sound) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          throttle(this.registered, this.boundRecompute, 1000);
        }
        else if (sound && this.registered == 'system') {
          throttle(this.registered, this.boundRecompute, 1000);
        }
      });

      this.hifi.on('audio-position-will-change', (sound, {currentPosition, newPosition}) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          throttle(this.registered, this.boundRecompute, 1000);
        }
        else if (sound && this.registered == 'system') {
          throttle(this.registered, this.boundRecompute, 1000);
        }
      })
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
    this.registerListeners([identifier], {format, defaultValue});

    let result = this.result;
    let sound = this.findSound(identifier)
    if (sound) {
      result = sound.position;
    }

    if (format == 'percent' || format == 'percentage') {
      if (sound) {
        this.result = ((sound.position / sound.duration) * 100);
      }
      else {
        this.result = defaultValue || 0;
      }
    }
    else if (format == 'time') {
      if (sound) {
        this.result = numericDuration([result])
      }
      else {
        this.result = defaultValue || "00:00";
      }
    }
    else {
      this.result = result;
    }

    debug(`ember-hifi:helpers:${this.name}:${identifier}:${format}`)(`render = ${this.result}`); 
    return this.result;
  }
}
