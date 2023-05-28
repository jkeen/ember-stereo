import Evented from '../../-private/utils/evented';
import { tracked } from '@glimmer/tracking';
import TestAudioUrl from './test-audio-url';
import { registerDestructor } from '@ember/destroyable';
import debug from 'debug';
// Ready state values
// const HAVE_NOTHING = 0;
// const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
// const HAVE_FUTURE_DATA = 3;
// const HAVE_ENOUGH_DATA = 4;

export default class FakeMediaElement extends Evented {
  @tracked volume = 0;
  @tracked seeking = false;
  @tracked playbackRate = 1;
  @tracked paused = true;
  @tracked muted = true;
  @tracked error = false;
  @tracked autoplay = false;
  @tracked played = false;
  @tracked loaded = false;
  @tracked readyState;
  @tracked crossOrigin;

  constructor() {
    super(...arguments);

    debug('ember-stereo:fake-element')(
      `initializing fake ${arguments[0] ?? ''} element`
    );
    this.setInitialState();
    registerDestructor(this, () => this.willDestroy());
  }

  setInitialState() {
    this.volume = 0;
    this.seeking = false;
    this.playbackRate = 1;
    this.paused = true;
    this.muted = true;
    this.error = false;
    this.autoplay = false;
    this.played = false;
    this.loaded = false;
    this.duration = NaN;
    this._currentTime = 0;
    this.loaded = false;
    this.crossorigin = 'anonymous';
  }

  async load() {
    debug('ember-stereo:fake-element')(`${this.src} #load`);
    if (this.loaded) {
      debug('ember-stereo:fake-element')(`already loaded ${this.src}`);
      return;
    }

    if (!this.src || !this.src.length) {
      return;
    }

    let info = new TestAudioUrl(this.src);

    debug('ember-stereo:fake-element')(`${this.src} loading`);
    if (info.isSuccess) {
      debug('ember-stereo:fake-element')(`${this.src} will succeed`);

      this.readyState = HAVE_CURRENT_DATA;

      this.duration = info.duration;

      setTimeout(() => {
        this.trigger('onloadedmetadata', { target: this });
        this.trigger('canplaythrough', { target: this });
        this.trigger('loadeddata', { target: this });

        this.loaded = true;
        debug('ember-stereo:fake-element')(`loaded ${this.src}`);
      }, 20);
    } else if (info.isError) {
      debug('ember-stereo:fake-element')(`${this.src} will error`);
      setTimeout(() => {
        this.loaded = false;
        this.error = {
          code: 100, // custom
          message: info.error,
        };

        this.trigger('error', { target: this });
      }, 50);
      return;
    } else if (this.src.startsWith('blob://')) {
      this.readyState = HAVE_CURRENT_DATA;
      this.duration = 1;
      this.trigger('loadeddata', { target: this });
      this.trigger('onloadedmetadata', { target: this });
      this.trigger('canplaythrough', { target: this });
      this.loaded = true;
    } else {
      this.duration = 1;
      this.loaded = false;
      // this.error = {
      //   code: 500,
      //   // custom
      //   message: 'unrecognized fake media element url, defaulting to fail'
      // };
      // this.trigger('error', { target: this })

      console.warn(
        `unrecognized fake media element url. Format should be /:status/:length_or_error/:name, received ${this.src}`
      );

      // maybe this is a real element?
      // throw 'must provide a test url'
    }
  }

  async play() {
    if (!this.loaded) {
      await this.load();
    }

    if (!this.src) {
      return;
    }

    debug('ember-stereo:fake-element')(`${this.src} play`);
    this.paused = false;
    this.startTimer();
    this.trigger('playing', { target: this });
    return Promise.resolve(this);
  }

  pause() {
    debug('ember-stereo:fake-element')(`${this.src} pausing`);
    this.trigger('pause', { target: this });
    this.stopTimer();
    this.paused = true;
  }

  stop() {
    this.pause();
    this.stopTimer();
  }

  get seekable() {
    return this.duration === Infinity;
  }

  @tracked _currentTime = 0;
  get currentTime() {
    return this._currentTime;
  }
  set currentTime(value) {
    debug('ember-stereo:fake-element')(
      `${this.src} setting position to ${value} / ${this.duration}`
    );
    if (value >= this.duration) {
      this._currentTime = this.duration;
      debug('ember-stereo:fake-element')(`firing ended event`);
      this.trigger('ended', { target: this });
      this.paused = true;
    } else {
      this.trigger('seeked', { target: this });
      this._currentTime = value;
    }
  }

  remove() {
    this.stopTimer();
    this.paused = true;
  }

  get src() {
    return this._src;
  }
  set src(value) {
    if (this._src != value) {
      debug('ember-stereo:fake-element')(`setting src ${value}`);
      if (this._src) {
        this.trigger('emptied', { target: this });
      }

      this._src = value;
      this.setInitialState();
      this.load();

      this.paused = true;
    }
  }

  addEventListener() {
    return this.on(...arguments);
  }

  removeEventListener() {
    return this.off(...arguments);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  removeAttribute(name) {
    this[name] = null;
  }

  getAttribute(name) {
    return this[name];
  }

  startTimer() {
    this._stereoFakeMediaElementPoller = setInterval(
      this.advance.bind(this),
      500
    );
  }

  stopTimer() {
    clearInterval(this._stereoFakeMediaElementPoller);
  }

  resetTimer() {
    this.counter = 0;
  }

  advance() {
    if (!this.paused && this.src) {
      var diff = this._previous ? Date.now() - this._previous : 0;
      this._previous = Date.now();
      this.currentTime = this.currentTime + diff / 1000;
      this.trigger('timeupdate', { target: this });

      debug('ember-stereo:fake-element')(`${this.src} ${this.currentTime}`);
    } else {
      // this._previous = false;
    }
  }

  willDestroy() {
    this.stopTimer();
  }
}
