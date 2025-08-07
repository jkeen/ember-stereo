import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';
import { next } from '@ember/runloop';
import DidPanModifier from 'ember-gesture-modifiers/modifiers/did-pan';
import { registerDestructor } from '@ember/destroyable';
import { makeArray } from '@ember/array';

var _class, _descriptor;
let SoundPositionSliderModifier = (_class = class SoundPositionSliderModifier extends DidPanModifier {
  constructor() {
    super(...arguments);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "options", {});
    _defineProperty(this, "element", null);
    registerDestructor(this, this.unregisterListeners.bind(this));
  }
  get loadedSound() {
    return this.stereo.findSound(this.identifier);
  }
  get isRangeControl() {
    return this.element.tagName === 'INPUT' && this.element.type === 'range';
  }
  get duration() {
    return this.options?.duration || this.loadedSound?.duration || 0;
  }
  get position() {
    return this.options?.position || this.loadedSound?.position || 0;
  }
  get canChangePosition() {
    return this.options.duration && this.options.position || this.loadedSound && this.loadedSound.isFastForwardable && this.loadedSound.isRewindable;
  }
  onRangeControlChange(event) {
    let newPosition = this.duration * (parseInt(event.target.value, 10) / 100);
    if (this.isRangeControl) {
      this.updatePosition(newPosition);
    }
  }
  onPositionChange() {
    if (this.isRangeControl) {
      this.element.value = this.position / this.duration * 100;
    }
  }
  *afterLoadTask(callback = function () {}) {
    yield waitForProperty(this, 'url', v => v);
    yield waitForProperty(this, 'loadedSound', v => v);
    callback(this.loadedSound);
  }
  handleTap(e) {
    e.preventDefault();
    if (e.button === 1 || e.button === 2) {
      return; // ignore right/middle clicks
    }

    var rect = this.element.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.

    if (this.canChangePosition && this.element) {
      let positionPercentage = x / rect.width;
      let newPosition = parseFloat(this.duration * positionPercentage, 10);
      this.updatePosition(parseInt(newPosition, 10));
      next(() => {
        this.dragAdjustment = 0;
      });
    }
  }
  modify(element, [identifier], options) {
    this.options = options;
    this.triggers = makeArray(options.triggers || ['click', 'mousedown', 'tap']);
    if (this.identifier != identifier) {
      this.identifier = identifier;
    }
    if (!this.element) {
      this.element = element;
      if (this.isRangeControl) {
        this.element.setAttribute('max', 100);
        this.element.setAttribute('min', 0);
        this.element.setAttribute('value', 0);
        this.element.setAttribute('disabled', 'disabled');
      } else {
        this.triggers.forEach(trigger => {
          this.element.addEventListener(trigger, this.handleTap);
        });
      }
      this.element.setAttribute('data-sound-position-slider', true);
    }
    if (this.isRangeControl) {
      if (this.loadedSound) {
        this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
      }
      this.afterLoadTask.perform(sound => {
        sound.on('audio-position-changed', this.onPositionChange.bind(this));
        this.element.addEventListener('change', this.onRangeControlChange, true);
        if (sound.isSeekable) {
          this.element.removeAttribute('disabled');
        }
      }).catch(() => {});
    } else {
      super.removeEventListeners();
      super.threshold = 10;
      super.axis = 'horizontal';
      super.capture = false;
      super.preventScroll = false;
      super.pointerTypes = ['touch', 'mouse'];
      super.didPanStart = this.onPanStart.bind(this);
      super.didPan = this.onPan.bind(this);
      super.didPanEnd = this.onPanEnd.bind(this);
      super.addEventListeners();
    }
  }
  onPanStart() {}
  onPan(e) {
    if (this.canChangePosition && this.element) {
      var rect = this.element.getBoundingClientRect();
      let percentPosition = (e.current.x - rect.x) / rect.width;
      let actualPosition = Math.min(Math.max(percentPosition, 0.0001), 1) * this.duration;
      this.updatePosition(actualPosition);
    }
  }
  updatePosition(position) {
    if (this.loadedSound) {
      this.loadedSound.position = position;
    }
    if (this.options.onChangePosition) {
      this.options.onChangePosition(position);
    }
  }
  onPanEnd() {}
  unregisterListeners() {
    try {
      if (this.isRangeControl) {
        if (this.loadedSound) {
          this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        }
        this.element.removeEventListener('change', this.onRangeControlChange, true);
      } else {
        super.willRemove(...arguments);
        if (this.loadedSound) {
          this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        }
        this.triggers.forEach(trigger => {
          this.element.removeEventListener(trigger, this.handleTap);
        });
        this.element.removeEventListener('change', this.onRangeControlChange);
      }
    } catch (e) {
      /* geez, relax */
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "onRangeControlChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onRangeControlChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPositionChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPositionChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "afterLoadTask", [task], Object.getOwnPropertyDescriptor(_class.prototype, "afterLoadTask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleTap", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleTap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPanStart", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPanStart"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPan", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPan"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPanEnd", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPanEnd"), _class.prototype)), _class);

export { SoundPositionSliderModifier as default };
//# sourceMappingURL=sound-position-slider.js.map
