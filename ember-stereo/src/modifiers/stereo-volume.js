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

  @action
  handleTap(e) {
    e.preventDefault();
    var rect = this.element.getBoundingClientRect();
    // Check if the event is a touch event
    let x;
    if (e.type === 'touchmove') {
      x = e.touches[0].clientX - rect.left; // x position within the element for touch event
    } else {
      x = e.clientX - rect.left; // x position within the element for mouse click
    }
    let volumeLevel = parseInt((x / rect.width) * 100, 10);
    this.setVolume(volumeLevel)
  }

  @action
  onRangeChange(event) {
    this.setVolume(parseInt(event.target.value, 10))
    event.preventDefault();
  }

  setVolume(volume) {
    this.stereo.volume = Math.max(0, Math.min(100, volume))
  }

  @action
  updateRangeValue(volume) {
    this.element.value = volume;
  }

  isDragging = false;

  @action
  handleDragStart(event) {
    this.isDragging = true;
    event.preventDefault();
    return false;
  }

  @action
  handleDragEnd(event) {
    this.isDragging = false;
    event.preventDefault();
    return false;
  }

  @action
  handleDrag(event) {
    if (!this.isDragging) {
      return;
    }
    this.handleTap(event);
  }

  modify(element, [eventName], options) {
    if (!this.element) {
      this.element = element;
      this.eventName = eventName;
      this.options = options;
      this.isRangeControl =
        element.tagName?.toLowerCase() === 'input' &&
        element.type?.toLowerCase() === 'range';

      if (this.isRangeControl) {
        this.element.setAttribute('max', 100);
        this.element.setAttribute('min', 0);
        this.element.addEventListener('change', this.onRangeChange);
        this.element.addEventListener('input', this.onRangeChange);
        this.element.value = this.stereo.volume;
        this.stereo.on('volume-change', this.updateRangeValue);
      } else {
        this.element.addEventListener('click', this.handleTap);
        this.element.addEventListener('tap', this.handleTap);

        this.element.addEventListener('drag', this.handleDrag);
        this.element.addEventListener('mousemove', this.handleDrag);
        this.element.addEventListener('touchmove', this.handleDrag);

        this.element.addEventListener('dragstart', this.handleDragStart);
        this.element.addEventListener('mousedown', this.handleDragStart);
        this.element.addEventListener('touchstart', this.handleDragStart);

        this.element.addEventListener('dragend', this.handleDragEnd);
        document.addEventListener('mouseup', this.handleDragEnd);
        document.addEventListener('touchend', this.handleDragEnd);

        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('touchmove', this.handleDrag);
      }
    }
  }

  unregisterListeners() {
    if (this.isRangeControl) {
      this.element.removeEventListener('change', this.onChange, true);
      this.element.removeEventListener('input', this.onRangeChange);
      this.stereo.off('volume-change', this.updateRangeValue);
    } else {
      this.element.removeEventListener('click', this.handleTap);
      this.element.removeEventListener('tap', this.handleTap);

      this.element.removeEventListener('drag', this.handleDrag);
      this.element.removeEventListener('mousemove', this.handleDrag);
      this.element.removeEventListener('touchmove', this.handleDrag);

      this.element.removeEventListener('dragstart', this.handleDragStart);
      this.element.removeEventListener('mousedown', this.handleDragStart);
      this.element.removeEventListener('touchstart', this.handleDragStart);

      this.element.removeEventListener('dragend', this.handleDragEnd);
      document.removeEventListener('mouseup', this.handleDragEnd);
      document.removeEventListener('touchend', this.handleDragEnd);

      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('touchmove', this.handleDrag);
    }
  }
}
