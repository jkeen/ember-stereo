import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { tracked } from '@glimmer/tracking';
import { setOwner, getOwner } from '@ember/application';
import { makeArray } from '@ember/array';
import { forever, timeout, didCancel } from 'ember-concurrency';
import debug from 'debug';
import CastAudioElement from './audio-element.js';
import AirplayDriver from './airplay.js';
import ChromecastDriver from './chromecast.js';
import NativeAudioCasting from '../../stereo-connections/native-audio-casting.js';
import Chromecast from '../../stereo-connections/chromecast.js';

var _class, _descriptor, _descriptor2, _descriptor3;
const log = debug('ember-stereo:cast');
const CAST_TARGET_SETTLE_MS = 4000;
const DRIVERS = [AirplayDriver, ChromecastDriver];

/**
 * @private
 * @hide
 * @class CastCoordinator
 */
let CastCoordinator = (_class = class CastCoordinator {
  constructor(stereo) {
    _initializerDefineProperty(this, "isCasting", _descriptor, this);
    _initializerDefineProperty(this, "deviceName", _descriptor2, this);
    // The engaged session: { usesLocalElement, deviceName }, or null.
    _initializerDefineProperty(this, "_session", _descriptor3, this);
    _defineProperty(this, "audioElement", new CastAudioElement());
    _defineProperty(this, "_driver", undefined);
    _defineProperty(this, "detectAvailabilityTask", buildTask(() => ({
      context: this,
      generator: function* () {
        let driver = this.activeDriver;
        if (!driver) {
          return;
        }
        try {
          driver.watch();

          // A device may already be connected on load (a reattached session).
          this._adoptElementState();
          yield forever;
        } finally {
          driver.unwatch();
        }
      }
    }), {
      maxConcurrency: 1
    }, "detectAvailabilityTask", null));
    _defineProperty(this, "ignoreTargetChangesTask", buildTask(() => ({
      context: this,
      generator: function* () {
        yield timeout(CAST_TARGET_SETTLE_MS);
        this._adoptElementState();
      }
    }), {
      restartable: true
    }, "ignoreTargetChangesTask", null));
    _defineProperty(this, "engageTask", buildTask(() => ({
      context: this,
      generator: function* () {
        this.isCasting = true;
        this.audioElement.unmute();
        this.deviceName = this._session?.deviceName ?? null;
        let sound = this.stereo.currentSound ?? (yield this._adoptRemoteMedia());
        log(`engaging cast -> ${sound?.castUrl ?? '(no current sound yet, holding the device)'}`);
        this.stereo.trigger('audio-cast-connecting', {
          sound
        });
        if (this._needsSwap(sound)) {
          let startTime = sound.isStream ? null : sound.position;
          let cast = this.buildCastConnection(sound.castUrl, sound.metadata, {
            startTime,
            autoplay: sound._explicitPlayIntent
          });
          if (cast) {
            yield sound.swap(cast);
          }
        }
        this.stereo.trigger('audio-cast-connected', {
          sound
        });
      }
    }), {
      restartable: true
    }, "engageTask", null));
    _defineProperty(this, "disengageTask", buildTask(() => ({
      context: this,
      generator: function* () {
        if (!this.isCasting) {
          return;
        }
        let sound = this.stereo.currentSound;
        let session = this._session;
        log(`disengaging cast (usesLocalElement=${session?.usesLocalElement}, playIntent=${sound?._explicitPlayIntent})`);
        this.isCasting = false;
        this.deviceName = null;
        this._session = null;
        this.activeDriver?.sessionEnded();
        if (sound && this.isCastConnection(sound.connection)) {
          if (session && !session.usesLocalElement) {
            let local = this.buildLocalConnection(sound);
            if (local) {
              yield sound.swap(local);
            } else {
              sound.connection = null;
            }
          } else {
            if (sound._explicitPlayIntent && !sound.isPlaying) {
              sound.play();
            }
          }
        }
        this.stereo.trigger('audio-cast-disconnected', {
          sound
        });
      }
    }), {
      restartable: true
    }, "disengageTask", null));
    this.stereo = stereo;
  }
  // A browser only ever has one way to cast, or none.
  get activeDriver() {
    if (this._driver === undefined) {
      this._driver = this._selectDriver();
    }
    return this._driver;
  }
  _selectDriver() {
    if (typeof document === 'undefined') {
      return null;
    }
    let element = this.audioElement.element;
    let DriverClass = DRIVERS.find(Driver => Driver.supports(element));
    if (!DriverClass) {
      return null;
    }
    return new DriverClass({
      audioElement: this.audioElement,
      onAvailabilityChange: () => this._announceAvailability(),
      onTargetChange: isCasting => this._onTargetChange(isCasting),
      onSessionStarted: session => this._onSessionStarted(session),
      onSessionEnded: () => this._onSessionEnded(),
      isAbandoned: () => this.stereo.isDestroyed
    });
  }
  get isAvailable() {
    return !!this.activeDriver?.deviceAvailable;
  }
  get iconName() {
    if (!this.isAvailable) {
      return null;
    }
    return this.activeDriver.iconName;
  }
  get supportedCastType() {
    return this.activeDriver?.type ?? null;
  }
  get castKind() {
    return this.isCasting ? this.supportedCastType : null;
  }
  _announceAvailability() {
    log(`cast availability: ${this.isAvailable}`);
    this.stereo.trigger('audio-cast-availability-changed', {
      available: this.isAvailable
    });
  }
  ensureCastSdkSetup() {
    this.activeDriver?.prepare();
  }
  showMenu() {
    if (!this.isAvailable) {
      return;
    }
    // Must run synchronously inside the click gesture or else the browser blocks the picker.
    this.activeDriver.showPicker();
  }
  stopCasting() {
    this.activeDriver?.stopCasting();
  }
  _onTargetChange(isCasting) {
    if (this._ignoringTargetChanges) {
      log(`cast-target change ignored (we changed the source): ${isCasting}`);
      return;
    }
    log(`cast-target change: casting=${isCasting} -> ${isCasting ? 'engage' : 'disengage'}`);
    if (isCasting) {
      this._onSessionStarted(this.activeDriver.elementSession());
    } else {
      this._onSessionEnded();
    }
  }
  _onSessionStarted(session) {
    this._session = session;
    this.engageTask.perform().catch(e => {
      if (!didCancel(e)) throw e;
    });
  }
  _onSessionEnded() {
    this.disengageTask.perform().catch(e => {
      if (!didCancel(e)) throw e;
    });
  }
  get _ignoringTargetChanges() {
    return this.ignoreTargetChangesTask.isRunning;
  }
  ignoreTargetChanges() {
    this.ignoreTargetChangesTask.perform().catch(e => {
      if (!didCancel(e)) throw e;
    });
  }
  _adoptElementState() {
    let driver = this.activeDriver;
    if (!driver || !this.audioElement.hasElement || !driver.sessionAdoptable) {
      return;
    }
    let actuallyCasting = driver.elementIsCasting;
    log(`reconcile cast state: actuallyCasting=${actuallyCasting} isCasting=${this.isCasting}`);
    if (actuallyCasting && !this.isCasting) {
      this._onSessionStarted(driver.elementSession());
    } else if (!actuallyCasting && this.isCasting) {
      this._onSessionEnded();
    }
  }
  _needsSwap(sound) {
    return !!sound?.castUrl && !this.isCastConnection(sound.connection);
  }

  // A reattached session may already be playing something no Sound on this page knows about.
  async _adoptRemoteMedia() {
    let remoteUrl = this.activeDriver?.currentRemoteUrl();
    if (!remoteUrl) {
      return null;
    }
    log(`adopting remote media -> ${remoteUrl}`);
    let {
      sound
    } = await this.stereo.load(remoteUrl);
    return sound ?? null;
  }
  strategyFor(castUrl, metadata, startOptions = {}) {
    let strategy = this.activeDriver.strategyFor(castUrl, metadata, startOptions,
    // Changing the element's src breaks its connection, so suppress cast-target events.
    {
      onSourceChange: () => this.ignoreTargetChanges()
    });
    setOwner(strategy, getOwner(this));
    return strategy;
  }
  buildCastConnection(castUrl, metadata, startOptions) {
    return this.strategyFor(castUrl, metadata, startOptions).createConnection();
  }
  isCastConnection(connection) {
    let key = connection?.connectionKey;
    return key === NativeAudioCasting.key || key === Chromecast.key;
  }
  shouldCastUrl(castUrl) {
    return this.isCasting && castUrl != null && !!this.activeDriver?.hasLiveSession;
  }
  isStaleCastConnection(connection) {
    return !!this.activeDriver?.isStaleCastConnection(connection);
  }
  _findLocalStrategy(strategies) {
    return (strategies || []).find(candidate => candidate.canPlay && !this.isCastConnection(candidate));
  }
  buildLocalConnection(sound) {
    let strategy = this._findLocalStrategy(sound.strategies);
    // Cached strategies can be the cast-only list, or empty for a sound that adopted a cached connection.
    if (!strategy) {
      let strategies = this.stereo._buildStrategies(makeArray(sound._identifier), this.stereo.prepareLoadOptions(sound.options));
      strategy = this._findLocalStrategy(strategies);
    }
    return strategy?.createConnection();
  }
  teardown() {
    this.engageTask.cancelAll();
    this.disengageTask.cancelAll();
    this.ignoreTargetChangesTask.cancelAll();
    this.detectAvailabilityTask.cancelAll();
    this.activeDriver?.teardown();
    this.audioElement.teardown();
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isCasting", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "deviceName", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_session", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _class);

export { CastCoordinator as default };
//# sourceMappingURL=coordinator.js.map
