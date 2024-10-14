import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import Modifier from 'ember-modifier';

var _class, _descriptor;
let StereoVolumeModifier = (_class = class StereoVolumeModifier extends Modifier {
  constructor() {
    super(...arguments);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "element", null);
    _defineProperty(this, "isDragging", false);
    registerDestructor(this, this.unregisterListeners.bind(this));
  }
  handleTap(e) {
    window.requestAnimationFrame(() => {
      e.preventDefault();
      var rect = this.element.getBoundingClientRect();
      // Check if the event is a touch event
      let x;
      if (e.type === 'touchmove') {
        x = e.touches[0].clientX - rect.left; // x position within the element for touch event
      } else {
        x = e.clientX - rect.left; // x position within the element for mouse click
      }

      let volumeLevel = parseInt(x / rect.width * 100, 10);
      this.setVolume(volumeLevel);
    });
  }
  onRangeChange(event) {
    this.setVolume(parseInt(event.target.value, 10));
    event.preventDefault();
  }
  setVolume(volume) {
    this.stereo.volume = Math.max(0, Math.min(100, volume));
  }
  updateRangeValue(volume) {
    this.element.value = volume;
  }
  handleDragStart() {
    this.isDragging = true;
    return false;
  }
  handleDragEnd() {
    this.isDragging = false;
    return false;
  }
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
      this.isRangeControl = element.tagName?.toLowerCase() === 'input' && element.type?.toLowerCase() === 'range';
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "handleTap", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleTap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onRangeChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onRangeChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateRangeValue", [action], Object.getOwnPropertyDescriptor(_class.prototype, "updateRangeValue"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDragStart", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleDragStart"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDragEnd", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleDragEnd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDrag", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleDrag"), _class.prototype)), _class);

export { StereoVolumeModifier as default };
//# sourceMappingURL=stereo-volume.js.map
