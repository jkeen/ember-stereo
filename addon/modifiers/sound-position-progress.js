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

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

export default class SoundPositionProgressModifier extends Modifier {
  @service stereo;
  element = null;

  constructor() {
    super(...arguments);
    registerDestructor(this, this.unregisterListeners.bind(this));
  }

  get loadedSound() {
    return this.stereo.findLoadedSound(this.url);
  }

  @action
  onPositionChange({ sound }) {
    if (sound.hasUrl(this.url)) {
      this.modifyPosition(...arguments);
    }
  }

  modifyPosition({ newPosition }) {
    newPosition = newPosition || this.loadedSound.position;
    this.element.style.width = `${
      ((newPosition || this.loadedSound.position) / this.loadedSound.duration) *
      100
    }%`;
    this.element.style.pointerEvents = 'none';
  }

  modify(element, [url], options) {
    this.url = url;
    this.options = options;

    if (!this.element) {
      this.element = element;
      this.element.setAttribute('data-sound-position-progress', true);

      this.stereo.on(
        'audio-position-will-change',
        this.onPositionChange.bind(this)
      );
      this.stereo.on(
        'audio-position-changed',
        this.onPositionChange.bind(this)
      );
    }
  }

  unregisterListeners() {
    try {
      this.stereo.off(
        'audio-position-changed',
        this.onPositionChange.bind(this)
      );
      this.stereo.off(
        'audio-position-will-change',
        this.onPositionChange.bind(this)
      );
    } catch (e) {
      /* geez, relax */
    }
  }
}
