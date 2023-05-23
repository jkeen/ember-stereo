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
import { cached } from 'tracked-toolbox';
import Modifier from 'ember-modifier';
import { macroCondition, isTesting } from '@embroider/macros';

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

  @cached
  get loadedSound() {
    return this.stereo.findLoadedSound(this.url);
  }

  modifyPosition({ sound }) {
    let position = sound?.position ?? 0;
    let duration = sound?.duration ?? 1;

    this.element.style.width = `${(position / duration) * 100}%`;
    this.element.style.pointerEvents = 'none';
  }

  modify(element, [url], options) {
    this.url = url;
    this.options = options;

    if (!this.element) {
      this.element = element;
      this.element.setAttribute('data-sound-position-progress', true);
      this.modifyPosition({ sound: this.loadedSound });
    }
    this.watchPositionTask.perform().catch(() => {
      /* noop */
    });
  }

  @task({ drop: true })
  *watchPositionTask() {
    while (true) {
      let position = this.loadedSound?.position;
      yield timeout(100);

      let result = yield race([
        waitForEvent(this.stereo, 'audio-position-will-change'),
        waitForEvent(this.stereo, 'audio-position-changed'),
        waitForProperty(
          this,
          'loadedSound',
          (sound) => sound?.position != position
        ),
        timeout(500),
      ]);

      if (result?.sound) {
        this.modifyPosition({ sound: result.sound });
      } else if (this.loadedSound) {
        this.modifyPosition({ sound: this.loadedSound });
      }

      if (macroCondition(isTesting())) {
        break;
      }
    }
  }
}
