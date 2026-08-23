/**
 * This is the modifier used to transform an element into a progress bar, where it will take up the width equivalent to the sound's position
 * ```hbs
  <div {{sound-position-progress @identifier}}>
  </div>
  ```
 *
  @class {{sound-position-progress}}
  @type Modifier
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @param {Integer} position
  @param {Integer} duration
*/

import { service } from '@ember/service';
import Modifier from 'ember-modifier';
import debug from 'debug';

import { task, waitForEvent, race } from 'ember-concurrency';

export default class SoundPositionProgressModifier extends Modifier {
  @service stereo;
  element = null;
  identifier = null;

  get sound() {
    return this.stereo.findSound(this.identifier);
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
        sound: this.sound,
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
    let sound = this.sound;

    // ember-concurrency fast-forwards timeout() in tests, so a timeout-driven loop would never go idle.
    this.modifyPosition({ sound });

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let event = await race([
        waitForEvent(sound, 'audio-position-will-change'),
        waitForEvent(sound, 'audio-position-changed'),
      ]);

      this.modifyPosition({
        sound,
        position: event?.newPosition ?? event?.position,
      });
    }
  });
}
