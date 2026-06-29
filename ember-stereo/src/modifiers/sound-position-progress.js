/**
 * This is the modifier used to transform an element into a progress bar, where it will take up the width equivalent to the sound's position
 * ```hbs
  <div {{sound-position-progress @identifier}}>
  </div>
  ```
 *
  @class {{sound-position-progress}}
  @type Modifier
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Integer} position
  @param {Integer} duration
*/

import { service } from '@ember/service';
import Modifier from 'ember-modifier';
import debug from 'debug';

import { task, waitForEvent, timeout, race } from 'ember-concurrency';

// How often the loop polls for a sound to appear, since there's no event to
// wait on for that. Replaces ember-concurrency's deprecated (observer-based)
// waitForProperty; the task is canceled when the modifier is destroyed, so the
// loop can't outlive the host.
const SOUND_POLL_MS = 100;

export default class SoundPositionProgressModifier extends Modifier {
  @service stereo;
  element = null;
  identifier = null;

  get loadedSound() {
    return this.stereo.findLoadedSound(this.identifier);
  }

  modifyPosition({ sound, position, duration }) {
    let dur = duration || sound?.duration || 1;
    let pos = position ?? sound?.position ?? 0;

    let percent = Math.max(0, Math.min((pos / dur) * 100, 100));

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
        duration: options?.duration,
      });
    }

    if (this.identifier) {
      this.watchPositionTask.perform().catch((e) => {
        debug(`ember-stereo:sound-position-progress ${this.identifier}`, e);
      });
    } else {
      this.modifyPosition({
        position: options?.position,
        duration: options?.duration,
      });
    }
  }

  watchPositionTask = task({ restartable: true }, async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // Poll until a sound exists for this identifier (no event to wait on).
      while (!this.loadedSound) {
        await timeout(SOUND_POLL_MS);
      }

      let sound = this.loadedSound;
      // Paint the current position immediately, then update on each change.
      // Parking on the events (rather than a polling timeout) keeps the task
      // idle between updates — both that it doesn't busy-spin in production and
      // that it settles in tests, where ember-concurrency fast-forwards
      // timeout() and a timeout-driven loop would never go idle.
      this.modifyPosition({ sound });

      while (this.loadedSound === sound) {
        // will-change carries the upcoming position (direct sets, fast-forward,
        // rewind); changed carries the new position during playback.
        let event = await race([
          waitForEvent(sound, 'audio-position-will-change'),
          waitForEvent(sound, 'audio-position-changed'),
        ]);

        this.modifyPosition({
          sound,
          position: event?.newPosition ?? event?.position,
        });
      }
    }
  });
}
