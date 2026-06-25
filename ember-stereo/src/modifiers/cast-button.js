import { service } from '@ember/service';
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

// Service events that should refresh the button's enabled/casting state.
const CAST_EVENTS = [
  'audio-cast-availability-changed',
  'audio-cast-connected',
  'audio-cast-disconnected',
];

/**
 * `{{cast-button identifier}}` — turns an element into a cast control. Clicking
 * opens the device picker for the given sound (or the current sound); the
 * element is disabled while no cast target is available and gets a `casting`
 * class while a route is engaged.
 *
 * @class CastButtonModifier
 * @extends Modifier
 */
export default class CastButtonModifier extends Modifier {
  @service stereo;

  element = null;
  identifier = null;

  constructor(owner, args) {
    super(owner, args);
    this._onClick = this._handleClick.bind(this);
    this._updateState = this._updateButtonState.bind(this);
    registerDestructor(this, () => this._cleanup());
  }

  modify(element, positional) {
    this.element = element;
    this.identifier = positional[0];

    if (!this._wired) {
      element.addEventListener('click', this._onClick);
      CAST_EVENTS.forEach((event) => this.stereo.on(event, this._updateState));
      this._wired = true;
    }

    this._updateButtonState();
  }

  _handleClick(event) {
    event.preventDefault();
    if (this.stereo.isCastingAvailable) {
      this.stereo.showCastMenu(this.identifier);
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
    CAST_EVENTS.forEach((event) => this.stereo.off(event, this._updateState));
  }
}
