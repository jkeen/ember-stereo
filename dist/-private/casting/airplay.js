import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import debug from 'debug';

const log = debug('ember-stereo:cast');

/**
 * The AirPlay driver: WebKit availability events, the WebKit picker, and
 * sessions carried on the audio element.
 *
 * @private
 * @hide
 * @class AirplayDriver
 */
class AirplayDriver {
  constructor({
    audioElement,
    onAvailabilityChange,
    onTargetChange
  }) {
    _defineProperty(this, "type", 'airplay');
    _defineProperty(this, "iconName", 'airplay');
    // WebKit reports `not-available` even when the picker can find receivers, so only the picker can answer this.
    _defineProperty(this, "deviceAvailable", true);
    this.audioElement = audioElement;
    this.onAvailabilityChange = onAvailabilityChange;
    this.onTargetChange = onTargetChange;
  }
  static supports(element) {
    return typeof element.webkitShowPlaybackTargetPicker === 'function';
  }
  watch() {
    let element = this.audioElement.element;
    this.onAvailabilityChange();
    this._targetChangeListener = () => this.onTargetChange(!!element.webkitCurrentPlaybackTargetIsWireless);
    element.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', this._targetChangeListener);
  }
  unwatch() {
    let element = this.audioElement._element;
    if (!element) {
      return;
    }
    if (this._targetChangeListener) {
      element.removeEventListener('webkitcurrentplaybacktargetiswirelesschanged', this._targetChangeListener);
      this._targetChangeListener = null;
    }
  }
  prepare() {}
  get elementIsCasting() {
    return !!this.audioElement._element?.webkitCurrentPlaybackTargetIsWireless;
  }
  get sessionAdoptable() {
    return true;
  }

  // AirPlay withholds the device name, so the session is labeled by its kind.
  elementSession() {
    return {
      usesLocalElement: true,
      deviceName: 'AirPlay'
    };
  }
  sessionEnded() {}

  // A fresh page's element carries only the silent source, so there is nothing to adopt.
  currentRemoteUrl() {
    return null;
  }
  get hasLiveSession() {
    return true;
  }
  isStaleCastConnection() {
    return false;
  }
  showPicker() {
    log('showing the AirPlay picker');
    this.audioElement.prime();
    this.audioElement.element.webkitShowPlaybackTargetPicker();
  }

  // WebKit has no programmatic disconnect, so re-open the picker for the user to disconnect there.
  stopCasting() {
    this.audioElement.element.webkitShowPlaybackTargetPicker();
  }
  strategyFor(castUrl, metadata, startOptions, elementOptions) {
    return this.audioElement.strategyFor(castUrl, metadata, elementOptions);
  }
  teardown() {
    this.unwatch();
  }
}

export { AirplayDriver as default };
//# sourceMappingURL=airplay.js.map
