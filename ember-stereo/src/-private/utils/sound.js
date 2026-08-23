import { getOwner, setOwner } from '@ember/application';
import { isDevelopingApp, isTesting, macroCondition } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { makeArray } from '@ember/array';
import { task, race, waitForEvent, rawTimeout } from 'ember-concurrency';
import debug from 'debug';
import Evented from './evented';
import isSameAudio from './is-same-audio';
import resolveUrls from './resolve-urls';
import { EVENT_MAP } from '../event-map';

const RELAYED_EVENTS = [
  ...EVENT_MAP.map(({ event }) => event),
  'audio-load-error',
];

/**
 * An identity-stable, lazy proxy for a playable url that delegates playback to
 * a concrete connection (a `BaseSound` subclass) in `connection`.
 *
 * @class Sound
 * @public
 */
export default class Sound extends Evented {
  // Whatever the caller passed, which may be a url, a `{url}` object, an array of those, or a promise. Read `url` instead.
  @tracked _identifier;
  @tracked options;
  @tracked strategies;
  @tracked failures = [];
  @tracked _connection = null;
  @tracked _volume;
  @tracked _castUrl = null;
  @tracked _metadata = {};
  @tracked _debug = {};

  @tracked _collapsedInto = null;

  _explicitPlayIntent = false;
  _urlsPromise = null;
  _boundRelayHandlers = new Map();

  constructor(identifier, options = {}) {
    super(...arguments);

    if (options.owner) {
      setOwner(this, options.owner);
    }

    this._identifier = identifier;
    this.options = options;

    if (options.metadata) {
      this.metadata = options.metadata;
    }
  }

  get stereo() {
    return getOwner(this)?.lookup('service:stereo');
  }

  get canonical() {
    return this._collapsedInto?.canonical ?? this;
  }

  // Every audio-played funnels through here, however playback started.
  trigger(eventName, ...args) {
    super.trigger(eventName, ...args);
    if (eventName === 'audio-played') {
      this.stereo?._soundPlayed(this);
    }
  }

  /**
   * The url this sound plays. Always a single string, even when you passed
   * several urls or a promise.
   *
   * @property url
   * @type {String}
   * @public
   */
  get url() {
    if (this.connection?.url) {
      return this.connection.url;
    }

    // A promise identifier names no url until it resolves.
    let first = makeArray(this._identifier)[0];
    if (typeof first === 'string') {
      return first;
    }
    return first?.url;
  }

  // A promise identifier contributes nothing here until it resolves.
  /**
   * Every url this sound answers to, including the cast url.
   *
   * @property urls
   * @type {Array}
   * @public
   */
  get urls() {
    let candidates = [
      ...makeArray(this._identifier),
      this.connection?.url,
      this._castUrl,
    ];

    return [
      ...new Set(
        candidates
          .map((candidate) =>
            typeof candidate === 'string' ? candidate : candidate?.url
          )
          .filter(Boolean)
      ),
    ];
  }

  // A cast receiver fetches this itself, so the app has to supply a natively-playable variant.
  /**
   * A url a cast device can fetch on its own. Defaults to `url`.
   *
   * @property castUrl
   * @type {String}
   * @public
   */
  get castUrl() {
    return this._castUrl ?? this.url;
  }

  set castUrl(value) {
    this._castUrl = value;
  }

  /**
   * Whatever is playing this sound right now. Failover and casting replace it,
   * so read it rather than hold it.
   *
   * @property connection
   * @type {BaseSound}
   * @public
   */
  get connection() {
    return this._connection;
  }

  set connection(connection) {
    debug('ember-stereo:sound')(
      `set connection: ${connection?.connectionName} -> ${connection?.url}`
    );

    this._unregisterEventRelays(this._connection);

    if (connection) {
      this._registerEventRelays(connection);
      if (Object.keys(this._metadata ?? {}).length > 0) {
        connection.metadata = this._metadata;
      }
      if (this._volume != null) {
        connection._setVolume(this._volume);
      }
    }

    this._connection = connection;

    if (macroCondition(isDevelopingApp())) {
      this._warnIfCastingLocally(connection);
    }

    // A connection can arrive already playing with its audio-played long gone, so re-announce it.
    if (connection?.isPlaying) {
      this._explicitPlayIntent = true;
      this.trigger('audio-played', { sound: this });
    }
  }

