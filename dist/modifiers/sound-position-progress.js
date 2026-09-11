import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { service } from '@ember/service';
import Modifier from 'ember-modifier';
import debug from 'debug';
import { race, waitForEvent } from 'ember-concurrency';

var _class, _descriptor;
let SoundPositionProgressModifier = (_class = class SoundPositionProgressModifier extends Modifier {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "element", null);
    _defineProperty(this, "identifier", null);
    _defineProperty(this, "watchPositionTask", buildTask(() => ({
      context: this,
      generator: function* () {
        let sound = this.sound;

        // ember-concurrency fast-forwards timeout() in tests, so a timeout-driven loop would never go idle.
        this.modifyPosition({
          sound
        });

        // eslint-disable-next-line no-constant-condition
        while (true) {
          let event = yield race([waitForEvent(sound, 'audio-position-will-change'), waitForEvent(sound, 'audio-position-changed')]);
          this.modifyPosition({
            sound,
            position: event?.newPosition ?? event?.position
          });
        }
      }
    }), {
      restartable: true
    }, "watchPositionTask", null));
  }
  get sound() {
    return this.stereo.findSound(this.identifier);
  }
  modifyPosition({
    sound,
    position,
    duration
  }) {
    let dur = duration || sound?.duration || 1;
    let pos = position ?? sound?.position ?? 0;
    let percent = Math.max(0, Math.min(pos / dur * 100, 100));
    this.element.style.width = `${percent}%`;
    this.element.style.pointerEvents = 'none';
  }
  modify(element, [identifier], options) {
    if (this.identifier != identifier) {
      this.identifier = identifier;
    }
    if (!this.element) {
      this.element = element;
      this.element.setAttribute('data-sound-position-progress', true);
      this.modifyPosition({
        sound: this.sound,
        position: options?.position,
        duration: options?.duration
      });
    }
    if (this.identifier) {
      this.watchPositionTask.perform().catch(e => {
        debug(`ember-stereo:sound-position-progress ${this.identifier}`, e);
      });
    } else {
      this.modifyPosition({
        position: options?.position,
        duration: options?.duration
      });
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { SoundPositionProgressModifier as default };
//# sourceMappingURL=sound-position-progress.js.map
