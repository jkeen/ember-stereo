import { next, bind } from '@ember/runloop';
import Ember from 'ember';
import BaseSound from 'ember-stereo/stereo-connections/base';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
export default class DummyConnection extends BaseSound {
  static canPlay = () => true;
  static canUseConnection = () => true;
  static canPlayMimeType = () => true;
  static toString() {
    return 'Dummy Connection';
  }

  static key = 'DummyConnection';

  debugName = 'dummyConnection';
  _position = 0;
  _tickInterval = 50;

  setup() {
    let { result, error } = this.getInfoFromUrl();
    if (result === 'bad') {
      next(() => {
        this.trigger('audio-load-error', { sound: this, error: (error || 'failed to load') });
      });
    }
    else {
      next(() => {
        this.trigger('audio-loaded', { sound: this });
        this.trigger('audio-ready', { sound: this });
      });
    }
  }

  stopTicking() {
    window.clearTimeout(this.tick);
  }

  startTicking() {
    // if (!Ember.Test.checkWaiters || Ember.Test.checkWaiters()) {
    this.tick = window.setTimeout(
      bind(() => {
        this._setPosition(
          (this._currentPosition() || 0) + this._tickInterval
        );
        this.startTicking();
      }),
      this._tickInterval
    );
    // } else {
    // this.stopTicking();
    // }
  }

  getInfoFromUrl() {
    if (!this.url) {
      return {};
    }

    this.url = new StereoUrl(this.url);

    if (this.url.pathname && this.url.pathname.startsWith('/') && this.url.pathname.length > 1) {
      let [, result, lengthOrError, name] = this.url.pathname.split('/');
      /*eslint no-console: 0 */
      if (!(result && lengthOrError && name)) {
        console.error(
          '[dummy-connection] url format should be "/good/:length/:name"',
          '[dummy-connection] url format should be "/bad/:error/:name"'
        );
      }
      else {
        if (result === 'good' && !(lengthOrError === 'stream' || parseInt(lengthOrError) > 0)) {
          console.error(
            '[dummy-connection] url format should be "/:result/:length/:name"'
          );
          console.error(
            `[dummy-connection] length should be an integer or "stream". Was given ${this.url}`
          );
        }

        if (!(result === 'good' || result === 'bad')) {
          console.error(
            '[dummy-connection] url format should be "/:result/:length/:name"'
          );
          console.error(
            `[dummy-connection] status should be 'good' or 'bad'. Was given ${this.url}`
          );
        }
      }


      if (result === 'bad') {
        return { result, length: 1000, error: decodeURI(lengthOrError), name };
      }
      else {
        return { result, length: lengthOrError, name };
      }
    } else {
      return { result: 'good', length: 1000, name: 'default' };
    }
  }

  play({ position } = {}) {
    return new Promise((resolve) => {
      if (typeof position !== 'undefined') {
        this._position = position;
      }
      next(() => {
        this.trigger('audio-played', { sound: this })
        resolve();
      });
      this.startTicking();
    })

  }

  pause() {
    next(() => this.trigger('audio-paused', { sound: this }));
    this.stopTicking();
  }

  stop() {
    next(() => this.trigger('audio-paused', { sound: this }));
    this.stopTicking();
  }

  _setPosition(pos) {
    pos = Math.max(0, pos);
    pos = Math.min(this._audioDuration(), pos);
    this._position = pos;

    if (pos >= this._audioDuration()) {
      next(() => {
        this.trigger('audio-ended', { sound: this });
        this.stopTicking();
      });
    }

    return pos;
  }

  _currentPosition() {
    return this._position;
  }

  _setVolume(v) {
    this.volume = v;
  }

  _audioDuration() {
    let { result, length } = this.getInfoFromUrl();
    if (result === 'bad') {
      return;
    }

    if (length === 'stream') {
      return Infinity;
    } else {
      return parseInt(length, 10);
    }
  }
}
