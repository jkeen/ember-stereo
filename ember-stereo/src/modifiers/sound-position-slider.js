/**
 * This is the modifier used to transform an element into a position control, where clicking it will change a sound's position
 * ```hbs
  <div {{stereo-position @identifier}}>
  </div>
  ```
 *
  @class {{sound-position-slider}}
  @type Modifier
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @param {Integer} position
  @param {Integer} duration
  @param {callback} onChangePosition
  @param {triggers} array of tap triggers, defaults to 'click mousedown tap'

*/

import { action } from '@ember/object';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { next } from '@ember/runloop';
import DidPanModifier from 'ember-gesture-modifiers/modifiers/did-pan';
import { registerDestructor } from '@ember/destroyable';
import { makeArray } from '@ember/array';

// Replaces ember-concurrency's deprecated observer-based waitForProperty.
const SOUND_RESOLVE_POLL_MS = 100;

export default class SoundPositionSliderModifier extends DidPanModifier {
  @service stereo;
  options = {};
  element = null;

  constructor() {
    super(...arguments);
    registerDestructor(this, this.unregisterListeners.bind(this));
  }

  get sound() {
    return this.stereo.findSound(this.identifier);
  }

  get isRangeControl() {
    return this.element.tagName === 'INPUT' && this.element.type === 'range';
  }

  get duration() {
    return this.options?.duration || this.sound?.duration || 0;
  }

  get position() {
    return this.options?.position || this.sound?.position || 0;
  }

  get canChangePosition() {
    return (
      (this.options.duration && this.options.position) ||
      (this.sound && this.sound.isFastForwardable && this.sound.isRewindable)
    );
  }

  @action
  onRangeControlChange(event) {
    let newPosition = this.duration * (parseInt(event.target.value, 10) / 100);
    if (this.isRangeControl) {
      this.updatePosition(newPosition);
    }
  }

  @action
  onPositionChange() {
    if (this.isRangeControl) {
      this.element.value = (this.position / this.duration) * 100;
    }
  }

  afterLoadTask = task(async (callback = function () {}) => {
    while (!this.sound?.isResolved) {
      await timeout(SOUND_RESOLVE_POLL_MS);
    }
    callback(this.sound);
  });

  @action
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
    this.triggers = makeArray(
      options.triggers || ['click', 'mousedown', 'tap'],
    );

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
        this.triggers.forEach((trigger) => {
          this.element.addEventListener(trigger, this.handleTap);
        });
      }
      this.element.setAttribute('data-sound-position-slider', true);
    }

    if (this.isRangeControl) {
      if (this.sound) {
        this.sound.off('audio-position-changed', this.onPositionChange);
      }

      this.afterLoadTask
        .perform((sound) => {
          sound.on('audio-position-changed', this.onPositionChange);

          this.element.addEventListener(
            'change',
            this.onRangeControlChange,
            true,
          );
          if (sound.isSeekable) {
            this.element.removeAttribute('disabled');
          }
        })
        .catch(() => {});
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

  @action
  onPanStart() {}

  @action
  onPan(e) {
    if (this.canChangePosition && this.element) {
      var rect = this.element.getBoundingClientRect();
      let percentPosition = (e.current.x - rect.x) / rect.width;
      let actualPosition =
        Math.min(Math.max(percentPosition, 0.0001), 1) * this.duration;
      this.updatePosition(actualPosition);
    }
  }

  updatePosition(position) {
    if (this.sound) {
      this.sound.position = position;
    }
    if (this.options.onChangePosition) {
      this.options.onChangePosition(position);
    }
  }

  @action
  onPanEnd() {}

  unregisterListeners() {
    try {
      if (this.isRangeControl) {
        if (this.sound) {
          this.sound.off('audio-position-changed', this.onPositionChange);
        }
        this.element.removeEventListener(
          'change',
          this.onRangeControlChange,
          true,
        );
      } else {
        super.willRemove(...arguments);
        if (this.sound) {
          this.sound.off('audio-position-changed', this.onPositionChange);
        }
        this.triggers.forEach((trigger) => {
          this.element.removeEventListener(trigger, this.handleTap);
        });

        this.element.removeEventListener('change', this.onRangeControlChange);
      }
    } catch (e) {
      /* geez, relax */
    }
  }
}
