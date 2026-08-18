import { tracked } from '@glimmer/tracking';
import { getOwner, setOwner } from '@ember/application';
import { makeArray } from '@ember/array';
import { task, timeout, forever, didCancel } from 'ember-concurrency';
import { TrackedSet } from 'tracked-built-ins';
import debug from 'debug';
import CastOutlet from './cast-outlet';
import SharedCastAccess from './shared-cast-access';
import SharedAudioAccess from './shared-audio-access';
import Strategy from './strategy';
import StereoUrl from './stereo-url';
import NativeAudioCasting from '../../stereo-connections/native-audio-casting';
import Chromecast from '../../stereo-connections/chromecast';

const log = debug('ember-stereo:cast');

export const CASTING_TYPE = {
  REMOTE_PLAYBACK_API: 'general',
  WEBKIT_AIRPLAY: 'airplay',
  CAST_SDK: 'chromecast',
};

const CAST_TARGET_SETTLE_MS = 1500;

/**
 * Everything casting, in one place. When a route engages it swaps the current
 * sound's connection for a cast one (the identity-stable Sound stays put), and
 * while casting it supplies the strategy that resolves new sounds to the device.
 *
 * @private
 * @hide
 * @class CastCoordinator
 */
export default class CastCoordinator {
  castingTypes = new TrackedSet();

  @tracked kind = null;
  @tracked isCasting = false;
  @tracked deviceName = null;

  access = new SharedCastAccess();

  outlet = new CastOutlet({
    onTargetChange: (isWireless) => this._onTargetChange(isWireless),
    onAvailabilityChange: (castingType, available) =>
      this._updateAvailability(castingType, available),
  });

  constructor(stereo) {
    this.stereo = stereo;
  }

  get isAvailable() {
    return this.castingTypes.size > 0;
  }

  // A browser only ever exposes one kind, so the control shows that kind's icon.
  get iconName() {
    let kind =
      this.kind ||
      (this.castingTypes.has(CASTING_TYPE.CAST_SDK)
        ? CASTING_TYPE.CAST_SDK
        : CASTING_TYPE.WEBKIT_AIRPLAY);
    return kind === CASTING_TYPE.CAST_SDK ? 'cast' : 'airplay';
  }

  _updateAvailability(castingType, available) {
    if (available) {
      this.castingTypes.add(castingType);
    } else {
      this.castingTypes.delete(castingType);
    }
    log(`cast availability: ${[...this.castingTypes]}`);
    this.stereo.trigger('audio-cast-availability-changed', {
      available: this.isAvailable,
    });
  }

  detectAvailabilityTask = task({ maxConcurrency: 1 }, async () => {
    try {
      this.outlet.watchAvailability();

      // A route may already exist on load (a reattached session).
      this._reconcileState();

      await forever;
    } finally {
      this.outlet.cancelWatchAvailability();
    }
  });

  ensureChromecastSetup() {
    this.access.ensureSetup({
      isAbandoned: () => this.stereo.isDestroyed,
      onAvailabilityChange: (available) =>
        this._updateAvailability(CASTING_TYPE.CAST_SDK, available),
      onSessionStarted: () => {
        this.kind = CASTING_TYPE.CAST_SDK;
        this.engageTask.perform().catch((e) => {
          if (!didCancel(e)) throw e;
        });
      },
      onSessionEnded: () => {
        this.disengageTask.perform().catch((e) => {
          if (!didCancel(e)) throw e;
        });
      },
    });
  }

  // Safari won't open a picker for an element with no parsed source, so load ahead of the click.
  prewarm(identifier) {
    this._loadOutlet(identifier);
  }

  // Must run synchronously inside the click gesture or else Safari blocks the picker
  showMenu(identifier) {
    if (!this.isAvailable) {
      return;
    }

    // The session the chooser starts drives engage via SESSION_STATE_CHANGED.
    if (this.castingTypes.has(CASTING_TYPE.CAST_SDK) && this.access.context) {
      this.access.requestSession();
      return;
    }

    this._loadOutlet(identifier);
    this.outlet.prime();
    this.outlet.showPicker();
  }

