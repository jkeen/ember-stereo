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
  @tracked _debug = {};

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

  get metadata() {
    // Once resolved, defer to the connection so the Sound and its backend agree
    // (the connection keys metadata by its resolved url).
    if (this.value) {
      return this.value.metadata;
    }
    return this.stereo?.metadataCache?.find(this.identifier) ?? {};
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

  loadTask = task({ restartable: true }, async (loadOptions = {}) => {
    // Already resolved and healthy — behave like a cache hit.
    if (this.isResolved && !this.value.isErrored) {
      return this.value;
    }

    let options = this.stereo.prepareLoadOptions({
      ...this.options,
      ...loadOptions,
    });
    let urls = await this.stereo.urlCache.resolve(this.identifier);

    // Adopt a connection already loaded for these urls (shared sound cache)
    // rather than building a duplicate one.
    let cachedConnection = this.stereo.findLoadedSound(urls);
    if (cachedConnection) {
      this.value = cachedConnection;
      return cachedConnection;
    }

    if (!this.strategies) {
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
    outgoing?.detach();

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

      if (handoff.position != null && incoming.isSeekable) {
        incoming.position = handoff.position;
      }

      this.value = incoming;
      engaged = true;

      if (handoff.isPlaying) {
        await incoming.play();
      }

      this._handoff = null;
      return incoming;
    } finally {
      // The handoff is deliberately left in place for a superseding swap.
      if (!engaged && incoming && !incoming.isDestroyed) {
        incoming.detach();
      }
    }
  });

  _captureHandoff() {
    let connection = this.value;
    return {
      position: connection?.position,
      isPlaying: connection?.isPlaying ?? false,
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
    return this.value?.play(...args);
  }

  pause(...args) {
    return this.value?.pause(...args);
  }

  stop(...args) {
    return this.value?.stop(...args);
  }

  togglePause(...args) {
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
