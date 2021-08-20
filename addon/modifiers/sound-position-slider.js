/**
  @class {{stereo-position-track}}
  @type Modifier

  @method {{stereo-position-track}}
*/

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';
import { next } from '@ember/runloop';
import Modifier from 'ember-modifier';

export default class SoundPositionSliderModifier extends Modifier {
  @service stereo;

  get url() {
    return this.args.positional[0]
  }

  get loadedSound() {
    return this.stereo.findSound(this.url)
  }

  get isRangeControl() {
    return this.element.tagName === "INPUT" && this.element.type === "range"
  }

  get options() {
    return this.args.named;
  }

  @action onChange(event) {
    if (this.isRangeControl) {
      this.loadedSound.position = this.loadedSound.duration * (parseInt(event.target.value, 10) / 100);
    }
  }

  @action onPositionChange() {
    if (this.isRangeControl) {
      this.element.value = (this.loadedSound.position / this.loadedSound.duration) * 100;
    }
  }

  @task
  *afterLoad(callback = function () { }) {
    yield waitForProperty(this, 'url', (v) => v);
    yield waitForProperty(this, 'loadedSound', (v) => v);
    callback(this.loadedSound)
  }

  @action
  handleTap(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.

    if (
      this.loadedSound &&
      this.loadedSound.isFastForwardable &&
      this.loadedSound.isRewindable &&
      this.element
    ) {
      let positionPercentage = x / rect.width;
      let newPosition = parseFloat(
        this.loadedSound.duration * positionPercentage,
        10
      );
      next(() => {
        this.loadedSound.position = parseInt(newPosition, 10);
        this.dragAdjustment = 0;
      });
    }
  }

  didInstall() {
    this.element.setAttribute('data-stereo-position-track', true)
    if (this.isRangeControl) {
      this.element.setAttribute('max', 100);
      this.element.setAttribute('min', 0);
      this.element.setAttribute('value', 0);
      this.element.setAttribute('disabled', 'disabled');
    } else {
      this.element.addEventListener('click', this.handleTap, true);
      this.element.addEventListener('mousedown', this.handleTap, true);
      this.element.addEventListener('tap', this.handleTap, true);
    }
  }

  didReceiveArguments() {
    if (this.isRangeControl) {
      this.afterLoad.perform(sound => {
        sound.on('audio-position-changed', this.onPositionChange.bind(this));

        this.element.addEventListener('change', this.onChange, true);
        if (sound.isSeekable) {
          this.element.removeAttribute('disabled');
        }
      }).catch(() => { })
    } else {
      this.afterLoad.perform(sound => {
        sound.on('audio-position-changed', this.onPositionChange.bind(this));

      }).catch(() => { });
    }
  }

  willRemove() {
    try {
      if (this.isRangeControl) {
        if (this.loadedSound) {
          this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        }
        this.element.removeEventListener('change', this.onChange, true);
      }
      else {
        if (this.loadedSound) {
          this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        }
        this.element.removeEventListener('change', this.onChange, true);
        this.element.removeEventListener('click', this.handleTap, true);
        this.element.removeEventListener('tap', this.handleTap, true);
        this.element.removeEventListener('mousedown', this.handleTap, true);
      }
    } catch (e) { /* geez, relax */ }
  }
}
