import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';

/**
  A modifier to turn a range control into a volume control.
  ```hbs
    <input type="range" {{hifi-volume}}/>
  ```

  @class {{hifi-volume}}
  @type Helper
  @param {String} initialVolume
*/

export default class HifiControlModifier extends Modifier {
  @service hifi;

  get options() {
    return this.args.named;
  }

  onChange(e) {
    this.hifi.volume = e.currentTarget.value;
  }

  onVolumeChange(val) {
    this.element.value=val;
  }

  async didInstall() {
    this.element.setAttribute('min', 0);
    this.element.setAttribute('max', 100);
    this.element.addEventListener('change', this.onChange.bind(this), true);

    this.hifi.on('volume-change', this.onVolumeChange.bind(this));

    if (this.options.initialVolume) {
      this.hifi.volume = this.options.initialVolume;
    }
  }

  willRemove() {
    this.element.removeEventListener('change', this.onChange.bind(this), true);
  }
}