  _warnIfCastingLocally(connection) {
    if (macroCondition(isTesting())) {
      return;
    }
    let cast = this.stereo?.cast;
    if (!connection || !cast?.isCasting || cast.isCastConnection(connection)) {
      return;
    }
    console.warn(
      `ember-stereo: casting is active, but ${this.url} resolved to ${connection.connectionName} and will play locally. The device could not fetch its castUrl (${this.castUrl}).`
    );
  }

  /**
   * The sound exists but no connection has resolved yet.
   *
   * @property isPending
   * @type {Boolean}
   * @public
   */
  get isPending() {
    return isEmpty(this.connection);
  }

  /**
   * A connection is attached.
   *
   * @property isResolved
   * @type {Boolean}
   * @public
   */
  get isResolved() {
    return !isEmpty(this.connection);
  }

  /**
   * A load is in flight, or the connection is still buffering.
   *
   * @property isLoading
   * @type {Boolean}
   * @public
   */
  get isLoading() {
    return (
      this.loadTask.isRunning ||
      this.swapTask.isRunning ||
      this.connection?.isLoading ||
      false
    );
  }

  /**
   * Every playable connection was tried and none worked.
   *
   * @property isErrored
   * @type {Boolean}
   * @public
   */
  get isErrored() {
    if (this.connection) {
      return this.connection.isErrored;
    }
    return (
      Boolean(this.strategies) && !this.loadTask.isRunning && this.isPending
    );
  }

  /**
   * What went wrong, one entry per connection that failed.
   *
   * @property errors
   * @type {Array}
   * @public
   */
  get errors() {
    let strategyErrors = (this.failures || [])
      .map((strategy) => strategy.error)
      .filter(Boolean);

    return this.connection?.error
      ? [...strategyErrors, this.connection.error]
      : strategyErrors;
  }

  /**
   * The active connection's error, if it has one.
   *
   * @property error
   * @type {String}
   * @public
   */
  get error() {
    return this.connection?.error;
  }

  /**
   * Whatever you want to keep alongside the sound. Feeds the OS media controls.
   *
   * @property metadata
   * @type {Object}
   * @public
   */
  get metadata() {
    return this._metadata;
  }

  set metadata(value) {
    let old = this._metadata;
    this._metadata = value ?? {};

    if (this.connection) {
      this.connection.metadata = this._metadata;
    }

    this.trigger('audio-metadata-changed', {
      old,
      new: this._metadata,
      sound: this,
    });
  }

  /**
   * The underlying element, when the active connection uses one.
   *
   * @property audioElement
   * @type {HTMLAudioElement}
   * @public
   */
  get audioElement() {
    return this.connection?.audioElement;
  }

  /**
   * Resolve a connection for this sound without playing it.
   *
   * @method load
   * @public
   */
  load(loadOptions = {}) {
    return this.loadTask.perform(loadOptions);
  }

  resolveUrls() {
    this._urlsPromise ??= resolveUrls(this._identifier).catch((error) => {
      this._urlsPromise = null;
      throw error;
    });
    return this._urlsPromise;
  }

  _castStateMatches() {
    let connectionIsCast = this.stereo.cast.isCastConnection(this.connection);
    if (this.stereo.cast.isCasting) {
      return (
        connectionIsCast &&
        !this.stereo.cast.isStaleCastConnection(this.connection)
      );
    }
    return !connectionIsCast;
  }

  loadTask = task({ restartable: true }, async (loadOptions = {}) => {
    this.stereo?._soundLoadStarted(this);
    this.stereo?.oneAtATime?.register(this);

    let options = this.stereo.prepareLoadOptions({
      ...this.options,
      ...loadOptions,
    });

    // Chromecast reads its metadata during setup, before the connection lands.
    if (Object.keys(loadOptions.metadata ?? {}).length > 0) {
      this.metadata = { ...this.metadata, ...loadOptions.metadata };
    }
    options.metadata = this.metadata;

    if (options.castUrl != null) {
      this._castUrl = options.castUrl;
    } else {
      options.castUrl = this.castUrl;
    }

    if (this.isResolved && !this.connection.isErrored) {
      // Chromecast allows one session at a time, and it may have moved to another feed.
      let castingThisUrl = this.stereo.cast.shouldCastUrl(options.castUrl);
      if (!castingThisUrl && this._castStateMatches()) {
        return this.connection;
      }
      // Seeking a live stream makes the receiver buffer forever.
      let castStartPosition = this.isStream ? null : this.position;
      let target = castingThisUrl
        ? this.stereo.cast.buildCastConnection(options.castUrl, this.metadata, {
            startTime: castStartPosition,
            autoplay: this._explicitPlayIntent,
          })
        : this.stereo.cast.buildLocalConnection(this);
      if (target) {
        return await this.swap(target);
      }
      return this.connection;
    }

    let urls = await this.resolveUrls();

    // A promise identifier named no url until now.
    options.castUrl ??= this.castUrl;

    if (!this.strategies || this.stereo.cast.isCasting) {
      this.strategies = this.stereo._buildStrategies(urls, options);
      this._debug = this.strategies;
    }

    this._clearPreviousAttempts();

    for (let strategy of this.strategies) {
      if (!strategy.canPlay || strategy.tried) {
        continue;
      }

      strategy.tried = true;
      let candidate = strategy.createConnection();

      debug('ember-stereo:sound')(
        `TRYING: [${strategy.connectionName}] -> ${strategy.url}`
      );

      let { connection, error, erroredConnection } = await race([
        this.waitForReadyTask.perform(candidate),
        this.waitForErrorTask.perform(candidate),
      ]);

      if (connection) {
        strategy.success = true;
        this.connection = connection;
        return connection;
      } else {
        strategy.error = error;
        strategy.erroredConnection = erroredConnection;
        this.failures = [...this.failures, strategy];
      }
    }

    return null;
  });

