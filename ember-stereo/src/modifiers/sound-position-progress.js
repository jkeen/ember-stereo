/**
 * This is the modifier used to transform an element into a progress bar, where it will take up the width equivalent to the sound's position
 * ```hbs
  <div {{sound-position-progress @identifier}}>
  </div>
  ```
 *
  @class {{sound-position-progress}}
  @type Modifier
*/

import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';
import debug from 'debug';

import {
  task,
  waitForProperty,
  waitForEvent,
  timeout,
  race,
} from 'ember-concurrency';

export default class SoundPositionProgressModifier extends Modifier {
  @service stereo;
  element = null;
  identifier = null;

  get loadedSound() {
    return this.stereo.findLoadedSound(this.identifier);
  }

  modifyPosition({ sound, position, duration }) {
    let dur = duration || sound?.duration || 1;
    let pos = position || sound?.position || 0;

    let percent = Math.max(0, Math.min((pos / dur) * 100, 100));

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

  @task
  *watchPositionTask() {
    while (true) {
      yield waitForProperty(this, 'loadedSound', (v) => v);
      let position = this.loadedSound?.position;
      yield timeout(100);

      if (this.loadedSound) {
        let result = yield race([
          waitForEvent(this.loadedSound, 'audio-position-will-change').then(
            (event) => {
              this.modifyPosition({
                sound: this.loadedSound,
                position: event.newPosition, // Set the position from the will-change event
              });
              return { ...event, willChange: true }; // Indicate that will-change event fired
            }
          ),
          waitForEvent(this.loadedSound, 'audio-position-changed'),
          waitForProperty(
            this,
            'loadedSound',
            (sound) => sound?.position != position
          ),
        ]);

        if (result?.willChange) {
          // If audio-position-will-change was the event, wait for a delay before letting the sound update again
        } else if (result?.sound) {
          // Handle audio-position-changed or other position updates
          this.modifyPosition({
            sound: result.sound,
            position: result?.newPosition,
          });
        } else if (this.loadedSound) {
          // Fallback to update the position based on the current sound
          this.modifyPosition({ sound: this.loadedSound });
        }
      }
    }
  }
}
