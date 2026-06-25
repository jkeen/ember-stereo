import { getOwner, setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { task, race, waitForProperty } from 'ember-concurrency';
import debug from 'debug';
import Evented from './evented';
import { EVENT_MAP } from './event-map';

/**
 * An identity-stable, lazy proxy for a playable url that delegates playback to
 * a concrete connection (a `BaseSound` subclass) in `value`.
 *
 * @class Sound
 * @private
 */
export default class Sound extends Evented {
  @tracked identifier;
  @tracked options;
  @tracked strategies;
  @tracked failures = [];
  @tracked _value = null;
  @tracked _volume;
  @tracked _castUrl = null;
  @tracked _debug = {};

  // Survives a backend swap. Only explicit pause/stop/togglePause clear it —
  // an involuntary pause (e.g. an AirPlay route drop) deliberately does not.
  _playIntent = false;

  // Bound event-relay handlers, keyed by event name, so the exact same
  // function reference can be passed to both `on` and `off`. Re-binding on
  // unregister (the previous bug) meant relays were never actually removed.
  _relayHandlers = new Map();

  constructor(identifier, options = {}) {
    super(...arguments);

    if (options.owner) {
      setOwner(this, options.owner);
    }

    this.identifier = identifier;
    this.options = options;

    if (options.metadata) {
      this.metadata = options.metadata;
    }
  }

  get stereo() {
    return getOwner(this)?.lookup('service:stereo');
  }

  get url() {
    return this.value?.url ?? this.identifier;
  }

  // A cast receiver fetches this itself, so it can't be an HLS/MSE stream; the
  // app supplies a natively-playable variant.
  get castUrl() {
    return this._castUrl ?? this.url;
  }

  set castUrl(value) {
    this._castUrl = value;
  }

  get value() {
    return this._value;
  }

  set value(connection) {
    debug('ember-stereo:sound')(
      `set value: ${connection?.connectionName} -> ${connection?.url}`
    );

    this._unregisterEventRelays(this._value);

    if (connection) {
      this._registerEventRelays(connection);
      if (this._volume != null) {
        connection._setVolume(this._volume);
      }
    }

    this._value = connection;
  }

  // --- Lifecycle state (owned by the Sound during the pre-resolution window) ---

  get isPending() {
    return isEmpty(this.value);
  }

  get isResolved() {
    return !isEmpty(this.value);
  }

  get isLoading() {
    return this.loadTask.isRunning || this.value?.isLoading || false;
  }

  get isErrored() {
    if (this.value) {
      return this.value.isErrored;
    }
    return Boolean(this.strategies) && !this.loadTask.isRunning && this.isPending;
  }

  get errors() {
    let strategyErrors = (this.failures || [])
      .map((strategy) => strategy.error)
      .filter(Boolean);

    return this.value?.error
      ? [...strategyErrors, this.value.error]
      : strategyErrors;
  }

  get error() {
    return this.value?.error;
  }

  // A cast connection carries no metadata — it's built with the castUrl, while
  // the app stored metadata under the playback identifier.
  get metadata() {
    if (this.value) {
      let connectionMetadata = this.value.metadata;
      if (connectionMetadata && Object.keys(connectionMetadata).length > 0) {
        return connectionMetadata;
      }
    }
    return this.stereo?.metadataCache?.find(this.identifier) ?? {};
  }

  get audioElement() {
    return this.value?.audioElement;
  }

  set metadata(value) {
    if (this.value) {
      this.value.metadata = value;
      return;
    }
    this.stereo?.metadataCache?.store(this.identifier, value);
  }

  // --- Loading ---

  load(loadOptions = {}) {
    return this.loadTask.perform(loadOptions);
  }

  // Does the resolved backend match the current cast state (cast while casting,
  // local while not)?
  _castStateMatches() {
    let valueIsCast = this.stereo._isCastConnection(this.value);
    return this.stereo.isCasting === valueIsCast;
  }

  loadTask = task({ restartable: true }, async (loadOptions = {}) => {
    let options = this.stereo.prepareLoadOptions({
      ...this.options,
      ...loadOptions,
    });

    // The app may hand us a device-fetchable cast URL alongside the playback
    // urls (it knows the live/archive variant). Keep it, and make it available
    // to the strategy builder even when it was set earlier (e.g. by prewarm)
    // rather than passed in these options.
    if (options.castUrl != null) {
      this._castUrl = options.castUrl;
    } else if (this._castUrl != null) {
      options.castUrl = this._castUrl;
    }

    if (this.isResolved && !this.value.isErrored) {
      if (this._castStateMatches()) {
        return this.value;
      }
      let target = this.stereo.isCasting
        ? options.castUrl
          ? this.stereo._buildCastConnection(options.castUrl, this.metadata)
          : null
        : this.stereo._buildLocalConnection(this);
      if (target) {
        return await this.swap(target);
      }
      return this.value;
    }

    let urls = await this.stereo.urlCache.resolve(this.identifier);

    // Not while casting: that must resolve through the cast strategy.
    if (!this.stereo.isCasting) {
      let cachedConnection = this.stereo.findLoadedSound(urls);
      if (cachedConnection) {
        this.value = cachedConnection;
        return cachedConnection;
      }
    }

    // Rebuild while casting so the cast strategy is (re)injected at the top.
    if (!this.strategies || this.stereo.isCasting) {
      this.strategies = this.stereo._buildStrategies(urls, options);
      this._debug = this.strategies;
    }

    // Retry-reset: clear prior attempt state so re-loading an errored Sound
    // actually retries instead of being a no-op.
    this.failures = [];
    this.strategies.forEach((strategy) => {
      strategy.tried = false;
      strategy.error = null;
      strategy.success = false;
    });

    for (let strategy of this.strategies) {
      if (!strategy.canPlay || strategy.tried) {
        continue;
      }

      strategy.tried = true;
      let connection = strategy.createSound();

      debug('ember-stereo:sound')(
        `TRYING: [${strategy.connectionName}] -> ${strategy.url}`
      );

      let { sound, error, erroredSound } = await race([
        this.waitForReadyTask.perform(connection),
        this.waitForErrorTask.perform(connection),
      ]);

      if (sound) {
        strategy.success = true;
        this.value = sound;
        this.stereo.soundCache.cache(sound);
        this.stereo.oneAtATime.register(sound);
        this.trigger('sound-ready', { sound });
        return sound;
      } else {
        strategy.error = error;
        strategy.erroredSound = erroredSound;
        this.failures = [...this.failures, strategy];
      }
    }

    return null;
  });

  waitForReadyTask = task(async (connection) => {
    await waitForProperty(connection, 'isReady');
    return { sound: connection };
  });

  waitForErrorTask = task(async (connection) => {
    await waitForProperty(connection, 'isErrored');
    return { error: connection.error, erroredSound: connection };
  });

  // --- The swap (connection A -> connection B, identity stays put) ---

  _swapGen = 0;
  _handoff = null;

  /**
   * Move this Sound to another connection, carrying over position and
   * play-state; a newer swap aborts the one in flight.
   *
   * @method swap
   * @param {String|BaseSound} target a connection key from this Sound's strategies, or a connection instance
   * @param {Object} [connectionArgs] constructor overrides for a key-built connection (e.g. `{ timeout: 10000 }`)
   * @return {Promise<BaseSound|null>} the engaged connection, or null if superseded/failed
   */
  swap(targetConnection) {
    return this.swapTask.perform(targetConnection);
  }

  swapTask = task({ restartable: true }, async (targetConnection) => {
    let generation = ++this._swapGen;

    // Reused rather than recaptured so rapid swaps keep the original
    // position/play-state instead of the torn-down connection's.
    let handoff = this._handoff ?? this._captureHandoff();
    this._handoff = handoff;

    let outgoing = this.value;
    // Drop the relays before detaching, so teardown pause/ended events never
    // reach the Sound.
    this.value = null;
    // Stop the outgoing's audible playback before releasing it, or it keeps
    // playing alongside the new backend (a local stream bleeding under a cast).
    // detach()/teardown() alone don't pause the element, and pause() can fail to
    // stop a shared element — so also pause the element directly. Each step is
    // independently guarded: a throw in one must not skip the others (and must
    // not abort the swap).
    let outgoingElement = outgoing?.audioElement;
    try {
      outgoing?.pause?.();
    } catch (e) {
      debug('ember-stereo:sound')(`outgoing pause errored: ${e?.message}`);
    }
    try {
      outgoingElement?.pause?.();
    } catch (e) {
      debug('ember-stereo:sound')(`outgoing element pause errored: ${e?.message}`);
    }
    try {
      outgoing?.detach?.();
    } catch (e) {
      debug('ember-stereo:sound')(`outgoing detach errored: ${e?.message}`);
    }

    let incoming = targetConnection;
    let engaged = false;

    try {
      let { sound } = await race([
        this.waitForReadyTask.perform(incoming),
        this.waitForErrorTask.perform(incoming),
      ]);

      // Incoming failed to load, or a newer swap superseded this one.
      if (!sound || generation !== this._swapGen) {
        return null;
      }

      if (handoff.position != null) {
        if (incoming.isSeekable) {
          incoming.position = handoff.position;
        } else if (typeof incoming.seedPosition === 'function') {
          // A live stream can't seek, but seeding its clock keeps elapsed time
          // continuous instead of restarting from zero.
          incoming.seedPosition(handoff.position);
        }
      }

      this.value = incoming;
      engaged = true;

      this.stereo?.soundCache?.cache(incoming);
      this.stereo?.oneAtATime?.register(incoming);

      if (handoff.isPlaying) {
        await incoming.play();
      }

      this._handoff = null;
      return incoming;
    } finally {
      // The handoff is deliberately left in place for a superseding swap.
      if (!engaged && incoming && !incoming.isDestroyed) {
        try {
          incoming.detach();
        } catch (e) {
          debug('ember-stereo:sound')(`incoming detach errored: ${e?.message}`);
        }
      }
    }
  });

  _captureHandoff() {
    let connection = this.value;
    return {
      position: connection?.position,
      // Intent, not live isPlaying: a route drop pauses the outgoing
      // connection, but the swapped-in backend should still resume.
      isPlaying: this._playIntent,
    };
  }

  // --- Event relay (connection -> Sound) ---

  _registerEventRelays(connection) {
    if (!connection) {
      return;
    }

    EVENT_MAP.forEach(({ event }) => {
      let handler = (info) => this._relayEvent(event, info);
      this._relayHandlers.set(event, handler);
      connection.on(event, handler);
    });
  }

  _relayEvent(eventName, info = {}) {
    if (eventName === 'audio-played') {
      this._playIntent = true;
    }
    this.trigger(eventName, { ...info, sound: this });
  }

  _unregisterEventRelays(connection) {
    if (!connection) {
      return;
    }

    EVENT_MAP.forEach(({ event }) => {
      let handler = this._relayHandlers.get(event);
      if (handler) {
        try {
          connection.off(event, handler);
        } catch (e) {
          // unregistering errors are not important
        }
        this._relayHandlers.delete(event);
      }
    });
  }

  // --- Proxied playback methods/state (delegated to the connection) ---

  play(...args) {
    this._playIntent = true;
    return this.value?.play(...args);
  }

  pause(...args) {
    this._playIntent = false;
    return this.value?.pause(...args);
  }

  stop(...args) {
    this._playIntent = false;
    return this.value?.stop(...args);
  }

  togglePause(...args) {
    this._playIntent = !this.isPlaying;
    return this.value?.togglePause(...args);
  }

  rewind(...args) {
    return this.value?.rewind(...args);
  }

  fastForward(...args) {
    return this.value?.fastForward(...args);
  }

  seek(...args) {
    return this.value?.seek(...args);
  }

  hasUrl(...args) {
    return this.value?.hasUrl(...args);
  }

  urlsAreEqual(...args) {
    return this.value?.urlsAreEqual?.(...args);
  }

  _setVolume(volume) {
    this._volume = volume;
    this.value?._setVolume(volume);
  }

  get position() {
    return this.value?.position;
  }

  set position(value) {
    if (this.value) {
      this.value.position = value;
    }
  }

  get duration() {
    return this.value?.duration;
  }

  get currentTime() {
    return this.value?.currentTime;
  }

  get startTime() {
    return this.value?.startTime;
  }

  get endTime() {
    return this.value?.endTime;
  }

  get percentLoaded() {
    return this.value?.percentLoaded;
  }

  get isBlocked() {
    return this.value?.isBlocked;
  }

  set isBlocked(value) {
    if (this.value) {
      this.value.isBlocked = value;
    }
  }

  get isReady() {
    return this.value?.isReady;
  }

  get isPlaying() {
    return this.value?.isPlaying;
  }

  get isPaused() {
    return this.value?.isPaused;
  }

  get isLoaded() {
    return this.value?.isLoaded;
  }

  get hasPlayed() {
    return this.value?.hasPlayed;
  }

  get mimeType() {
    return this.value?.mimeType;
  }

  get isStream() {
    return this.value?.isStream;
  }

  get isRewindable() {
    return this.value?.isRewindable;
  }

  get isFastForwardable() {
    return this.value?.isFastForwardable;
  }

  get isSeekable() {
    return this.value?.isSeekable;
  }

  get id3Tags() {
    return this.value?.id3Tags;
  }

  get id3TagMetadata() {
    return this.value?.id3TagMetadata;
  }

  get connectionName() {
    return this.value?.connectionName;
  }

  get connectionKey() {
    return this.value?.connectionKey;
  }
}
