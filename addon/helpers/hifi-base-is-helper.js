import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import { once } from '@ember/runloop';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { getOwner } from '@ember/application';
@classic
export default class HifiBaseListenHelper extends Helper {
  @service hifi;

  @tracked sound = null;
  @tracked compare = null;
  @tracked result = false
  registered = false

  registerListeners(compare) {
    this.boundRecompute = (e) => this.recompute(e);

    if (!this.registered) {
      this.registered = compare;
      this.hifi.on('new-load-request', ({loadPromise, urlsOrPromise}) => {
        if (hasEqualUrls(urlsOrPromise, this.registered)) {
          loadPromise.then(({sound}) => this.boundRecompute(this.registered));
        }
      })

      this.listen.forEach(eventName => {
        this.hifi.on(eventName, (sound) => {
          if (sound && hasEqualUrls(sound.url, this.registered)) {
            debug(`ember-hifi:helpers:${this.name}`)(`${this.registered} recompute`);
            this.sound = sound;
            this.boundRecompute(this.registered);
          }
          else if (sound && this.registered == 'system') {
            this.boundRecompute(this.registered);
          }
        })
      })
    }
  }

  compute(compare = 'system') {
    if (compare.toString().trim().length == 0) {
      compare = 'system';
    }
    this.registerListeners(compare);
    if (compare == 'system') {
      this.result = this.checkSystem();
      debug(`ember-hifi:helpers:${this.name}:system`)(`render = ${this.result}`); 
    }
    else {
      let sound = this.hifi.findLoaded(compare);
      this.result = this.checkSound(sound);
      debug(`ember-hifi:helpers:${this.name}`)(`${compare} render=${this.result}`); 
    }

    return this.result;
  }
}