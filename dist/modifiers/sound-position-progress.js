import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { inject } from '@ember/service';
import Modifier from 'ember-modifier';
import debug from 'debug';
import { task, waitForProperty, timeout, race, waitForEvent } from 'ember-concurrency';

var _class, _descriptor;
let SoundPositionProgressModifier = (_class = class SoundPositionProgressModifier extends Modifier {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "element", null);
    _defineProperty(this, "identifier", null);
  }
  get loadedSound() {
    return this.stereo.findLoadedSound(this.identifier);
  }
  modifyPosition({
    sound,
    position,
    duration
  }) {
    let dur = duration || sound?.duration || 1;
    let pos = position || sound?.position || 0;
    let percent = Math.max(0, Math.min(pos / dur * 100, 100));
    this.element.style.width = `${percent}%`;
    this.element.style.pointerEvents = 'none';
  }
  modify(element, [identifier], options) {
    this.options = options;
    if (this.identifier != identifier) {
      this.identifier = identifier;
    }
    if (!this.element) {
      this.element = element;
      this.element.setAttribute('data-sound-position-progress', true);
      this.modifyPosition({
        sound: this.loadedSound,
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
  *watchPositionTask() {
    while (true) {
      yield waitForProperty(this, 'loadedSound', v => v);
      let position = this.loadedSound?.position;
      yield timeout(100);
      if (this.loadedSound) {
        let result = yield race([waitForEvent(this.loadedSound, 'audio-position-will-change').then(event => {
          this.modifyPosition({
            sound: this.loadedSound,
            position: event.newPosition // Set the position from the will-change event
          });

          return {
            ...event,
            willChange: true
          }; // Indicate that will-change event fired
        }), waitForEvent(this.loadedSound, 'audio-position-changed'), waitForProperty(this, 'loadedSound', sound => sound?.position != position)]);
        if (result?.willChange) ; else if (result?.sound) {
          // Handle audio-position-changed or other position updates
          this.modifyPosition({
            sound: result.sound,
            position: result?.newPosition
          });
        } else if (this.loadedSound) {
          // Fallback to update the position based on the current sound
          this.modifyPosition({
            sound: this.loadedSound
          });
        }
      }
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "watchPositionTask", [task], Object.getOwnPropertyDescriptor(_class.prototype, "watchPositionTask"), _class.prototype)), _class);

export { SoundPositionProgressModifier as default };
//# sourceMappingURL=sound-position-progress.js.map
