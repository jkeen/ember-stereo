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
import { once } from '@ember/runloop';
export default class SoundPositionProgressModifier extends Modifier {
  @service stereo;

  get url() {
    return this.args.positional[0]
  }

  get loadedSound() {
    return this.stereo.findLoadedSound(this.url);
  }

  @action onPositionChange() {
    once(this, this.modifyPosition, ...arguments, 500);
  }

  modifyPosition({ newPosition }) {
    this.element.style.width = `${((newPosition || this.loadedSound.position) / this.loadedSound.duration) * 100}%`;
    this.element.style.pointerEvents = 'none';
  }

  didInstall() {
    this.element.setAttribute('data-sound-position-progress', true)
  }

  didReceiveArguments() {
    if (this.url) {
      this.stereo.soundProxy(this.url).afterLoad(sound => {
        sound.on('audio-position-will-change', this.onPositionChange.bind(this));
        sound.on('audio-position-changed', this.onPositionChange.bind(this));
      })
    }
  }

  willRemove() {
    try {
      if (this.loadedSound) {
        this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        this.loadedSound.off('audio-position-will-change', this.onPositionChange.bind(this));
      }
    } catch (e) { /* geez, relax */ }
  }
}