  stopCasting() {
    // SESSION_ENDED drives the disengage.
    if (this.kind === CASTING_TYPE.CAST_SDK && this.access.context) {
      this.access.endSession();
      return;
    }

    this.outlet.disconnect();
  }

  _castsWithoutOutlet() {
    return (
      this.castingTypes.has(CASTING_TYPE.CAST_SDK) &&
      !this.castingTypes.has(CASTING_TYPE.WEBKIT_AIRPLAY)
    );
  }

  _loadOutlet(identifier) {
    if (this._castsWithoutOutlet()) {
      return;
    }
    let sound = identifier
      ? this.stereo.findSound(identifier)
      : this.stereo.currentSound;
    let castUrl = sound?.castUrl;
    if (!castUrl) {
      return;
    }
    this.outlet.load(castUrl);
  }

  _onTargetChange(isWireless) {
    // Changing the outlet's src makes Safari drop then rebuild the AirPlay route.
    if (this._suppressTargetChanges) {
      log(
        `cast-target change ignored (programmatic outlet change): wireless=${isWireless}`
      );
      return;
    }
    log(
      `cast-target change: wireless=${isWireless} -> ${
        isWireless ? 'engage' : 'disengage'
      }`
    );
    if (isWireless) {
      this.kind = CASTING_TYPE.WEBKIT_AIRPLAY;
      this.engageTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    } else {
      this.disengageTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    }
  }

  _outletChangeDepth = 0;
  _settling = false;

  get _suppressTargetChanges() {
    return this._outletChangeDepth > 0 || this._settling;
  }

  beginOutletChange() {
    this._outletChangeDepth += 1;
    this._settling = true;
    this._settleTask.cancelAll();
  }

  endOutletChange() {
    this._outletChangeDepth = Math.max(0, this._outletChangeDepth - 1);
    if (this._outletChangeDepth === 0) {
      this._settleTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    }
  }

  _settleTask = task({ restartable: true }, async () => {
    await timeout(CAST_TARGET_SETTLE_MS);
    this._settling = false;
    this._reconcileState();
  });

  _reconcileState() {
    if (!this.outlet.hasElement || this._suppressTargetChanges) {
      return;
    }
    // Chromecast isn't element-based, so the webkit flag is always false here.
    if (this.kind === CASTING_TYPE.CAST_SDK) {
      return;
    }
    let actuallyCasting = this.outlet.isWirelesslyRouted;

    log(
      `reconcile cast state: actuallyCasting=${actuallyCasting} isCasting=${this.isCasting}`
    );

    if (actuallyCasting && !this.isCasting) {
      this.kind = CASTING_TYPE.WEBKIT_AIRPLAY;
      this.engageTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    } else if (!actuallyCasting && this.isCasting) {
      this.disengageTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    }
  }

  engageTask = task({ restartable: true }, async () => {
    this.isCasting = true;
    this.outlet.unmute();
    this.deviceName = this._deviceLabel();
    let sound = this.stereo.currentSound;
    log(
      `engaging cast -> ${
        sound?.castUrl ?? '(no current sound; route held, awaiting one)'
      }`
    );
    this.stereo.trigger('audio-cast-connecting', { sound });
    if (this._needsSwap(sound)) {
      let startTime = sound.isStream ? null : sound.position;
      let cast = this.buildCastConnection(sound.castUrl, sound.metadata, {
        startTime,
        autoplay: sound._explicitPlayIntent,
      });
      if (cast) {
        await sound.swap(cast);
      }
    }
    this.stereo.trigger('audio-cast-connected', { sound });
  });

