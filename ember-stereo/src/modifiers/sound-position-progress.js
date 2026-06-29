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

// How often the loop re-checks for a sound to appear / re-syncs position when no
// position event fires. Polling replaces ember-concurrency's deprecated
// (observer-based) waitForProperty; the task is canceled when the modifier is
// destroyed, so neither loop can outlive the host.
const SOUND_POLL_MS = 100;
const POSITION_RESYNC_MS = 250;

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
      await timeout(SOUND_POLL_MS);

      if (this.loadedSound) {
        // will-change carries the upcoming position, changed carries the new
        // one, and the timeout is a resync tick that fires no event (e.g. a
        // direct position set; replaces the old observer-based wait). All three
        // converge on the same thing: re-render the bar from whatever position
        // we can read.
        let event = await race([
          waitForEvent(this.loadedSound, 'audio-position-will-change'),
          waitForEvent(this.loadedSound, 'audio-position-changed'),
          timeout(POSITION_RESYNC_MS),
        ]);

        // modifyPosition falls back to sound.position when position is
        // undefined, so the resync tick re-syncs without any special-casing.
        this.modifyPosition({
          sound: this.loadedSound,
          position: event?.newPosition,
        });
      }
    }
  });
}