  _clearPreviousAttempts() {
    this.failures = [];
    this.strategies.forEach((strategy) => {
      strategy.tried = false;
      strategy.error = null;
      strategy.success = false;
    });
  }

  // The connection may already be ready, and audio-ready won't fire again.
  waitForReadyTask = task(async (connection) => {
    if (!connection.isReady) {
      await waitForEvent(connection, 'audio-ready');
    }
    return { connection };
  });

  waitForErrorTask = task(async (connection) => {
    // Howler sets isErrored a tick late because it triggers outside the runloop.
    // NativeAudio emits audio-load-error then retries without crossorigin.
    while (!connection.isErrored) {
      await race([
        waitForEvent(connection, 'audio-load-error'),
        rawTimeout(50),
      ]);
    }
    return { error: connection.error, erroredConnection: connection };
  });

  _swapGen = 0;
  _handoff = null;

  swap(target, connectionArgs = {}) {
    if (typeof target === 'string') {
      let strategy = (this.strategies || []).find(
        (candidate) => candidate.key === target && candidate.canPlay
      );
      if (!strategy) {
        return Promise.reject(
          new Error(
            `[ember-stereo] no eligible '${target}' connection for ${this.url}`
          )
        );
      }
      target = strategy.createConnection(connectionArgs);
    }
    return this.swapTask.perform(target);
  }

  swapTask = task({ restartable: true }, async (targetConnection) => {
    let generation = ++this._swapGen;

    let handoff = this._handoff ?? this._captureHandoff();
    this._handoff = handoff;

    let outgoing = this.connection;
    this.connection = null;
    this._silenceAndReleaseOutgoing(outgoing);

    let incoming = targetConnection;
    incoming.adoptKnownStream(handoff.isStream);
    let engaged = false;

    try {
      let { connection, error } = await race([
        this.waitForReadyTask.perform(incoming),
        this.waitForErrorTask.perform(incoming),
      ]);

      let supersededByNewerSwap = generation !== this._swapGen;
      if (supersededByNewerSwap) {
        return null;
      }

      if (!connection) {
        let failure = {
          url: this.url,
          error: error || 'failed to engage swapped connection',
          connectionKey: incoming.connectionKey,
        };
        this.trigger('audio-load-error', {
          sound: this,
          failures: [failure],
          error: failure.error,
        });

        await this.loadTask.perform();

        this.failures = [...this.failures, failure];

        if (this.connection) {
          this.connection.adoptKnownStream(handoff.isStream);
          if (handoff.position != null && this.connection.isSeekable) {
            this.connection.position = handoff.position;
          }
          if (handoff.isPlaying) {
            await this.connection.play();
          }
          this._handoff = null;
        }
        return null;
      }

      if (handoff.position != null) {
        if (incoming.isSeekable) {
          incoming.position = handoff.position;
        } else if (typeof incoming.seedPosition === 'function') {
          incoming.seedPosition(handoff.position);
        }
      }

      this.connection = incoming;
      engaged = true;

      if (handoff.isPlaying) {
        await incoming.play();
      }

      this._handoff = null;
      return incoming;
    } finally {
      if (!engaged && incoming && !incoming.isDestroyed) {
        try {
          incoming.teardown();
        } catch (e) {
          debug('ember-stereo:sound')(`incoming teardown errored: ${e?.message}`);
        }
      }
    }
  });

