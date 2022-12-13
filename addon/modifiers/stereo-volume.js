/**
 * This is the modifier used to transform an range control into a volume control
 * ```hbs
  <input type="range" {{stereo-volume}}>
  </input>
  ```
 *
  @class {{stereo-volume}}
  @type Modifier
*/

import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';
export default class StereoVolumeModifier extends Modifier {
  @service stereo;
  element = null;

  constructor() {
    super(...arguments);
    registerDestructor(this, this.unregisterListeners.bind(this));
  }

  get isRangeControl() {
    return this.element.tagName === 'INPUT' && this.element.type === 'range';
  }

  @action
  handleTap(e) {
    e.preventDefault();

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    let volumeLevel = parseInt((x / rect.width) * 100, 10);
    this.stereo.volume = volumeLevel;
  }

  @action onChange(event) {
    if (this.isRangeControl) {
      let volumeLevel = parseInt(event.target.value, 10);
      this.stereo.volume = volumeLevel;
    }
  }

  @action onStereoVolumeChange(volume) {
    this.element.value = volume;
  }

  modify(element, [eventName], options) {
    if (!this.element) {
      console.log('modify');
      this.element = element;
      this.eventName = eventName;
      this.options = options;

      if (this.isRangeControl) {
        this.element.setAttribute('max', 100);
        this.element.setAttribute('min', 0);
        this.element.addEventListener('change', this.onChange, true);
        this.element.value = this.stereo.volume;
      } else {
        this.element.addEventListener('click', this.handleTap, true);
      }

      this.stereo.on('volume-change', this.onStereoVolumeChange);
    }
  }

  unregisterListeners() {
    if (this.isRangeControl) {
      this.element.removeEventListener('change', this.onChange, true);
    } else {
      this.element.removeEventListener('click', this.handleTap, true);
    }
    this.stereo.off('volume-change', this.onStereoVolumeChange);
  }
}
