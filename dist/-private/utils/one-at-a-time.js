import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { A } from '@ember/array';
import debug from 'debug';
import hasEqualUrls from './has-equal-urls.js';
import { inject } from '@ember/service';

var _class, _descriptor;
let OneAtATime = (_class = class OneAtATime {
  constructor() {
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    this.sounds = A();
  }
  register(sound) {
    let sounds = this.sounds;
    sound.on('audio-played', () => this.pauseAll(sound));
    if (!sounds.includes(sound)) {
      sounds.pushObject(sound);
    }
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { OneAtATime as default };
//# sourceMappingURL=one-at-a-time.js.map
