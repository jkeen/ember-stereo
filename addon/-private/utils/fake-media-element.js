import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import Evented from 'ember-stereo/-private/utils/evented'
import { tracked } from '@glimmer/tracking';
import { cancel, later } from '@ember/runloop';
import debug from 'debug'
// Ready state values
// const HAVE_NOTHING = 0;
// const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
// const HAVE_FUTURE_DATA = 3;
// const HAVE_ENOUGH_DATA = 4;

class TestAudioUrl {
  @tracked status;

  constructor(testUrl) {
    this.url = new StereoUrl(testUrl);

    if (this.url.pathname && this.url.pathname.startsWith('/') && this.url.pathname.length > 1) {
      var [, result, lengthOrError, name] = this.url.pathname.replace(/^\/?tests\//, '').split('/');
      this.status = result;
      this.lengthOrError = lengthOrError
      this.name = name;
    }
  }

  get isTestUrl() {
    return (this.status === 'good' || this.status === 'bad') && this.lengthOrError && this.name
  }

  get isSuccess() {
    return this.status === 'good'
  }

  get isError() {
    return this.status === 'bad'
  }

  get isStream() {
    return this.isSuccess && this.lengthOrError === 'stream'
  }

  get duration() {
    if (this.isSuccess) {
      if (this.isStream) {
        return Infinity
      } else {
        return parseInt(this.lengthOrError, 10) / 1000;
      }
    }

    return NaN
  }

  get error() {
    if (this.isError) {
      return this.lengthOrError;
    }

    return NaN
  }
}

export default class FakeMediaElement extends Evented {
  @tracked volume = 0
  @tracked seeking = false
  @tracked playbackRate = 1
  @tracked paused = true
  @tracked muted = true
  @tracked error = false
  @tracked autoplay = false
  @tracked played = false
  @tracked loaded = false
  @tracked _currentTime = 0

  constructor(url) {
    super(...arguments);
    debug('ember-stereo:fake-element')(`initializing fake ${url}`)

    this.src = url || ''
    this.setInitialState();

    if (this.src) {
      debug('ember-stereo:fake-element')(`loading ${this.src}`)
      this.load()
    }
  }

  setInitialState() {
    this.volume = 0
    this.seeking = false
    this.playbackRate = 1
    this.paused = true
    this.muted = true
    this.error = false
    this.autoplay = false
    this.played = false
    this.loaded = false
    this.duration = NaN;
    this._currentTime = 0;
    this.loaded = false;
  }

  load() {
    later(() => {
      if (this.loaded) {
        debug('ember-stereo:fake-element')(`already loaded ${this.src}`)

        this.trigger('emptied', { target: this })
        return
      }

      if (!this.src || !this.src.length) {
        return
      }

      let info = new TestAudioUrl(this.src)

      if (info.isSuccess) {
        this.readyState = HAVE_CURRENT_DATA

        this.duration = info.duration;
        this.trigger('onloadedmetadata', { target: this })

        this.trigger('canplaythrough', { target: this })
        this.loaded = true

        debug('ember-stereo:fake-element')(`loaded ${this.src}`)

        return;
      } else if (info.isError) {
        this.loaded = false
        this.error = {
          code: 100, // custom
          message: info.error
        }
        return this.trigger('error', { target: this })
      } else {
        this.duration = 1

        // maybe this is a real element?
        // throw 'must provide a test url'
      }
    }, 200)
  }

  async play() {
    if (!this.loaded) {
      await this.load()
    }

    debug('ember-stereo:fake-element')(`play ${this.src}`)
    this.paused = false;
    this.trigger('playing', { target: this })
    this.startTimer()
    return Promise.resolve(this)
  }

  pause() {
    debug('ember-stereo:fake-element')(`pausing ${this.src}`)
    this.trigger('pause', { target: this })
    this.stopTimer();
    this.paused = true;
  }

  get seekable() {
    return this.duration === Infinity
  }

  get currentTime() {
    return this._currentTime;
  }
  set currentTime(value) {

    if (value >= this.duration) {
      this._currentTime = this.duration
      this.trigger('ended', { target: this })
    }
    else {
      this._currentTime = value;
    }
    this.trigger('timeupdate', { target: this })
    this.trigger('seeked', { target: this })
  }

  remove() {
    this.stopTimer();
    this.paused = true
  }

  get src() {
    return this._src;
  }
  set src(value) {
    debug('ember-stereo:fake-element')(`setting src ${value}`)

    if (this._src != value) {
      this._src = value;
      this.setInitialState();
    }
  }

  addEventListener() {
    return this.on(...arguments)
  }

  removeEventListener() {
    return this.off(...arguments)
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  removeAttribute(name) {
    delete this[name];
  }

  getAttribute(name) {
    return this[name]
  }

  startTimer() {
    this.runner = this.tick();
  }

  stopTimer() {
    cancel(this.runner);
  }

  resetTimer() {
    this.counter = 0;
  }

  tick() {
    return setTimeout(() => {
      var diff = (this._previous) ? Date.now() - this._previous : 0
      this._previous = Date.now()
      this.currentTime += diff / 1000
      debug('ember-stereo:fake-element')(`${this.src} ${this.currentTime}`)

      if (this.currentTime >= this.duration) {
        this.currentTime = this.duration
        this.trigger('ended', { target: this })
        this.trigger('timeupdate', { target: this })
        if (this.loop) {
          this.currentTime = 0
          return
        }
      } else if (this.duration) {
        this.trigger('timeupdate', { target: this })
        this.runner = this.tick();
      }

    }, 200);
  }
}
