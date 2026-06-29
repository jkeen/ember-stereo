import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { service } from '@ember/service';
import Modifier from 'ember-modifier';
import debug from 'debug';
import { timeout, race, waitForEvent } from 'ember-concurrency';

var _class, _descriptor;

// How often the loop polls for a sound to appear, since there's no event to
// wait on for that. Replaces ember-concurrency's deprecated (observer-based)
// waitForProperty; the task is canceled when the modifier is destroyed, so the
// loop can't outlive the host.
const SOUND_POLL_MS = 100;
let SoundPositionProgressModifier = (_class = class SoundPositionProgressModifier extends Modifier {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "element", null);
    _defineProperty(this, "identifier", null);
    _defineProperty(this, "watchPositionTask", buildTask(() => ({
      context: this,
      generator: function* () {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          // Poll until a sound exists for this identifier (no event to wait on).
          while (!this.loadedSound) {
            yield timeout(SOUND_POLL_MS);
          }
          let sound = this.loadedSound;
          // Paint the current position immediately, then update on each change.
          // Parking on the events (rather than a polling timeout) keeps the task
          // idle between updates — both that it doesn't busy-spin in production and
          // that it settles in tests, where ember-concurrency fast-forwards
          // timeout() and a timeout-driven loop would never go idle.
          this.modifyPosition({
            sound
          });
          while (this.loadedSound === sound) {
            // will-change carries the upcoming position (direct sets, fast-forward,
            // rewind); changed carries the new position during playback.
            let event = yield race([waitForEvent(sound, 'audio-position-will-change'), waitForEvent(sound, 'audio-position-changed')]);
            this.modifyPosition({
              sound,
              position: event?.newPosition ?? event?.position
            });
          }
        }
      }
    }), {
      restartable: true
    }, "watchPositionTask", null));
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
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { SoundPositionProgressModifier as default };
//# sourceMappingURL=sound-position-progress.js.map
