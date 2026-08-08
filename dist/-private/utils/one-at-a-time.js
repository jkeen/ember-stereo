import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { A } from '@ember/array';
import debug from 'debug';
import hasEqualUrls from './has-equal-urls.js';
import { service } from '@ember/service';

var _class, _descriptor;
let OneAtATime = (_class = class OneAtATime {
  constructor() {
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    this.sounds = A();
    // The exact 'audio-played' handler bound for each registered sound, so
    // unregister can remove the same reference it added.
    this._playedHandlers = new WeakMap();
  }
  register(sound) {
    let sounds = this.sounds;
    if (sounds.includes(sound)) {
      return;
    }
    let handler = () => this.pauseAll(sound);
    this._playedHandlers.set(sound, handler);
    sound.on('audio-played', handler);
    sounds.pushObject(sound);
  }

  // Drop a torn-down connection so the list doesn't grow unbounded across
  // swaps and pauseAll stops calling pause() on dead backends.
  unregister(sound) {
    let handler = this._playedHandlers.get(sound);
    if (handler) {
      sound.off('audio-played', handler);
      this._playedHandlers.delete(sound);
    }
    this.sounds.removeObject(sound);
  }
  pauseAll(sound) {
    this.sounds.forEach(s => {
      if (!hasEqualUrls(s.url, sound.url)) {
        debug('ember-stereo:one-at-at-time')(`pausing ${s.url}`);
        s.pause();
      }
    });
    debug('ember-stereo:one-at-at-time')(`playing ${sound.url}`);
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { OneAtATime as default };
//# sourceMappingURL=one-at-a-time.js.map