  disengageTask = task({ restartable: true }, async () => {
    if (!this.isCasting) {
      return;
    }
    let sound = this.stereo.currentSound;
    let kind = this.kind;
    log(
      `disengaging cast (kind=${kind}, playIntent=${sound?._explicitPlayIntent})`
    );
    this.isCasting = false;
    this.deviceName = null;
    this.kind = null;

    if (sound && this.isCastConnection(sound.connection)) {
      if (kind === CASTING_TYPE.CAST_SDK) {
        let local = this.buildLocalConnection(sound);
        if (local) {
          await sound.swap(local);
        } else {
          sound.connection = null;
        }
      } else {
        if (sound._explicitPlayIntent && !sound.isPlaying) {
          sound.play();
        }
      }
    }

    this.stereo.trigger('audio-cast-disconnected', { sound });
  });

  _needsSwap(sound) {
    return !!sound?.castUrl && !this.isCastConnection(sound.connection);
  }

  // AirPlay/WebKit withholds the device name, so fall back to the kind.
  _deviceLabel() {
    if (this.kind === CASTING_TYPE.CAST_SDK) {
      return this.access.deviceName;
    }
    return 'AirPlay';
  }

  // Every NativeAudioCasting sound drives the route-holding outlet, not its own element.
  get sharedAudioAccess() {
    if (!this._sharedAudioAccess) {
      let access = new SharedAudioAccess();
      access.audioElement = this.outlet.element;
      this._sharedAudioAccess = access;
    }
    return this._sharedAudioAccess;
  }

  strategyFor(castUrl, metadata, startOptions = {}) {
    if (this.kind === CASTING_TYPE.CAST_SDK) {
      return this._chromecastStrategy(castUrl, metadata, startOptions);
    }
    return this._airplayStrategy(castUrl, metadata);
  }

  _airplayStrategy(castUrl, metadata) {
    let coordinator = this;
    let strategy = new Strategy(NativeAudioCasting, new StereoUrl(castUrl), {
      metadata,
      sharedAudioAccess: this.sharedAudioAccess,
      // Changing the routed element's src breaks the AirPlay route, so suppress cast-target events.
      options: {
        beginOutletChange: () => coordinator.beginOutletChange(),
        endOutletChange: () => coordinator.endOutletChange(),
      },
    });
    setOwner(strategy, getOwner(this));
    return strategy;
  }

  _chromecastStrategy(castUrl, metadata, { startTime, autoplay } = {}) {
    let strategy = new Strategy(Chromecast, new StereoUrl(castUrl), {
      metadata,
      options: {
        castAccess: this.access,
        startTime,
        autoplay,
      },
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

  // A missed disconnect can leave isCasting stuck true over a dead session, so require a live one.
  get _hasLiveSession() {
    return this.kind !== CASTING_TYPE.CAST_SDK || !!this.access.session;
  }

  shouldCastUrl(castUrl) {
    return this.isCasting && castUrl != null && this._hasLiveSession;
  }

  // A Chromecast connection from a prior feed no longer owns the shared session.
  isStaleCastConnection(connection) {
    return (
      this.kind === CASTING_TYPE.CAST_SDK &&
      connection?.connectionKey === Chromecast.key &&
      !this.access.hasControl(connection)
    );
  }

  _findLocalStrategy(strategies) {
    return (strategies || []).find(
      (candidate) => candidate.canPlay && !this.isCastConnection(candidate)
    );
  }

  buildLocalConnection(sound) {
    let strategy = this._findLocalStrategy(sound.strategies);
    // Cached strategies can be the cast-only list, or empty for a sound that adopted a cached connection.
    if (!strategy) {
      let strategies = this.stereo._buildStrategies(
        makeArray(sound._identifier),
        this.stereo.prepareLoadOptions(sound.options)
      );
      strategy = this._findLocalStrategy(strategies);
    }
    return strategy?.createConnection();
  }

  teardown() {
    this.engageTask.cancelAll();
    this.disengageTask.cancelAll();
    this._settleTask.cancelAll();
    this.detectAvailabilityTask.cancelAll();
    this.outlet.teardown();
  }
}
