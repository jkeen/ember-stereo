import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { service } from '@ember/service';
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

var _class, _descriptor;
const CAST_EVENTS = ['audio-cast-availability-changed', 'audio-cast-connected', 'audio-cast-disconnected'];

/**
 * `{{cast-button}}` turns an element into a cast control. Clicking it opens
 * the device picker for the current sound. The element stays disabled while
 * no cast target is available, and gets a `casting` class while connected.
 *
 * @class {{cast-button}}
 * @extends Modifier
 */
let CastButtonModifier = (_class = class CastButtonModifier extends Modifier {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "element", null);
    this._onClick = this._handleClick.bind(this);
    this._updateState = this._updateButtonState.bind(this);
    registerDestructor(this, () => this._cleanup());
  }
  modify(element) {
    this.element = element;
    this.stereo.ensureCastSdkSetup();
    if (!this._wired) {
      element.addEventListener('click', this._onClick);
      CAST_EVENTS.forEach(event => this.stereo.on(event, this._updateState));
      this._wired = true;
    }
    this._updateButtonState();
  }
  _handleClick(event) {
    event.preventDefault();
    if (this.stereo.isCastingAvailable) {
      this.stereo.showCastMenu();
    }
  }
  _updateButtonState() {
    let element = this.element;
    if (!element) {
      return;
    }
    element.disabled = !this.stereo.isCastingAvailable;
    element.classList.toggle('casting', this.stereo.isCasting);
  }
  _cleanup() {
    if (this.element) {
      this.element.removeEventListener('click', this._onClick);
    }
    CAST_EVENTS.forEach(event => this.stereo.off(event, this._updateState));
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { CastButtonModifier as default };
//# sourceMappingURL=cast-button.js.map
