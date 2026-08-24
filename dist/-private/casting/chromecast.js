import { _ as _applyDecoratedDescriptor, b as _defineProperty, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { tracked } from '@glimmer/tracking';
import debug from 'debug';
import GoogleCastSdk from './google-cast-sdk.js';
import Strategy from '../utils/strategy.js';
import StereoUrl from '../utils/stereo-url.js';
import Chromecast from '../../stereo-connections/chromecast.js';

var _class, _descriptor, _descriptor2, _descriptor3;
const log = debug('ember-stereo:cast');

/**
 * The Chromecast driver. Google gives a page two ways to reach the same
 * device, the Remote Playback API on the audio element and the Cast SDK, and
 * choosing between them is this class's problem.
 *
 * @private
 * @hide
 * @class ChromecastDriver
 */
let ChromecastDriver = (_class = class ChromecastDriver {
  constructor({
    audioElement,
    onAvailabilityChange,
    onTargetChange,
    onSessionStarted,
    onSessionEnded,
    isAbandoned
  }) {
    _defineProperty(this, "type", 'chromecast');
    _defineProperty(this, "iconName", 'cast');
    _initializerDefineProperty(this, "remotePlaybackSeesDevices", _descriptor, this);
    _initializerDefineProperty(this, "sdkSeesDevices", _descriptor2, this);
    // The current session runs on the SDK rather than the audio element.
    _initializerDefineProperty(this, "sdkSession", _descriptor3, this);
    _defineProperty(this, "sdk", new GoogleCastSdk());
    this.audioElement = audioElement;
    this.onAvailabilityChange = onAvailabilityChange;
    this.onTargetChange = onTargetChange;
    this.onSessionStarted = onSessionStarted;
    this.onSessionEnded = onSessionEnded;
    this.isAbandoned = isAbandoned;
  }
  static supports(element) {
    return typeof element.remote?.watchAvailability === 'function';
  }
  get deviceAvailable() {
    return this.remotePlaybackSeesDevices || this.sdkSeesDevices;
  }
  watch() {
    let remote = this.audioElement.element.remote;
    remote.watchAvailability(available => {
      this.remotePlaybackSeesDevices = available;
      this.onAvailabilityChange();
    });
    remote.onconnect = () => this.onTargetChange(true);
    remote.ondisconnect = () => this.onTargetChange(false);
  }
  unwatch() {
    let remote = this.audioElement._element?.remote;
    if (!remote) {
      return;
    }
    remote.cancelWatchAvailability?.();
    remote.onconnect = null;
    remote.ondisconnect = null;
  }
  prepare() {
    this.sdk.ensureSetup({
      isAbandoned: this.isAbandoned,
      onAvailabilityChange: available => {
        this.sdkSeesDevices = available;
        this.onAvailabilityChange();
      },
      onSessionStarted: () => {
        this.sdkSession = true;
        this.onSessionStarted({
          usesLocalElement: false,
          deviceName: this.sdk.deviceName
        });
      },
      onSessionEnded: () => this.onSessionEnded()
    });
  }
  get canStartSdkSession() {
    return this.sdkSeesDevices && !!this.sdk.context;
  }
  get hasSdkSession() {
    return this.sdkSession && !!this.sdk.context;
  }
  get elementIsCasting() {
    return this.audioElement._element?.remote?.state === 'connected';
  }

  // An SDK session runs on SDK events and never shows on the audio element.
  get sessionAdoptable() {
    return !this.sdkSession;
  }

  // Remote Playback withholds the device name, so the session is labeled by its kind.
  elementSession() {
    this.sdkSession = false;
    return {
      usesLocalElement: true,
      deviceName: 'Chromecast'
    };
  }
  sessionEnded() {
    this.sdkSession = false;
  }

  // What a reattached session is already playing on the receiver.
  currentRemoteUrl() {
    let player = this.sdk.player;
    let states = window.chrome?.cast?.media?.PlayerState;
    if (!player?.mediaInfo || player.playerState === states?.IDLE) {
      return null;
    }
    return player.mediaInfo.contentId;
  }

  // A missed disconnect can leave the app thinking a dead SDK session is live.
  get hasLiveSession() {
    return !this.sdkSession || !!this.sdk.session;
  }

  // A Chromecast connection from a prior feed no longer owns the shared session.
  isStaleCastConnection(connection) {
    return this.sdkSession && connection?.connectionKey === Chromecast.key && !this.sdk.hasControl(connection);
  }
  showPicker() {
    if (this.canStartSdkSession) {
      log('requesting a Cast SDK session');
      this.sdk.requestSession();
    } else {
      log('showing the Remote Playback prompt');
      this.audioElement.prime();
      this.audioElement.element.remote.prompt().catch(error => {
        log(`cast prompt error: ${error}`);
      });
    }
  }
  stopCasting() {
    if (this.hasSdkSession) {
      this.sdk.endSession();
    } else {
      this.audioElement.element.remote.disconnect?.();
    }
  }
  strategyFor(castUrl, metadata, {
    startTime,
    autoplay
  } = {}, elementOptions) {
    if (this.sdkSession) {
      return new Strategy(Chromecast, new StereoUrl(castUrl), {
        metadata,
        options: {
          castAccess: this.sdk,
          startTime,
          autoplay
        }
      });
    }
    return this.audioElement.strategyFor(castUrl, metadata, elementOptions);
  }
  teardown() {
    this.unwatch();
    this.sdk.teardown();
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "remotePlaybackSeesDevices", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "sdkSeesDevices", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "sdkSession", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _class);

export { ChromecastDriver as default };
//# sourceMappingURL=chromecast.js.map
