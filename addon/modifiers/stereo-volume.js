/**
  @class {{stereo-volume}}
  @type Modifier

  @method {{stereo-volume}}
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
      this.element.value = this.stereo.volume;
    }

    this.stereo.on('volume-change', this.onStereoVolumeChange);
    this.element.addEventListener('change', this.onChange, true);
  }

  willRemove() {
    this.stereo.off('volume-change', this.onStereoVolumeChange);
    this.element.removeEventListener('change', this.onChange, true);
  }
}
