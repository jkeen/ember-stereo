/**
 * This is the modifier used to transform an element into a position control, where clicking it will change a sound's position
 * ```hbs
  <div {{stereo-position @identifier}}>
  </div>
  ```
 *
  @class {{sound-position-slider}}
  @type Modifier
*/

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';
import { next } from '@ember/runloop';
import DidPanModifier from 'ember-gesture-modifiers/modifiers/did-pan';
export default class SoundPositionSliderModifier extends DidPanModifier {
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
    var rect = this.element.getBoundingClientRect();
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
    if (this.isRangeControl) {
      this.element.setAttribute('max', 100);
      this.element.setAttribute('min', 0);
      this.element.setAttribute('value', 0);
      this.element.setAttribute('disabled', 'disabled');
    } else {
      super.didInstall(...arguments);
      this.element.addEventListener('click', this.handleTap);
      this.element.addEventListener('mousedown', this.handleTap);
      this.element.addEventListener('tap', this.handleTap);
    }
    this.element.setAttribute('data-sound-position-slider', true)
  }


  @action
  onPanStart() {
  }

  @action
  onPan(e) {
    if (
      this.loadedSound &&
      this.loadedSound.isFastForwardable &&
      this.loadedSound.isRewindable &&
      this.element
    ) {
      var rect = this.element.getBoundingClientRect();
      let percentPosition = ((e.current.x - rect.x) / rect.width)
      let actualPosition = percentPosition * this.loadedSound.duration;
      this.loadedSound.position = actualPosition;
    }
  }

  @action
  onPanEnd() {
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
      super.removeEventListeners();

      super.threshold = 10;
      super.axis = 'horizontal';
      super.capture = false;
      super.preventScroll = false;
      super.pointerTypes = ['touch', 'mouse'];

      super.didPanStart = this.onPanStart.bind(this)
      super.didPan = this.onPan.bind(this)
      super.didPanEnd = this.onPanEnd.bind(this)

      super.addEventListeners();
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
        super.willRemove(...arguments);
        if (this.loadedSound) {
          this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        }
        this.element.removeEventListener('change', this.onChange);
        this.element.removeEventListener('click', this.handleTap);
        this.element.removeEventListener('tap', this.handleTap);
        this.element.removeEventListener('mousedown', this.handleTap);
      }
    } catch (e) { /* geez, relax */ }
  }
}
