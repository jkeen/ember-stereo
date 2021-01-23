import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import { once } from '@ember/runloop';

@classic
export default class HifiBaseListenHelper extends Helper {
  @service hifi;
  @tracked result = false;

  init() {
    super.init(...arguments);
    this.boundRecompute = () => this.check();
    this.listen.forEach(eventName => {
      this.hifi.on(eventName, this.boundRecompute);
    })  
  }

  willDestroy() {
    this.listen.forEach(eventName => {
      this.hifi.off(eventName, this.boundRecompute);
    })  
  }

  check() {
    let result;
    if (this.compare == 'system') {
      result = this.checkSystem()
      debug(`ember-hifi:helpers:${this.name}`)(`system check=${result}`); 
    }
    else {
      let sound = this.hifi.findLoaded(this.compare);
      result = this.checkSound(sound);
      if (sound && sound.url) {
        debug(`ember-hifi:helpers:${this.name}`)(`${sound.url} check=${result}`); 
      }
      else {
        debug(`ember-hifi:helpers:${this.name}`)(`sound check=${result}`); 
      }
    }

    once(() => {
      this.updateResult(result);
    });
  }

  updateResult(newResult) {
    if (newResult != this.result) {
      this.result = newResult;
    }  
  }

  compute(compare) {
    if (!this.compare) {
      if (!compare) { 
        this.compare = 'system';
      }
      else {
        this.compare = compare;
      }
      this.check();
    }

    debug(`ember-hifi:helpers:${this.name}`)(`${this.compare} render=${this.result}`); 

    return this.result;
  }
}