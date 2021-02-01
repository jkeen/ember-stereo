import { next, bind } from '@ember/runloop';
import Mixin from '@ember/object/mixin';
import Ember from 'ember';
import BaseSound from './base';
import classic from 'ember-classic-decorator';
import { tracked } from '@glimmer/tracking';
@classic
export default class DummyConnection extends BaseSound {
  static setup() {}
  static canPlay = () => true
  static canUseConnection = () => true
  static canPlayMimeType = () => true
  static toString() {
    return 'Dummy Connection';
  }

  debugName = 'dummyConnection'
  _position=  0
  _tickInterval = 50

  setup() {
    let {result} = this.getInfoFromUrl();
    if (result === 'bad') {
      next(() => this.trigger('audio-load-error', this));
    }
    else {
      next(() => this.trigger('audio-ready', this));
    }
  }

  stopTicking() {
    window.clearTimeout(this.tick);
  }

  startTicking() {
    if (!Ember.Test.checkWaiters || Ember.Test.checkWaiters()) {
      this.tick = window.setTimeout(bind(() => {
        this._setPosition((this._currentPosition() || 0) + this._tickInterval);
        this.startTicking();
      }), this._tickInterval);
    } else {
      this.stopTicking();
    }
  }

  getInfoFromUrl() {
    if (!this.url) {
      return {};
    }
    else if (this.url.startsWith('/')) {
      let [, result, length, name] = this.url.split('/');
      /*eslint no-console: 0 */
      if (!(result && length && name)) {
        console.error('[dummy-connection] url format should be "/:result/:length/:name"');
      }
      else {
        if (!(length === 'stream' || parseInt(length) > 0)) {
          console.error('[dummy-connection] url format should be "/:result/:length/:name"');
          console.error(`[dummy-connection] length should be an integer or "stream". Was given ${this.url}`);
        }

        if (!(result === 'good' || result === 'bad')) {
          console.error('[dummy-connection] url format should be "/:result/:length/:name"');
          console.error(`[dummy-connection] status should be 'good' or 'bad'. Was given ${this.url}`);
        }
      }

      return {result, length, name};
    }
    else {
      return {result:'good', length:1000, name:'default'};
    }
  }

  play({position} = {}) {
    if (typeof position !== 'undefined') {
      this._position = position;
    }
    this.trigger('audio-played', this);
    this.startTicking();
  }

  pause() {
    this.trigger('audio-paused', this);
    this.stopTicking();
  }

  stop() {
    this.trigger('audio-paused', this);
    this.stopTicking();
  }

  _setPosition(duration) {
    duration = Math.max(0, duration);
    duration = Math.min(this._audioDuration(), duration);
    this._position = duration;

    if (duration >= this._audioDuration()) {
      next(() => {
        this.trigger('audio-ended', this);
        this.stopTicking();
      });
    }

    return duration;
  }

  _currentPosition() {
    return this.get('_position');
  }

  _setVolume(v) {
    this.volume = v;
  }

  _audioDuration() {
    let {result, length} = this.getInfoFromUrl();

    if (result === 'bad') {
      return;
    }

    if (length === 'stream') {
      return Infinity;
    }
    else {
      return parseInt(length, 10);
    }
  }
}

