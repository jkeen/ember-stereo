import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';
import { next } from '@ember/runloop';
import DidPanModifier from 'ember-gesture-modifiers/modifiers/did-pan';
import { registerDestructor } from '@ember/destroyable';

var _class, _descriptor;
let SoundPositionSliderModifier = (_class = class SoundPositionSliderModifier extends DidPanModifier {
  constructor() {
    super(...arguments);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "element", null);
    registerDestructor(this, this.unregisterListeners.bind(this));
  }
  get isRangeControl() {
    return this.element.tagName === 'INPUT' && this.element.type === 'range';
  }
  onChange(event) {
    if (this.isRangeControl) {
      this.loadedSound.position = this.loadedSound.duration * (parseInt(event.target.value, 10) / 100);
    }
  }
  onPositionChange() {
    if (this.isRangeControl) {
      this.element.value = this.loadedSound.position / this.loadedSound.duration * 100;
    }
  }
  *afterLoadTask(callback = function () {}) {
    yield waitForProperty(this, 'url', v => v);
    yield waitForProperty(this, 'loadedSound', v => v);
    callback(this.loadedSound);
  }
  handleTap(e) {
    e.preventDefault();
    var rect = this.element.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.

    if (this.loadedSound && this.loadedSound.isFastForwardable && this.loadedSound.isRewindable && this.element) {
      let positionPercentage = x / rect.width;
      let newPosition = parseFloat(this.loadedSound.duration * positionPercentage, 10);
      next(() => {
        this.loadedSound.position = parseInt(newPosition, 10);
        this.dragAdjustment = 0;
      });
    }
  }
  get loadedSound() {
    return this.stereo.findSound(this.identifier);
  }
  modify(element, [identifier], options) {
    if (this.identifier != identifier) {
      this.identifier = identifier;
    }
    if (!this.element) {
      this.element = element;
      this.options = options;
      if (this.isRangeControl) {
        this.element.setAttribute('max', 100);
        this.element.setAttribute('min', 0);
        this.element.setAttribute('value', 0);
        this.element.setAttribute('disabled', 'disabled');
      } else {
        this.element.addEventListener('click', this.handleTap);
        this.element.addEventListener('mousedown', this.handleTap);
        this.element.addEventListener('tap', this.handleTap);
      }
      this.element.setAttribute('data-sound-position-slider', true);
    }
    if (this.isRangeControl && this.identifier !== identifier) {
      this.identifier = identifier;
      if (this.loadedSound) {
        this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
      }
      this.afterLoadTask.perform(sound => {
        sound.on('audio-position-changed', this.onPositionChange.bind(this));
        this.element.addEventListener('change', this.onChange, true);
        if (sound.isSeekable) {
          this.element.removeAttribute('disabled');
        }
      }).catch(() => {});
    } else if (this.identifier !== identifier) {
      this.identifier = identifier;
    }
    if (!this.isRangeControl) {
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
    if (this.loadedSound && this.loadedSound.isFastForwardable && this.loadedSound.isRewindable && this.element) {
      var rect = this.element.getBoundingClientRect();
      let percentPosition = (e.current.x - rect.x) / rect.width;
      let actualPosition = percentPosition * this.loadedSound.duration;
      this.loadedSound.position = actualPosition;
    }
  }
  onPanEnd() {}
  unregisterListeners() {
    try {
      if (this.isRangeControl) {
        if (this.loadedSound) {
          this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        }
        this.element.removeEventListener('change', this.onChange, true);
      } else {
        super.willRemove(...arguments);
        if (this.loadedSound) {
          this.loadedSound.off('audio-position-changed', this.onPositionChange.bind(this));
        }
        this.element.removeEventListener('change', this.onChange);
        this.element.removeEventListener('click', this.handleTap);
        this.element.removeEventListener('tap', this.handleTap);
        this.element.removeEventListener('mousedown', this.handleTap);
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
}), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPositionChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPositionChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "afterLoadTask", [task], Object.getOwnPropertyDescriptor(_class.prototype, "afterLoadTask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleTap", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleTap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPanStart", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPanStart"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPan", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPan"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPanEnd", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onPanEnd"), _class.prototype)), _class);

export { SoundPositionSliderModifier as default };
//# sourceMappingURL=sound-position-slider.js.map