  _silenceAndReleaseOutgoing(outgoing) {
    let outgoingElement = outgoing?.audioElement;
    try {
      outgoing?.pause?.();
    } catch (e) {
      debug('ember-stereo:sound')(`outgoing pause errored: ${e?.message}`);
    }
    try {
      outgoingElement?.pause?.();
    } catch (e) {
      debug('ember-stereo:sound')(
        `outgoing element pause errored: ${e?.message}`
      );
    }
    try {
      outgoing?.teardown?.();
    } catch (e) {
      debug('ember-stereo:sound')(`outgoing teardown errored: ${e?.message}`);
    }
  }

  reset() {
    this.loadTask.cancelAll();
    this.swapTask.cancelAll();

    let connection = this.connection;
    this.connection = null;

    if (connection) {
      try {
        connection.stop?.();
      } catch (e) {
        debug('ember-stereo:sound')(`reset stop errored: ${e?.message}`);
      }
      try {
        connection.teardown?.();
      } catch (e) {
        debug('ember-stereo:sound')(`reset teardown errored: ${e?.message}`);
      }
    }

    this.stereo?.oneAtATime?.unregister(this);

    this.strategies = null;
    this.failures = [];
    this._handoff = null;
    this._explicitPlayIntent = false;
    this._metadata = {};
    this._urlsPromise = null;
  }

  _captureHandoff() {
    let connection = this.connection;
    return {
      position: connection?.position,
      isPlaying: this._explicitPlayIntent,
      isStream: connection?.isStream,
    };
  }

  _registerEventRelays(connection) {
    if (!connection) {
      return;
    }

    RELAYED_EVENTS.forEach((event) => {
      let handler = (info) => this._relayEvent(event, info);
      this._boundRelayHandlers.set(event, handler);
      connection.on(event, handler);
    });
  }

  _relayEvent(eventName, info = {}) {
    if (eventName === 'audio-played') {
      this._explicitPlayIntent = true;
    }
    this.trigger(eventName, { ...info, sound: this });
  }

  _unregisterEventRelays(connection) {
    if (!connection) {
      return;
    }

    RELAYED_EVENTS.forEach((event) => {
      let handler = this._boundRelayHandlers.get(event);
      if (handler) {
        try {
          connection.off(event, handler);
        } catch (e) {}
        this._boundRelayHandlers.delete(event);
      }
    });
  }

  _needsConnectionReresolve() {
    return this.isResolved && !this._castStateMatches();
  }

  /**
   * Play the sound, loading it first if nothing is attached yet.
   *
   * @method play
   * @public
   */
  play(...args) {
    this._explicitPlayIntent = true;
    if (this._needsConnectionReresolve()) {
      return this.load();
    }
    return this.connection?.play(...args);
  }

  /**
   * Pause the sound and keep its position.
   *
   * @method pause
   * @public
   */
  pause(...args) {
    this._explicitPlayIntent = false;
    return this.connection?.pause(...args);
  }

  /**
   * Stop the sound and release what it was playing through.
   *
   * @method stop
   * @public
   */
  stop(...args) {
    this._explicitPlayIntent = false;
    return this.connection?.stop(...args);
  }

  /**
   * Play the sound if it is paused, pause it if it is playing.
   *
   * @method togglePause
   * @public
   */
  togglePause(...args) {
    this._explicitPlayIntent = !this.isPlaying;
    if (this._needsConnectionReresolve()) {
      return this.load();
    }
    return this.connection?.togglePause(...args);
  }

  /**
   * Move the playhead back by an amount in milliseconds.
   *
   * @method rewind
   * @public
   */
  rewind(...args) {
    return this.connection?.rewind(...args);
  }

  /**
   * Move the playhead forward by an amount in milliseconds.
   *
   * @method fastForward
   * @public
   */
  fastForward(...args) {
    return this.connection?.fastForward(...args);
  }

  /**
   * Move the playhead to a position in milliseconds.
   *
   * @method seek
   * @public
   */
  seek(...args) {
    return this.connection?.seek(...args);
  }

  /**
   * Whether this sound is the one for an identifier. Compares normalized urls,
   * so use it instead of comparing `url` yourself.
   *
   * @method hasUrl
   * @public
   */
  hasUrl(identifier, options = { exact: false }) {
    if (isSameAudio(this.urls, identifier, options)) {
      return true;
    }

    return makeArray(this._identifier).some((mine) =>
      makeArray(identifier).includes(mine)
    );
  }

