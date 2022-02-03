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

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';
export default class StereoVolumeModifier extends Modifier {
  @service stereo;

  get eventName() {
    return this.args.positional[0];
  }

  get isRangeControl() {
    return this.element.tagName === "INPUT" && this.element.type === "range"
  }

  get options() {
    return this.args.named;
  }


  @action
  handleTap(e) {
    e.preventDefault();

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    let volumeLevel = parseInt((x / rect.width) * 100, 10)
    this.stereo.volume = volumeLevel;
  }

  @action onChange(event) {
    if (this.isRangeControl) {
      let volumeLevel = parseInt(event.target.value, 10);
      this.stereo.volume = volumeLevel;
    }
  }

  @action onStereoVolumeChange(volume) {
    this.element.value = volume
  }

  didInstall() {
    if (this.isRangeControl) {
      this.element.setAttribute('max', 100);
      this.element.setAttribute('min', 0);
      this.element.addEventListener('change', this.onChange, true);
      this.element.value = this.stereo.volume;
    }
    else {
      this.element.addEventListener('click', this.handleTap, true);
    }

    this.stereo.on('volume-change', this.onStereoVolumeChange);
  }

  willRemove() {
    if (this.isRangeControl) {
      this.element.removeEventListener('change', this.onChange, true);
    } else {
      this.element.removeEventListener('click', this.handleTap, true);
    }
    this.stereo.off('volume-change', this.onStereoVolumeChange);
  }
}
