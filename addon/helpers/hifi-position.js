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
  sound;
  result;

  default = 0

  /**
    returns the position in milliseconds
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, percent,
    @return {Float}
  */

  compute([identifier='system'], {format=false, defaultValue}) {   
    if (identifier !== this.identifier) {
      this.identifier = identifier || 'system';
      if (this.identifier == 'system') {
        this.sound = this.hifi.currentSound;
      }
      else if (this.identifier !== 'system') {
        let sound = this.hifi.findLoaded(this.identifier)
        if (sound) {
          this.sound = sound;
        }
        else {
          this.hifi.on('new-load-request', async ({loadPromise, urlsOrPromise, options}) => {
            let isEqual = await hasEqualUrls(this.identifier, urlsOrPromise);
            if (isEqual) {
              loadPromise.then(({sound}) => this.sound = sound);
            }
          });
        }
      }
    }

    let result = defaultValue;

    if (this.sound) {
      this.result = this.sound.position;
    }

    if (format == 'percent' || format == 'percentage') {
      if (this.sound) {
        this.result = ((this.sound.position / this.sound.duration) * 100);
      }
      else {
        this.result = defaultValue || 0;
      }
    }
    else if (format == 'time') {
      if (this.sound) {
        this.result = numericDuration([this.result])
      }
      else {
        this.result = defaultValue || "00:00";
      }
    }

    debug(`ember-hifi:helpers:hifi-position:${identifier}:${format}`)(`render = ${this.result}`); 
    return this.result
  }
}