  _setVolume(volume) {
    this._volume = volume;
    this.connection?._setVolume(volume);
  }

  /**
   * Where the playhead is, in milliseconds.
   *
   * @property position
   * @type {Number}
   * @public
   */
  get position() {
    return this.connection?.position;
  }

  set position(value) {
    if (this.connection) {
      this.connection.position = value;
    }
  }

  /**
   * How long the sound runs, in milliseconds. A live stream reports `Infinity`.
   *
   * @property duration
   * @type {Number}
   * @public
   */
  get duration() {
    return this.connection?.duration;
  }

  /**
   * The wall-clock time playing right now, for live and HLS streams.
   *
   * @property currentTime
   * @type {Date}
   * @public
   */
  get currentTime() {
    return this.connection?.currentTime;
  }

  /**
   * The wall-clock time the stream begins, for live and HLS streams.
   *
   * @property startTime
   * @type {Date}
   * @public
   */
  get startTime() {
    return this.connection?.startTime;
  }

  /**
   * The wall-clock time the stream ends, for live and HLS streams.
   *
   * @property endTime
   * @type {Date}
   * @public
   */
  get endTime() {
    return this.connection?.endTime;
  }

  /**
   * How much has downloaded, from 0 to 100, when the connection reports it.
   *
   * @property percentLoaded
   * @type {Number}
   * @public
   */
  get percentLoaded() {
    return this.connection?.percentLoaded;
  }

  /**
   * The browser refused to autoplay, so the sound needs a user gesture.
   *
   * @property isBlocked
   * @type {Boolean}
   * @public
   */
  get isBlocked() {
    return this.connection?.isBlocked;
  }

  set isBlocked(value) {
    if (this.connection) {
      this.connection.isBlocked = value;
    }
  }

  /**
   * The connection can start playing.
   *
   * @property isReady
   * @type {Boolean}
   * @public
   */
  get isReady() {
    return this.connection?.isReady;
  }

  /**
   * Audio is coming out right now.
   *
   * @property isPlaying
   * @type {Boolean}
   * @public
   */
  get isPlaying() {
    return this.connection?.isPlaying;
  }

  /**
   * The sound is loaded and stopped at a position.
   *
   * @property isPaused
   * @type {Boolean}
   * @public
   */
  get isPaused() {
    return this.connection?.isPaused;
  }

  /**
   * The connection has enough to play.
   *
   * @property isLoaded
   * @type {Boolean}
   * @public
   */
  get isLoaded() {
    return this.connection?.isLoaded;
  }

  /**
   * The sound has played at least once.
   *
   * @property hasPlayed
   * @type {Boolean}
   * @public
   */
  get hasPlayed() {
    return this.connection?.hasPlayed;
  }

  /**
   * The audio type the connection worked out.
   *
   * @property mimeType
   * @type {String}
   * @public
   */
  get mimeType() {
    return this.connection?.mimeType;
  }

  /**
   * The sound is a live stream rather than a fixed recording.
   *
   * @property isStream
   * @type {Boolean}
   * @public
   */
  get isStream() {
    return this.connection?.isStream;
  }

  /**
   * The playhead can move backwards.
   *
   * @property isRewindable
   * @type {Boolean}
   * @public
   */
  get isRewindable() {
    return this.connection?.isRewindable;
  }

  /**
   * The playhead can move forwards.
   *
   * @property isFastForwardable
   * @type {Boolean}
   * @public
   */
  get isFastForwardable() {
    return this.connection?.isFastForwardable;
  }

  /**
   * The playhead can move to an arbitrary position.
   *
   * @property isSeekable
   * @type {Boolean}
   * @public
   */
  get isSeekable() {
    return this.connection?.isSeekable;
  }

  /**
   * ID3 tags read off the stream, when the connection supplies them.
   *
   * @property id3Tags
   * @type {Object}
   * @public
   */
  get id3Tags() {
    return this.connection?.id3Tags;
  }

  get id3TagMetadata() {
    return this.connection?.id3TagMetadata;
  }

  /**
   * The active connection's display name, for example `Native Audio`.
   *
   * @property connectionName
   * @type {String}
   * @public
   */
  get connectionName() {
    return this.connection?.connectionName;
  }

  /**
   * The active connection's key, for example `HLS`.
   *
   * @property connectionKey
   * @type {String}
   * @public
   */
  get connectionKey() {
    return this.connection?.connectionKey;
  }
}
