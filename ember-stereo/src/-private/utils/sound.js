import { getOwner, setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { task, race, waitForProperty } from 'ember-concurrency';
import debug from 'debug';
import Evented from './evented';
import { EVENT_MAP } from './event-map';

/**
 * A Sound is an identity-stable, lazy proxy for a playable url. It owns the
 * url identity, the strategy waterfall, and the lifecycle state that exists
 * *before* a connection is loaded; it delegates all playback to a concrete
 * connection (a `BaseSound` subclass) stored in `value`. The connection
 * remains the backend — nothing in it is reimplemented here.
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

  // The *intended* play state, owned by the identity-stable Sound so it survives
  // a backend swap. Updated by explicit play/pause/togglePause and by a real
  // audio-played — but NOT by a backend's involuntary pause (e.g. an AirPlay
  // route drop pausing the outlet element). The swap restores this, so play
  // state is preserved across engage/disengage instead of following whichever
  // connection happened to be paused at handoff time.
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
    // Once resolved, report the connection's resolved url so the Sound and its
    // backend agree (the raw identifier may be relative or a promise/function).
    return this.value?.url ?? this.identifier;
  }

  // The device-fetchable URL to hand an AirPlay/cast outlet, which differs from
  // the playback url: an HLS/MSE stream can't be cast, so casting plays a public
  // (live) or token-signed (archive) variant natively on the device. Supplied by
  // the app (it knows the variant); defaults to the playback url for plain files.
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
    // Pending: errored once a load attempt has run to completion without
    // resolving a connection (covers both "no playable strategy" and
    // "every strategy tried and failed").
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
    // (the connection keys metadata by its resolved url). But a cast connection
    // is keyed by the cast url, which has no metadata of its own — fall back to
    // the identifier (the playback url the app keyed metadata under). Never
    // null/undefined — consumers destructure it (e.g. now-playing).
    if (this.value) {
      let connectionMetadata = this.value.metadata;
      if (connectionMetadata && Object.keys(connectionMetadata).length > 0) {
        return connectionMetadata;
      }
    }
    return this.stereo?.metadataCache?.find(this.identifier) ?? {};
  }

  // The backing media element, when the connection exposes one (NativeAudio, the
  // AirPlay outlet). Delegated so consumers that reach for it off a relayed event
  // — e.g. the visualizer's `sound.audioElement` — get the connection's element
  // rather than `undefined` on the proxy.
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
  // local while not)? A cast value left over from a prior feed (stale) counts as
  // a mismatch so it re-resolves to a fresh cast connection.
  _castStateMatches() {
    let valueIsCast = this.stereo._isCastConnection(this.value);
    if (this.stereo.isCasting) {
      return valueIsCast && !this.stereo._isStaleCastValue(this.value);
    }
    return !valueIsCast;
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

    // Already resolved and healthy AND on the right backend for the cast state —
    // behave like a cache hit. If it's on the WRONG side (local while casting, or
    // cast while not), swap to the correct backend rather than returning a stale
    // connection (which would play locally under a cast, or vice-versa).
    if (this.isResolved && !this.value.isErrored) {
      // While casting, an explicit (re)load carrying a device URL must re-issue
      // the cast loadMedia: the ONE shared Cast session may have moved to another
      // feed (e.g. switching archive -> live), so a cached cast connection that
      // "matches" can be stale — its media is no longer what the session plays,
      // and returning it leaves the session stuck on the previous feed. Rebuild
      // so loadMedia re-fires for this feed's URL. (A same-feed reload is cheap:
      // Chromecast.setup()'s adopt-check skips a redundant loadMedia when the
      // session already plays this URL.)
      // Shared predicate with _buildStrategies: should this resolution target the
      // device? (casting + a device URL + a LIVE session — a dead Chromecast
      // session resolves locally, not to a connection that immediately fails.)
      let castingThisUrl = this.stereo._shouldCastUrl(options.castUrl);
      if (!castingThisUrl && this._castStateMatches()) {
        return this.value;
      }
      let target = castingThisUrl
        ? this.stereo._buildCastConnection(
            options.castUrl,
            this.metadata,
            // Only seekable media gets a start position; seeking a live stream
            // makes the receiver buffer forever (see engageCastTask).
            this.isStream ? null : this.position
          )
        : this.stereo._buildLocalConnection(this);
      if (target) {
        return await this.swap(target);
      }
      return this.value;
    }

    let urls = await this.stereo.urlCache.resolve(this.identifier);

    // Adopt a connection already loaded for these urls (shared sound cache)
    // rather than building a duplicate — but NOT while casting, where we must
    // resolve through the cast strategy rather than a stale local connection.
    if (!this.stereo.isCasting) {
      let cachedConnection = this.stereo.findLoadedSound(urls);
      if (cachedConnection) {
        this.value = cachedConnection;
        return cachedConnection;
      }
    }

    // Rebuild while casting so the cast strategy is (re)injected at the top;
    // otherwise reuse the cached list.
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
   * Move this Sound from its current connection to `targetConnection`,
   * carrying over position and play-state. The Sound identity and all external
   * references stay put. One mechanism for failover and casting.
   *
   * @method swap
   * @param {BaseSound} targetConnection a freshly-built connection for the same url
   * @return {Promise<BaseSound|null>} the engaged connection, or null if superseded/failed
   */
  swap(targetConnection) {
    return this.swapTask.perform(targetConnection);
  }

  // restartable => latest-wins: a newer swap supersedes the one in flight.
  swapTask = task({ restartable: true }, async (targetConnection) => {
    let generation = ++this._swapGen;

    // Capture intent from the outgoing connection. The handoff survives
    // supersession (a canceled swap leaves it for the next one) so the
    // original position/play-state isn't lost across rapid swaps.
    let handoff = this._handoff ?? this._captureHandoff();
    this._handoff = handoff;

    let outgoing = this.value;
    // Source-identity arbitration: drop the outgoing connection's relays before
    // detaching it, so its teardown pause/ended events never reach the Sound.
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
    // Evict the now-detached connection from the service caches so it can't be
    // re-adopted (soundCache) or kept receiving pause() calls (oneAtATime).
    if (outgoing) {
      this.stereo?.soundCache?.remove(outgoing);
      this.stereo?.oneAtATime?.unregister(outgoing);
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
          // Not seekable (a live stream): can't seek to a past point, but seed
          // the connection's clock so elapsed continues across the swap instead
          // of restarting at zero.
          incoming.seedPosition(handoff.position);
        }
      }

      this.value = incoming;
      engaged = true;

      // Keep the service caches consistent with the new backend: register the
      // incoming connection so oneAtATime arbitrates it and the sound cache can
      // find it. (The outgoing was already detached above.) A cast connection
      // that loses control falls back to its internal clone, so oneAtATime
      // pausing a stale one can't pause the live route.
      this.stereo?.soundCache?.cache(incoming);
      this.stereo?.oneAtATime?.register(incoming);

      if (handoff.isPlaying) {
        await incoming.play();
      }

      // The swapped-in connection may already be playing (e.g. a cast backend
      // autoplays on the device the moment it loads). Its own audio-played then
      // fired BEFORE we registered this Sound's relays above, so a listener
      // watching this Sound for audio-played — like the service's current-sound
      // transition — would miss it and never mark this the current sound. Emit a
      // catch-up so the transition is reliable regardless of event timing. (No-op
      // when not playing; idempotent for downstream observers.)
      if (this.isPlaying) {
        this.trigger('audio-played', { sound: this });
      }

      this._handoff = null;
      return incoming;
    } finally {
      // Cancel/supersede/failure cleanup: tear down the half-built incoming so
      // its element/HLS instance doesn't leak. (The handoff is intentionally
      // left intact for a superseding swap to reuse.)
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
      // Use the Sound's intent, not the connection's live isPlaying: a route drop
      // pauses the outgoing connection before we get here, but the user still
      // intends playback, so the swapped-in backend should resume.
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
    // A real play (e.g. the initial load plays the connection directly, not via
    // the entity) reflects intent to play. Involuntary pauses are deliberately
    // NOT mirrored here — only explicit pause/stop/togglePause clear intent.
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

  // True when the backing connection is on the WRONG backend for the current
  // cast state — e.g. a leftover Chromecast connection after the cast session
  // ended, or a local one while casting. Calling play()/togglePause() on it just
  // no-ops a dead connection, so we must re-resolve to the correct backend first.
  // (load() runs the resolved-but-wrong-backend swap path, which plays the
  // swapped-in connection per _playIntent — set by the caller just above.)
  _needsBackendReresolve() {
    return this.isResolved && !this._castStateMatches();
  }

  play(...args) {
    this._playIntent = true;
    if (this._needsBackendReresolve()) {
      return this.load();
    }
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
    // Capture intent from the state we're toggling away from (before the
    // connection flips it).
    this._playIntent = !this.isPlaying;
    if (this._needsBackendReresolve()) {
      return this.load();
    }
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
