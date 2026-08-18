import debug from 'debug';
import isSameAudio from './is-same-audio';
import SILENT_SOURCE from './silent-source';

const log = debug('ember-stereo:cast-outlet');

const HOST_ID = 'ember-stereo-cast-outlet';

/**
 * The hidden `<audio x-webkit-airplay>` element that holds the AirPlay route,
 * outliving every sound. 
 *
 * @private
 * @hide
 * @class CastOutlet
 */
export default class CastOutlet {
  _element = null;
  _onWirelessChange = null;
  _onAvailabilityEvent = null;

  constructor({ onTargetChange, onAvailabilityChange }) {
    this.onTargetChange = onTargetChange;
    this.onAvailabilityChange = onAvailabilityChange;
  }

  get hasElement() {
    return !!this._element;
  }

  get element() {
    if (!this._element) {
      let element = document.createElement('audio');
      element.setAttribute('x-webkit-airplay', 'allow');
      element.setAttribute('crossorigin', 'anonymous');
      element.setAttribute('preload', 'metadata');
      element.setAttribute('src', SILENT_SOURCE);
      if ('disableRemotePlayback' in element) {
        element.disableRemotePlayback = false;
      }

      // Held so teardown can remove it. Otherwise the long-lived element pins its owner forever.
      this._onWirelessChange = () =>
        this.onTargetChange(!!element.webkitCurrentPlaybackTargetIsWireless);
      element.addEventListener(
        'webkitcurrentplaybacktargetiswirelesschanged',
        this._onWirelessChange
      );
      if (element.remote) {
        element.remote.onconnect = () => this.onTargetChange(true);
        element.remote.ondisconnect = () => this.onTargetChange(false);
      }

      if (element instanceof Node) {
        this._host().appendChild(element);
      }

      this._element = element;
    }
    return this._element;
  }

  _host() {
    let host = document.getElementById(HOST_ID);
    if (!host) {
      host = document.createElement('div');
      host.setAttribute('id', HOST_ID);
      host.setAttribute('aria-hidden', 'true');
      host.style.position = 'absolute';
      host.style.width = '1px';
      host.style.height = '1px';
      host.style.overflow = 'hidden';
      host.style.clip = 'rect(0 0 0 0)';
      host.style.pointerEvents = 'none';
      document.body.appendChild(host);
    }
    return host;
  }

  watchAvailability() {
    let element = this.element;
    if (
      element.remote &&
      typeof element.remote.watchAvailability === 'function'
    ) {
      element.remote.watchAvailability((available) =>
        this.onAvailabilityChange('general', available)
      );
    }

    if ('webkitShowPlaybackTargetPicker' in element) {
      this._onAvailabilityEvent = (event) =>
        this.onAvailabilityChange(
          'airplay',
          event.availability === 'available'
        );
      element.addEventListener(
        'webkitplaybacktargetavailabilitychanged',
        this._onAvailabilityEvent
      );
    }
  }

  cancelWatchAvailability() {
    this._element?.remote?.cancelWatchAvailability?.();
  }

  load(castUrl) {
    let element = this.element;
    let currentSrc = element.getAttribute('src');
    if (!isSameAudio(currentSrc, castUrl)) {
      element.setAttribute('src', castUrl);
      element.load();
    }
  }

  // Safari will not route an element that has never played.
  prime() {
    let element = this.element;
    if (element.paused) {
      element.muted = true;
      element.play().catch((error) => {
        log(`could not prime the outlet: ${error}`);
      });
    }
  }

  // Safari offers both, and only the WebKit picker routes x-webkit-airplay.
  showPicker() {
    let element = this.element;
    log(
      `cast picker: src=${element.getAttribute('src')} paused=${element.paused} readyState=${element.readyState} muted=${element.muted}`
    );
    if (typeof element.webkitShowPlaybackTargetPicker === 'function') {
      element.webkitShowPlaybackTargetPicker();
    } else if (typeof element.remote?.prompt === 'function') {
      element.remote.prompt().catch((error) => {
        log(`cast prompt error: ${error}`);
      });
    }
  }

  // WebKit has no programmatic disconnect, so re-open the picker for the user to disconnect there.
  disconnect() {
    let element = this.element;
    if (element.remote && typeof element.remote.disconnect === 'function') {
      element.remote.disconnect();
    } else if (typeof element.webkitShowPlaybackTargetPicker === 'function') {
      element.webkitShowPlaybackTargetPicker();
    }
  }

  unmute() {
    if (this._element) {
      this._element.muted = false;
    }
  }

  get isWirelesslyRouted() {
    let element = this._element;
    if (!element) {
      return false;
    }
    return (
      !!element.webkitCurrentPlaybackTargetIsWireless ||
      element.remote?.state === 'connected'
    );
  }

  teardown() {
    let element = this._element;
    if (!element) {
      return;
    }
    if (this._onWirelessChange) {
      element.removeEventListener(
        'webkitcurrentplaybacktargetiswirelesschanged',
        this._onWirelessChange
      );
      this._onWirelessChange = null;
    }
    if (this._onAvailabilityEvent) {
      element.removeEventListener(
        'webkitplaybacktargetavailabilitychanged',
        this._onAvailabilityEvent
      );
      this._onAvailabilityEvent = null;
    }
    if (element.remote) {
      element.remote.onconnect = null;
      element.remote.ondisconnect = null;
      element.remote.cancelWatchAvailability?.();
    }
    if (element instanceof Node) {
      element.remove();
    }
    this._element = null;
  }
}
