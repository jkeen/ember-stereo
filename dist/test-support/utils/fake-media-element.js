import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import Evented from '../../-private/utils/evented.js';
import { tracked } from '@glimmer/tracking';
import TestAudioUrl from './test-audio-url.js';
import { registerDestructor } from '@ember/destroyable';
import { task, animationFrame, rawTimeout } from 'ember-concurrency';
import debug from 'debug';

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;
// Ready state values
// const HAVE_NOTHING = 0;
// const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
// const HAVE_FUTURE_DATA = 3;
// const HAVE_ENOUGH_DATA = 4;
let FakeMediaElement = (_class = class FakeMediaElement extends Evented {
  constructor() {
    super(...arguments);
    _initializerDefineProperty(this, "volume", _descriptor, this);
    _initializerDefineProperty(this, "seeking", _descriptor2, this);
    _initializerDefineProperty(this, "playbackRate", _descriptor3, this);
    _initializerDefineProperty(this, "paused", _descriptor4, this);
    _initializerDefineProperty(this, "muted", _descriptor5, this);
    _initializerDefineProperty(this, "error", _descriptor6, this);
    _initializerDefineProperty(this, "autoplay", _descriptor7, this);
    _initializerDefineProperty(this, "played", _descriptor8, this);
    _initializerDefineProperty(this, "loaded", _descriptor9, this);
    _initializerDefineProperty(this, "readyState", _descriptor10, this);
    _initializerDefineProperty(this, "crossOrigin", _descriptor11, this);
    _initializerDefineProperty(this, "_currentTime", _descriptor12, this);
    debug('ember-stereo:fake-element')(`initializing fake ${arguments[0] ?? ''} element`);
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
    this.startTickingTask.cancelAll();
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
        this.trigger('onloadedmetadata', {
          target: this
        });
        this.trigger('canplaythrough', {
          target: this
        });
        this.trigger('loadeddata', {
          target: this
        });
        this.loaded = true;
        debug('ember-stereo:fake-element')(`loaded ${this.src}`);
      }, 20);
    } else if (info.isError) {
      debug('ember-stereo:fake-element')(`${this.src} will error`);
      setTimeout(() => {
        this.loaded = false;
        this.error = {
          code: 100,
          // custom
          message: info.error
        };
        this.trigger('error', {
          target: this
        });
      }, 50);
      return;
    } else if (this.src.startsWith('blob://')) {
      this.readyState = HAVE_CURRENT_DATA;
      this.duration = 1;
      this.trigger('loadeddata', {
        target: this
      });
      this.trigger('onloadedmetadata', {
        target: this
      });
      this.trigger('canplaythrough', {
        target: this
      });
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

      console.warn(`unrecognized fake media element url. Format should be /:status/:length_or_error/:name, received ${this.src}`);

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
    this.trigger('playing', {
      target: this
    });
    return this.startTickingTask.perform();
  }
  pause() {
    debug('ember-stereo:fake-element')(`${this.src} pausing`);
    this.trigger('pause', {
      target: this
    });
    this.paused = true;
  }
  stop() {
    this.pause();
  }
  get seekable() {
    return this.duration === Infinity;
  }
  get currentTime() {
    return this._currentTime;
  }
  set currentTime(value) {
    debug('ember-stereo:fake-element')(`${this.src} setting position to ${value} / ${this.duration}`);
    if (value >= this.duration) {
      this._currentTime = this.duration;
      debug('ember-stereo:fake-element')(`firing ended event`);
      this.trigger('ended', {
        target: this
      });
      this.paused = true;
    } else {
      this.trigger('seeked', {
        target: this
      });
      this._currentTime = value;
    }
  }
  remove() {
    this.paused = true;
  }
  get src() {
    return this._src;
  }
  set src(value) {
    if (this._src != value) {
      debug('ember-stereo:fake-element')(`setting src ${value}`);
      if (this._src) {
        this.trigger('emptied', {
          target: this
        });
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
  *startTickingTask() {
    let cutoffTime = new Date().getTime() + 2 * 1000;
    while (!this.paused && this.src && new Date() < cutoffTime) {
      // don't let a sound live longer than 2 seconds when testing
      yield animationFrame();
      var diff = this._previous ? new Date().getTime() - this._previous : 0;
      this._previous = new Date().getTime();
      this.currentTime = this.currentTime + diff / 1000;
      this.trigger('timeupdate', {
        target: this
      });
      debug('ember-stereo:fake-element')(`${this.src} ${this.currentTime}`);
      yield rawTimeout(50);
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "volume", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "seeking", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "playbackRate", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "paused", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "muted", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "error", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "autoplay", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "played", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "loaded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "readyState", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "crossOrigin", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "_currentTime", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class.prototype, "startTickingTask", [task], Object.getOwnPropertyDescriptor(_class.prototype, "startTickingTask"), _class.prototype)), _class);

export { FakeMediaElement as default };
//# sourceMappingURL=fake-media-element.js.map
