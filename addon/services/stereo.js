import { A as emberArray, makeArray } from '@ember/array';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { copy } from 'ember-copy';
import { dasherize } from '@ember/string';
import { getOwner } from '@ember/application';
import { later, cancel, bind, next } from '@ember/runloop';
import { Promise } from 'rsvp';
import { race, waitForProperty, didCancel, task } from 'ember-concurrency';
import { set, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import debug from 'debug';
import config from 'ember-get-config';

import Service, { inject as service } from '@ember/service';

import EmberEvented from '@ember/object/evented';
import ErrorCache from 'ember-stereo/-private/utils/error-cache';
import OneAtATime from 'ember-stereo/-private/utils/one-at-a-time';
import resolveUrls from 'ember-stereo/-private/utils/resolve-urls';
import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import SoundCache from 'ember-stereo/-private/utils/sound-cache';
import Strategy from 'ember-stereo/-private/utils/strategy';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';

import Ember from 'ember';

const DEFAULT_CONNECTIONS = [{ name: 'NativeAudio' }, { name: 'Howler' }, { name: 'HLS' }];

const log = debug('ember-stereo');

export const EVENT_MAP = [
  { event: 'audio-played', handler: '_relayPlayedEvent' },
  { event: 'audio-paused', handler: '_relayPausedEvent' },
  { event: 'audio-ended', handler: '_relayEndedEvent' },
  { event: 'audio-duration-changed', handler: '_relayDurationChangedEvent' },
  { event: 'audio-position-changed', handler: '_relayPositionChangedEvent' },
  { event: 'audio-loaded', handler: '_relayLoadedEvent' },
  { event: 'audio-loading', handler: '_relayLoadingEvent' },
  { event: 'audio-position-will-change', handler: '_relayPositionWillChangeEvent' },
  { event: 'audio-will-rewind', handler: '_relayWillRewindEvent' },
  { event: 'audio-will-fast-forward', handler: '_relayWillFastForwardEvent' },
  { event: 'audio-metadata-changed', handler: '_relayMetadataChangedEvent' },
];

export const SERVICE_EVENT_MAP = [
  { event: 'current-sound-changed' },
  { event: 'current-sound-interrupted' },
  { event: 'new-load-request' },
  { event: 'pre-load' },
];

/**
 * This is the stereo service class.
 *
 * @class stereo
 * @constructor
 */
export default class Stereo extends Service.extend(EmberEvented) {
  @service poll

  constructor() {
    super(...arguments);
    const owner = getOwner(this);
    owner.registerOptionsForType('ember-stereo@stereo-connection', { instantiate: false });
    owner.registerOptionsForType('stereo-connection', { instantiate: false });

    this.loadConnections();

    this.defaultVolume = this.systemStereoOptions?.initialVolume || 100;
    this.sharedAudioAccess = new SharedAudioAccess();
    this.oneAtATime = new OneAtATime();
    this.soundCache = new SoundCache(this);
    this.errorCache = new ErrorCache(this);

    this.volume = this.defaultVolume;
    this.isReady = true;

    // Polls the current sound for position. We wanted to make it easy/flexible
    // for connection authors, and since we only play one sound at a time, we don't
    // need other non-active sounds telling us position info
    this.poll.addPoll({
      interval: this.pollInterval || 500,
      callback: bind(this, this._setCurrentPosition),
    });
  }

  /** currently loaded {Sound} object
   * @property currentSound
   * @type {Sound}
   * @public
  */
  @tracked currentSound = null;
  @tracked errorCache = null;

  get loadedSounds() {
    return this.soundCache.cachedList
  }

  /**
    * is the current sound playing
    * @property isPlaying
    * @type {Boolean}
    * @readOnly
    * @public
  */
  get isPlaying() {
    return this.currentSound?.isPlaying || false;
  }

  /**
    * is a sound loading?
    * @property isLoading
    * @type {Boolean}
    * @readOnly
    * @public
  */
  get isLoading() {
    return this.loadTask.isRunning || (this.currentSound && this.currentSound.isLoading);
  }

  /**
    * Current metadata object of the current sound. Use `{{sound-metadata}}` helper in templates
    * @property currentMetadata
    * @type {Object}
    * @readOnly
    * @public
  */
  get currentId3Data() {
    return this.currentSound?.id3TagMetadata;
  }

  /**
    * Current metadata object of the current sound. Use `{{sound-metadata}}` helper in templates
    * @property currentMetadata
    * @type {Object}
    * @readOnly
    * @public
  */
  get currentMetadata() {
    return this.currentSound?.metadata;
  }

  /**
    * is the current sound a stream?
    * @property isStream
    * @type {Boolean}
    * @readOnly
    * @public
  */
  get isStream() {
    return this.currentSound?.isStream;
  }

  /**
    * is the current sound fastforwardable?
    * @property isSeekable
    * @type {Boolean}
    * @readOnly
    * @public
  */
  get isSeekable() {
    return this.currentSound?.isFastForwardable || this.currentSound?.isRewindable;
  }

  /**
  * is the current sound fastforwardable?
  * @property isFastForwardable
  * @type {Boolean}
  * @readOnly
  * @public
  */
  get isFastForwardable() {
    return this.currentSound?.isFastForwardable;
  }

  /**
    * is the current sound rewindable?
    * @property isRewindable
    * @type {Boolean}
    * @readOnly
    * @public
  */
  get isRewindable() {
    return this.currentSound?.isRewindable;
  }

  /**
    * Duration of current sound in milliseconds. Use `{{numeric-duration}}` to convert, or the `{{sound-duration url format=time}}` template helper
    * @property duration
    * @type {Float}
    * @readOnly
    * @public
  */
  get duration() {
    return this.currentSound?.duration;
  }

  /**
    * Percent loaded of current sound
    * @property percentLoaded
    * @type {Float}
    * @readOnly
    * @public
  */
  get percentLoaded() {
    return this.currentSound?.percentLoaded;
  }

  /**
     * Get/set the current sound position
    *
    * @property position
    * @type {Float}
    * @public
  */
  get position() {
    return this.currentSound?.position;
  }
  set position(v) {
    this.currentSound.position = v;
  }

  /**
   * Get/set the system volume, 0-100
   *
   * @property volume
   * @type {Integer}

  */
  @tracked _volume = this.defaultVolume;
  get volume() {
    return this._volume;
  }
  set volume(v) {
    if (this.currentSound) {
      debug(`setting current sound volume = ${v}`);
      this.currentSound._setVolume(v);
    }
    this._volume = v;
    debug(`setting volume = ${v}`);
    this.trigger('volume-change', v);
  }

  /**
   * Get/set if hifi should treat this as a mobile device
   *
   * @property isMobileDevice
   * @type {Boolean}

  */
  get isMobileDevice() {
    return this._isMobileDevice || 'ontouchstart' in window;
  }
  set isMobileDevice(v) {
    this._isMobileDevice = v;
    return v;
  }

  /**
   * get if hifi should use a shared audio element
   *
   * @property useSharedAudioAccess
   * @type {Boolean}

  */
  get useSharedAudioAccess() {
    return this.isMobileDevice || this.systemStereoOptions?.alwaysUseSingleAudioElement
  }

  /**
    * is the sound muted
    * @property isMuted
    * @type {Boolean}
    * @readOnly
    * @public
  */
  get isMuted() {
    return this.volume === 0;
  }

  /**
   * Toggles mute state. Sets volume to zero on mute, resets volume to the last level it was before mute, unless
   * unless the last level was zero, in which case it sets it to the default volume
   *
   * @method toggleMute
   * @public
   */
  toggleMute() {
    if (this.isMuted) {
      this.volume = this.unmuteVolume;
      this.unmuteVolume = undefined;
    } else {
      if (this.volume > 0) {
        this.unmuteVolume = this.volume;
      }
      this.volume = 0;
    }
  }

  /**
   * Ember concurrency task: Given an array of URLS, return a sound ready for playing
   *
   * @method loadTask
   * @async
   * @param {Array|Promise} urlsOrPromise [..{Promise|String}]
   * @param {Object} options { metadata: {},
   * @public
   * Provide an array of urls to try, or a promise that will resolve to an array of urls
   * @return {Sound} A sound that's ready to be played, or an error
   */

  @task({ debug: true, maxConcurrency: 5 })
  *loadTask(urlsOrPromise, options) {
    var sharedAudioAccess = this._createAndUnlockAudio();
    options = assign({ metadata: {}, sharedAudioAccess }, options);

    let urlsToTry = yield resolveUrls(urlsOrPromise);
    debug('ember-stereo')(`given urls: ${urlsToTry.join(', ')}`);
    this.trigger('pre-load', urlsToTry);
    var sound = this.soundCache.find(urlsToTry);
    if (sound) {
      debug('ember-stereo')('retreived sound from cache');
      return yield({sound});
    }
    else {
      var strategies = copy(this._prepareAllStrategies(urlsToTry, options));

      this.trigger('--new-load-request-strategies', { strategies, urls: urlsToTry, options })

      var success = false
      let failures = null
      while (strategies.length > 0 && !success) {
        let strategy = strategies.shift();
        let result = yield this.tryLoadingSound.perform(strategy);
        if (result.sound) {
          sound = result.sound
          success = true;
        }
        if (result.error) {
          failures = makeArray(failures);
          failures.push(strategy);
        }
      }

      if (success && sound) {
        this._handleLoadSuccess({sound, options});
      }
      else if (failures) {
        makeArray(failures).forEach(strategy => {
          this.errorCache.cache({ url: strategy.url, error: strategy.error, connectionKey: strategy.connectionKey })
        })
        this._handleLoadFailure({urlsToTry, failures})
      }

      return { sound, failures };
    }
  }

  /**
   * Given an array of URLS, return a sound ready for playing
   *
   * @method load
   * @async
   * @public
   * @param {Array|Promise} urlsOrPromise An array of urls or a promise that will resolve to an array of urls
   * @return {Sound} A sound that's ready to be played, or an error
   */

  load(urlsOrPromise, options) {
    options = assign({ metadata: {} }, options);

    try {
      let promise = this.loadTask.perform(urlsOrPromise, options);
      this.trigger('new-load-request', {loadPromise: promise, urlsOrPromise, options});

      return promise;
    }
    catch(e) {
      if (!didCancel(e)) {
        // re-throw the non-cancelation error
        throw e;
      }
    }
  }

  /**
   * Given an array of URLs, return a sound and play it.
   *
   * @method playTask
   * @async
   * @public
   * @param {Array|Promise} urlsOrPromise An array of urls or a promise that will resolve to an array of urls
   * @return {Sound, failures} A sound that's playing, or an error
   */

  @task({maxConcurrency: 1, restartable: true})
  *playTask(urlsOrPromise, options = {}) {
    if (this.isPlaying) {
      this.trigger('current-sound-interrupted', {sound: this.currentSound});
      this.pause();
    }

    options = assign({ metadata: {} }, options);
    let loadPromise = this.loadTask.perform(urlsOrPromise, options);
    this.trigger('new-load-request', { loadPromise, urlsOrPromise, options }); //urls: Promise.resolve(resolveUrls(urlsOrPromise))

    let { sound, failures } = yield loadPromise;

    if (sound) {
      this._registerEvents(sound);
      this._attemptToPlaySound(sound, options);

      yield race([
        waitForProperty(sound, 'isPlaying'),
        waitForProperty(sound, 'isErrored')
      ]);

      if (sound && options.position) {
        sound.position = options.position
      }

      if (sound.isPlaying) {
        return {sound, failures}
      }
      else {
        let strategy = {url: sound.url, error: sound.error, connectionKey: sound.connectionKey};
        this.errorCache.cache({url: sound.url, error: sound.error, connectionKey: sound.connectionKey})
        this.trigger('audio-load-error', { sound: sound, failures: [strategy], error: sound.error })

        // provide option to throw error
        // throw new Error('sound failed to load', { sound, failures: [strategy] });

        return {sound, failures: [strategy]}
      }
    }
    else {
      // TODO: provide option to throw error?
      // throw new Error('sound failed to load', { sound, failures });

      return {sound, failures}
    }
  }

  /**
   * Given an array of URLs, return a sound and play it.
   *
   * @method play
   * @async
   * @param {Array|Promise} urlsOrPromise Provide an array of urls to try, or a promise that will resolve to an array of urls
   * @return {Sound} A sound that's playing, or an error
   */

  play(urlsOrPromise, options = {}) {
    try {
      return this.playTask.perform(urlsOrPromise, options)
    }
    catch(e) {
      if (!didCancel(e)) {
        // re-throw the non-cancelation error
        throw e;
      }
    }
  }

  /**
   * Pauses the current sound
   *
   * @method pause
   * @public
   */

  pause() {
    assert('[ember-stereo] Nothing is playing.', this.currentSound);
    this.currentSound.pause();
  }

  /**
   * Stops the current sound
   *
   * @method stop
   * @public
   */

  stop() {
    assert('[ember-stereo] Nothing is playing.', this.currentSound);
    this.currentSound.stop();
  }

  /**
   * Toggles play/pause state of the current sound
   *
   * @method togglePause
   * @public
   */

  togglePause() {
    assert('[ember-stereo] Nothing is playing.', this.currentSound);
    if (this.isPlaying) {
      this.currentSound.pause();
    }
    else {
      this.currentSound.play();
    }
  }

  /**
   * Fast forwards current sound if able
   *
   * @method fastForward
   * @public
   * @param {Integer} duration in ms
   */

  fastForward(duration) {
    assert('[ember-stereo] Nothing is playing.', this.currentSound);
    this.currentSound.fastForward(duration);
  }

  /**
   * Rewinds current sound if able
   *
   * @method rewind
   * @public
   * @param {Integer} duration in ms
   */

  rewind(duration) {
    assert('[ember-stereo] Nothing is playing.', this.currentSound);
    this.currentSound.rewind(duration);
  }

  /* ------------------------ PRIVATE(ISH) STUFF ------------------------------ */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  get systemStereoOptions() {
    return config?.emberStereo
  }


  _handleLoadFailure({ urlsToTry, failures }) {
    let nativeAudioFailure = failures.find(f => f.connectionKey == 'NativeAudio')
    let errorMessage = ""
    if (nativeAudioFailure) {
      errorMessage = nativeAudioFailure.error;
    }
    else {
      errorMessage = failures.map(f => f.error).filter(f => f.toString().length > 0)[0]
    }

    this.trigger('audio-load-error', { sound: { url: urlsToTry }, failures: failures, error: errorMessage })
  }

  _handleLoadSuccess({ sound, options }) {
    sound.on('audio-played', ({ sound }) => {
      let previousSound = this.currentSound;
      let currentSound = sound;

      if (previousSound !== currentSound) {
        if (previousSound?.isPlaying) {
          this.trigger('current-sound-interrupted', { sound: previousSound });
        }
        this.trigger('current-sound-changed', { sound: currentSound, previousSound });
        this._setCurrentSound(sound);
      }
    })
    // set current sound metadata
    sound.metadata = options.metadata
    this.soundCache.cache(sound);

    // On audio-played this pauses all the other sounds. One at a time!
    this.oneAtATime.register(sound)
  }

  /**
   * Set the current sound and wire up all the events the sound fires so they
   * trigger through the service, remove the ones on the previous current sound,
   * and set the new current sound to the system volume
   */
  _setCurrentSound(sound) {
    if (this.isDestroyed || this.isDestroying) {
      return; // should use ember-concurrency to cancel any pending promises in willDestroy
    }
    this._unregisterEvents(this.currentSound);
    this._registerEvents(sound);
    sound._setVolume(this.volume);
    this.currentSound = sound;
    debug('ember-stereo')(`setting current sound -> ${sound.url}`);
  }

  /**
   * Loads stereo connections
   *
   * @method loadConnections
   * @param {Array} connections an array of connection objects
   * @private
   * @return {Array}
   */

  loadConnections(connections = this.systemStereoOptions?.connections) {
    if (!connections) {
      connections = emberArray(DEFAULT_CONNECTIONS);
    }
    this._connections = {};
    this._activateConnections(connections);

    return this;
  }

  /**
   * Returns the list of activated and available connections
   *
   * @property connections
   * @type {Array}
   * @private
   */

  get connections() {
    return Object.keys(this._connections);
  }

  /**
   * Given a sound, a url, or an object with a URL property, return a sound ready for playing
   *
   * @method findLoaded
   * @async
   * @param {Array} identifiers [..{Promise|String}]
   * @private
   * @return {Sound} A sound that's ready to be played, or an error
  */

  findLoaded(identifiers) {
    var sound;

    makeArray(identifiers).map(u => new StereoUrl(u)).forEach((stereoUrl) => {
      if (!sound) {
        sound = this.soundCache.find(stereoUrl.url);
      }
    });

    return sound;
  }

  /**
  * Wait for sound to succeed
  *
  * @method waitForSuccess
  * @private
  * @param {Object} strategy a connection strategy object
  * @param {Sound} sound a sound object to play
  * @async
  * @return {Object} { sound }
  **/
  @task
  *waitForSuccess(strategy, sound) {
    yield waitForProperty(sound, 'isReady');
    debug('ember-stereo')(`SUCCESS: [${strategy.connectionName}] -> (${strategy.url})`);
    return { sound }
  }

  /**
  * Wait for sound to succeed
  *
  * @method waitForSuccess
  * @private
  * @param {Object} strategy a connection strategy object
  * @param {Sound} sound a sound object to play
  * @async
  * @return {Object} { error }
  **/
  @task
  *waitForFailure(strategy, sound) {
    yield waitForProperty(sound, 'isErrored');
    debug('ember-stereo')(`FAILED: [${strategy.connectionName}] -> ${sound.error} (${strategy.url})`);
    this._unregisterEvents(sound);

    strategy.error = sound.error;
    return { error: sound.error }
  }

  /**
    * Try loading sound
    *
    * @method tryLoadingSound
    * @private
    * @param {Object} strategy a connection strategy object
    * @return {Object} { sound } or { error }
  **/
  @task
  *tryLoadingSound(strategy) {
    let { connection: Sound, url, connectionName, connectionKey, sharedAudioAccess, options } = strategy
    var newSound = new Sound({ url, connectionName, connectionKey, sharedAudioAccess, options });
    this._registerEvents(newSound);

    debug('ember-stereo')(`TRYING: [${strategy.connectionName}] -> ${strategy.url}`);

    return yield race([
      this.waitForSuccess.perform(strategy, newSound),
      this.waitForFailure.perform(strategy, newSound)
    ]);
  }

  /**
   * Prepares the strategies to attempt to play the sound
   *
   * @method _prepareAllStrategies
   * @param {Array} urlsToTry array of urls to try loading
   * @param {Object} options options object
   * @private
   */

  _prepareAllStrategies(urlsToTry, options) {
    let strategies = [];
    if (options.useConnections) {
      // If the consumer has specified a connection to prefer, use it
      strategies = this._prepareStrategies(urlsToTry, options.useConnections);
    } else if (this.isMobileDevice) {
      // If we're on a mobile device, we want to try NativeAudio first
      strategies = this._prepareMobileStrategies(urlsToTry);
    } else {
      strategies = this._prepareStandardStrategies(urlsToTry);
    }

    debug('ember-stereo')(`trying strategies: ${JSON.stringify(strategies)}`)

    if (this.useSharedAudioAccess) {
      // If we're on a mobile device or have specified to always use a single audio element,
      // pass in sharedAudioAccess into each connection.

      // Using a single audio element combats autoplay blocking issues on touch devices, and resolves
      // some issues when using a cookied content provider (adswizz)

      strategies = strategies.map((s) => {
        s.sharedAudioAccess = options.sharedAudioAccess;
        return s;
      });
    }

    return strategies;
  }

  /**
   * Sets the current sound with its current position, so the sound doesn't have
   * to deal with timers. The service runs the show.
   *
   * @method _setCurrentPosition
   * @private
   */

  _setCurrentPosition() {
    let sound = this.currentSound;
    if (sound) {
      try {
        let newPosition = sound._currentPosition();
        if (sound._position != newPosition) {
          sound._position = newPosition;
        }
      } catch (e) {
        // continue regardless of error
        // TODO: why is this wrapped in a try catch?
      }
    }
  }

  /**
   * Register events on a current sound. Audio events triggered on that sound
   * will be relayed and triggered on this service
   *
   * @method _registerEvents
   * @param {Object} sound
   * @private
   */

  _registerEvents(sound) {
    let service = this;
    EVENT_MAP.forEach((item) => {
      sound.on(item.event, service, service[item.handler]);
    });

    // Internal event for cleanup
    sound.on('_will_destroy', () => {
      this._unregisterEvents(sound);
    });

    //window on close, send stop event to other tabs if playing?
  }

  /**
   * Register events on a current sound. Audio events triggered on that sound
   * will be relayed and triggered on this service
   *
   * @method _unregisterEvents
   * @param {Object} sound
   * @private
   */

  _unregisterEvents(sound) {
    if (!sound) {
      return;
    }

    let service = this;
    EVENT_MAP.forEach((item) => {
      if (sound.has(item.event)) {
        sound.off(item.event, service, service[item.handler]);
      }
    });
  }

  /**
   * Relays an audio event on the sound to an event on the service
   *
   * @method _relayEvent
   * @param {String, Object} eventName, sound
   * @private
   */

  _relayEvent(eventName, info = {}) {
    next(() => {
      this.trigger(eventName, info);
      debug('ember-stereo')(eventName, info);
    })
  }

  /**
    Named functions so Ember Evented can successfully register/unregister them
  */

  /**
   * Fired when audio is played
   * @event 'audio-played'
   */
  _relayPlayedEvent(info) {
    this._relayEvent('audio-played', info);
  }
  _relayPausedEvent(info) {
    this._relayEvent('audio-paused', info);
  }
  _relayEndedEvent(info) {
    this._relayEvent('audio-ended', info);
  }
  _relayDurationChangedEvent(info) {
    this._relayEvent('audio-duration-changed', info);
  }
  _relayPositionChangedEvent(info) {
    this._relayEvent('audio-position-changed', info);
  }
  _relayLoadedEvent(info) {
    this._relayEvent('audio-loaded', info);
  }
  _relayLoadingEvent(info) {
    this._relayEvent('audio-loading', info);
  }
  _relayPositionWillChangeEvent(info) {
    this._relayEvent('audio-position-will-change', info);
  }
  _relayWillRewindEvent(info) {
    this._relayEvent('audio-will-rewind', info);
  }
  _relayWillFastForwardEvent(info) {
    this._relayEvent('audio-will-fast-forward', info);
  }
  _relayMetadataChangedEvent(info) {
    this._relayEvent('audio-metadata-changed', info);
  }
  /**
   * Activates the connections as specified in the config options
   *
   * @method _activateConnections
   * @private
   * @param {Array} connectionOptions
   * @return {Object} instantiated connections
   */

  _activateConnections(options = []) {
    const cachedConnections = this._connections;
    const activatedConnections = {};

    options.forEach((connectionOption) => {
      let name;
      let connection;
      if (typeof connectionOption === 'string') {
        name = connectionOption;
        connection = cachedConnections[name] ? cachedConnections[name] : this._activateConnection({name, config: {}});
      }
      else {
        name = connectionOption.name;
        connection = cachedConnections[name] ? cachedConnections[name] : this._activateConnection(connectionOption);
      }

      set(activatedConnections, name, connection);
    });

    return (this._connections = activatedConnections);
  }

  /**
   * Activates the a single connection
   *
   * @method _activateConnection
   * @private
   * @param {Object} {name, config}
   * @return {Connection} instantiated Connection
   */

  _activateConnection({ name, config } = {}) {
    const Connection = this._lookupConnection(name);
    assert('[ember-stereo] Could not find stereo connection ${name}.', name);
    Connection.setup(config);
    return Connection;
  }

  /**
   * Looks up the connection from the container. Prioritizes the consuming app's
   * connections over the addon's connections.
   *
   * @method _lookupConnection
   * @param {String} connectionName
   * @private
   * @return {Connection} a local connection or a connection from the addon
   */

  _lookupConnection(connectionName) {
    assert(
      '[ember-stereo] Could not find a stereo connection without a name.',
      connectionName
    );

    const dasherizedConnectionName = dasherize(connectionName);
    const availableConnection = getOwner(this).lookup(
      `ember-stereo@stereo-connection:${dasherizedConnectionName}`
    );
    const localConnection = getOwner(this).lookup(
      `stereo-connection:${dasherizedConnectionName}`
    );

    assert(
      `[ember-stereo] Could not load stereo connection ${dasherizedConnectionName}`,
      localConnection || availableConnection
    );

    return localConnection ? localConnection : availableConnection;
  }

  /**
   * Take our standard strategy and reorder it to prioritize native audio
   * first since it's most likely to succeed and play immediately with our
   * audio unlock logic

   * we try each url on each compatible connection in order
   * [{connection: NativeAudio, url: url1},
   *  {connection: NativeAudio, url: url2},
   *  {connection: HLS, url: url1},
   *  {connection: Other, url: url1},
   *  {connection: HLS, url: url2},
   *  {connection: Other, url: url2}]

   * @method _prepareMobileStrategies
   * @param {Array} urlsToTry
   * @private
   * @return {Array} {connection, url}
   */

  _prepareMobileStrategies(urlsToTry) {
    let strategies = this._prepareStandardStrategies(urlsToTry);
    debug('ember-stereo')(
      'modifying standard strategy for to work best on mobile'
    );

    let nativeStrategies = emberArray(strategies).filterBy('connectionKey', 'NativeAudio');
    let otherStrategies = emberArray(strategies).rejectBy('connectionKey', 'NativeAudio');
    let orderedStrategies = nativeStrategies.concat(otherStrategies);

    return orderedStrategies;
  }

  /**
   * Given a list of urls, prepare the strategy that we think will succeed best
   *
   * Breadth first: we try each url on each compatible connection in order
   * [{connection: NativeAudio, url: url1},
   *  {connection: HLS, url: url1},
   *  {connection: Other, url: url1},
   *  {connection: NativeAudio, url: url2},
   *  {connection: HLS, url: url2},
   *  {connection: Other, url: url2}]

   * @method _prepareStandardStrategies
   * @param {Array} urlsToTry
   * @private
   * @return {Array} {connection, url}
   */

  _prepareStandardStrategies(urlsToTry, options) {
    return this._prepareStrategies(
      urlsToTry,
      this.connections,
      options
    );
  }

  /**
   * Given a list of urls and a list of connections, assemble array of
   * strategy objects to be tried in order. Each strategy object
   * should contain a connection, a connectionName, a url, and in some cases
   * a sharedAudioAccess

   * @method _prepareStrategies
   * @param {Array} urlsToTry
   * @private
   * @return {Array} {connection, url}
   */

  _prepareStrategies(urlsToTry, connectionKeys) {
    let strategies = [];
    let connectionExtraOptions = emberArray(get(this, 'options.emberStereo.connections') || []);

    urlsToTry.forEach((url) => {
      makeArray(connectionKeys).forEach((name) => {
        let connection = get(this, `_connections.${name}`);
        let canPlay = connection.canPlay(url);
        let config = connectionExtraOptions.findBy('name', name);
        if (canPlay) {
          strategies.push(new Strategy(connection, (url.url || url), config?.options));
        }
      });
      debug('ember-stereo')(
        `Compatible connections for ${url}: ${strategies.map(m => m.name).join(', ')}`
      );
    });
    return strategies;
  }

  /**
   * Creates an empty audio element and plays it to unlock audio on a mobile (iOS)
   * device at the beggining of a play event.
   *
   * @method _createAndUnlockAudio
   * @private
   * @return {element} an audio element
   */

  _createAndUnlockAudio() {
    // Audio will play automatically if is Mobile device to get around
    // autoplaying restrictions. If not, it won't autoplay because
    // IE desktop browsers can't deal with that and will suddenly
    // play the loading audio before it's ready

    return this.sharedAudioAccess.unlock();
  }

  /**
   * Attempts to play the sound after a load, which in certain cases can fail on mobile
   * @method _attemptToPlaySoundOnMobile
   * @param {Sound} sound
   * @param {Object} options
   * @private
   */

  _attemptToPlaySound(sound, options) {
    // if (this.isMobileDevice) {
      let touchPlay = () => {
        debug('ember-stereo')(`triggering sound play from document touch`);
        sound.play();
      };

      document.addEventListener('touchstart', touchPlay, { passive: true });

      let blockCheck = later(() => {
        debug('ember-stereo')(
          `Looks like the mobile browser blocked an autoplay trying to play sound with url: ${sound.url}`
        );
      }, 2000);

      sound.one('audio-played', () => {
        document.removeEventListener('touchstart', touchPlay);
        cancel(blockCheck);
      });
    // }
    sound.play(options);
  }
}
