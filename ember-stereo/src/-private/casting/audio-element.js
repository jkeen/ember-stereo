import debug from 'debug';
import SharedAudioAccess from '../utils/shared-audio-access';
import SILENT_SOURCE from '../utils/silent-source';
import Strategy from '../utils/strategy';
import StereoUrl from '../utils/stereo-url';
import NativeAudioCasting from '../../stereo-connections/native-audio-casting';

const log = debug('ember-stereo:cast');

const HOST_ID = 'ember-stereo-cast-audio-element';

/**
 * The hidden `<audio x-webkit-airplay>` element the browser routes to a cast device, outliving every sound.
 *
 * @private
 * @hide
 * @class CastAudioElement
 */
export default class CastAudioElement {
  _element = null;
  _access = null;

  constructor({ createElement } = {}) {
    this._createElement =
      createElement ?? (() => document.createElement('audio'));
  }

  get hasElement() {
    return !!this._element;
  }

  // Every NativeAudioCasting sound drives this element, not one of its own.
  get sharedAudioAccess() {
    if (!this._access) {
      this._access = new SharedAudioAccess();
      this._access.audioElement = this.element;
    }
    return this._access;
  }

  get element() {
    if (!this._element) {
      let element = this._createElement();
      element.setAttribute('x-webkit-airplay', 'allow');
      element.setAttribute('preload', 'metadata');
      element.setAttribute('src', SILENT_SOURCE);
      if ('disableRemotePlayback' in element) {
        element.disableRemotePlayback = false;
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

  strategyFor(castUrl, metadata, { onSourceChange } = {}) {
    return new Strategy(NativeAudioCasting, new StereoUrl(castUrl), {
      metadata,
      sharedAudioAccess: this.sharedAudioAccess,
      options: { onSourceChange },
    });
  }

  // Safari will not route an element that has never played.
  prime() {
    let element = this.element;
    if (element.paused) {
      element.muted = true;
      element.play().catch((error) => {
        log(`could not prime the element: ${error}`);
      });
    }
  }

  unmute() {
    if (this._element) {
      this._element.muted = false;
    }
  }

  teardown() {
    let element = this._element;
    if (typeof Node !== 'undefined' && element instanceof Node) {
      element.remove();
    }
    this._element = null;
    this._access = null;
  }
}
