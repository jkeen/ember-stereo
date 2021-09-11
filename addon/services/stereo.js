import { A as emberArray, makeArray } from '@ember/array';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { getOwner, setOwner } from '@ember/application';
import { later, cancel, next } from '@ember/runloop';
import {
  race,
  waitForProperty,
  didCancel,
  task,
  waitForEvent,
} from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import debug from 'debug';
import config from 'ember-get-config';
import canAutoplay from 'can-autoplay';
import Service from '@ember/service';
import Ember from 'ember';

import EmberEvented from '@ember/object/evented';
import ErrorCache from 'ember-stereo/-private/utils/error-cache';
import OneAtATime from 'ember-stereo/-private/utils/one-at-a-time';
import UrlCache from 'ember-stereo/-private/utils/url-cache';
import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import SoundCache from 'ember-stereo/-private/utils/sound-cache';
import ObjectCache from 'ember-stereo/-private/utils/object-cache';
import Strategizer from 'ember-stereo/-private/utils/strategizer';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import SoundProxy from 'ember-stereo/-private/utils/sound-proxy';
import ConnectionLoader from 'ember-stereo/-private/utils/connection-loader';

const DEFAULT_CONNECTIONS = [
  { name: 'NativeAudio' },
  { name: 'Howler' },
  { name: 'HLS' },
];

export const EVENT_MAP = [
  { event: 'audio-played', handler: '_relayPlayedEvent' },
  { event: 'audio-paused', handler: '_relayPausedEvent' },
  { event: 'audio-blocked', handler: '_relayBlockedEvent' },
  { event: 'audio-ended', handler: '_relayEndedEvent' },
  { event: 'audio-duration-changed', handler: '_relayDurationChangedEvent' },
  { event: 'audio-position-changed', handler: '_relayPositionChangedEvent' },
  { event: 'audio-loaded', handler: '_relayLoadedEvent' },
  { event: 'audio-loading', handler: '_relayLoadingEvent' },
  {
    event: 'audio-position-will-change',
    handler: '_relayPositionWillChangeEvent',
  },
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
  @tracked autoPlayAllowed = false;
  pollInterval = 500;

  constructor() {
    super(...arguments);
    const owner = getOwner(this);
    owner.registerOptionsForType('ember-stereo@stereo-connection', {
      instantiate: false,
    });
    owner.registerOptionsForType('stereo-connection', { instantiate: false });

    this.loadConnections();

    this.defaultVolume = this.systemStereoOptions?.initialVolume || 100;
    this.volume = this.defaultVolume;

    this.sharedAudioAccess = new SharedAudioAccess();
    this.oneAtATime = new OneAtATime();
    this.soundCache = new SoundCache(this);
    this.errorCache = new ErrorCache(this);
    this.urlCache = new UrlCache(this);
    this.proxyCache = new ObjectCache(this);

    this.poll = setInterval(
      this._setCurrentPosition.bind(this),
      Ember.testing ? 20 : this.pollInterval
    );

    if (!Ember.testing) {
      this._determineAutoplayPermissions();
    }
    this.isReady = true;
  }

  /** currently loaded {Sound} object
   * @property currentSound
   * @type {Sound}
   * @public
   */
  @tracked _currentSound = null;

  /**
   * is user input needed to allow an autoplay request?
   * @property isBlocked
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isBlocked() {
    return this.currentSound?.isBlocked || false;
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
    return (
      this.loadTask.isRunning ||
      (this.currentSound && this.currentSound.isLoading)
    );
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
   * is the current sound seekable?
   * @property isSeekable
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isSeekable() {
    return (
      this.currentSound?.isFastForwardable || this.currentSound?.isRewindable
    );
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
 * Gets the current sound currentTime (only available on some sounds, like HLS streams with annotated time values)
 * @property currentTime
 * @type {Object}
 * @readOnly
 * @public
 */
  get currentTime() {
    return this.currentSound?.currentTime;
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
      debug('ember-stereo')(`setting current sound volume = ${v}`);
      this.currentSound._setVolume(v);
    }
    this._volume = v;
    debug('ember-stereo')(`setting volume = ${v}`);
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
  }

  /**
   * get if hifi should use a shared audio element
   *
   * @property useSharedAudioAccess
   * @type {Boolean}

  */

  _useSharedAudioElement = false;
  get useSharedAudioAccess() {
    return (
      this._useSharedAudioElement ||
      this.isMobileDevice ||
      this.systemStereoOptions.alwaysUseSingleAudioElement
    );
  }
  set useSharedAudioAccess(value) {
    this._useSharedAudioElement = value;
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
      this.volume = this.unmuteVolume > 0 ? this.unmuteVolume : 100;
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

  prepareLoadOptions(options) {
    return assign(
      {
        metadata: {},
        sharedAudioAccess: this._createAndUnlockAudio(),
        useSharedAudioAccess: this.useSharedAudioAccess,
        isMobileDevice: this.isMobileDevice,
        connections: this.connectionLoader.connections,
      },
      options
    );
  }

  @task({ restartable: true, evented: true })
  *loadTask(urlsOrPromise, _options) {
    let options = this.prepareLoadOptions(_options);
    let urlsToTry = yield this.urlCache.resolve(urlsOrPromise);
    debug('ember-stereo')(`given urls: ${urlsToTry.join(', ')}`);
    this.trigger('pre-load', urlsToTry);
    this.errorCache.remove(urlsToTry);

    var sound = this.soundCache.find(urlsToTry);
    if (sound) {
      debug('ember-stereo')('retreived sound from cache');
      return yield { sound };
    } else {
      // TODO: refactor so it's more like this
      // let strategizer = new Strategizer(urlsToTry, options)
      // let { sound, error } = yield strategizer.tryLoading()
      // if (sound) {
      //  this.handleCurrentSoundTransition.perform(sound)
      //  this.soundCache.cache(sound);
      //  this.oneAtATime.register(sound)
      // }

      try {
        var strategies = this._buildStrategies(urlsToTry, options);

        if (strategies.filter((s) => s.canPlay).length == 0) {
          return this._handlePreloadError({ urlsToTry, options, strategies });
        }
      } catch (e) {
        return this._handlePreloadError({
          urlsToTry,
          options,
          strategies: strategies || [],
        });
      }

      var success = false;
      let failures = [];

      for (let strategy of strategies) {
        if (strategy.canPlay) {
          // worth trying
          let result = yield this.tryLoadingSound
            .perform(strategy)
            .catch((e) => {
              strategy.error = e;
            });
          if (result.error) {
            strategy.error = result.error;
            failures.push(strategy);
          }
          if (result.sound) {
            debug('ember-stereo')(`firing sound-ready for ${result.sound.url}`);
            this.trigger('sound-ready', { sound: result.sound });
            sound = result.sound;
            sound._debug = strategies;
            success = true;
            break;
          }
        }
      }

      if (success && sound) {
        // eslint-disable-next-line ember-concurrency/no-perform-without-catch
        this.handleCurrentSoundTransition.perform(sound);

        sound.metadata = options.metadata; // set current sound metadata
        this.soundCache.cache(sound);
        this.oneAtATime.register(sound); // On audio-played this pauses all the other sounds. One at a time!
        return { sound, failures };
      } else {
        return this._handleLoadError({
          urlsToTry,
          failures,
          options,
          strategies: strategies,
        });
      }
    }
  }

  @task
  *handleCurrentSoundTransition(sound) {
    while (true) {
      yield waitForEvent(sound, 'audio-played');
      debug('ember-stereo')('handling sound transition');

      let previousSound = this.currentSound;
      let currentSound = sound;

      if (previousSound !== currentSound) {
        if (previousSound?.isPlaying) {
          this.trigger('current-sound-interrupted', { sound: previousSound });
        }
        this.trigger('current-sound-changed', {
          sound: currentSound,
          previousSound,
        });
        this.currentSound = sound;
      }
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
      this.trigger('new-load-request', {
        loadPromise: promise,
        urlsOrPromise,
        options,
      });

      return promise;
    } catch (e) {
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

  @task({ restartable: true })
  *playTask(urlsOrPromise, options = {}) {
    options = assign({ metadata: {} }, options);

    let previouslyPlayingSound = this.isPlaying ? this.currentSound : false

    let loadPromise = this.loadTask.perform(urlsOrPromise, options);
    this.trigger('new-load-request', { loadPromise, urlsOrPromise, options }); //urls: Promise.resolve(resolveUrls(urlsOrPromise))
    let { sound, failures } = yield loadPromise;

    if (sound) {
      this._registerEvents(sound);
      this._attemptToPlaySound(sound, options);

      yield race([
        waitForProperty(sound, 'isPlaying'),
        waitForProperty(sound, 'isErrored'),
      ]);

      if (previouslyPlayingSound) {
        this.trigger('current-sound-interrupted', { sound: previouslyPlayingSound });
      }

      if (sound && 'position' in options) {
        sound.position = options.position;
      }

      if (sound.isPlaying) {
        return { sound, failures };
      } else {
        return this._handlePlaybackError({ sound, options });
      }
    } else {
      return this._handleLoadError({ failures, options });
    }
  }

  _shouldSilenceErrors(options) {
    if (Object.keys(options || {}).includes('silenceErrors')) {
      return options.silenceErrors;
    } else if (
      Object.keys(this.systemStereoOptions || {}).includes('silenceErrors')
    ) {
      return this.systemStereoOptions.silenceErrors;
    } else {
      return false;
    }
  }

  _determineAutoplayPermissions() {
    canAutoplay.audio().then(({ result }) => {
      if (result) {
        this.autoPlayAllowed = true;
      }
    });
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
      return this.playTask.perform(urlsOrPromise, options);
    } catch (e) {
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
    this.loadTask.cancelAll();
    this.playTask.cancelAll();

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
      return this.currentSound.pause();
    } else {
      return this.currentSound.play();
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

  @task({ maxConcurrency: 5 })
  *resolveIdentifier(identifier) {
    return yield this.urlCache.resolve(identifier);
  }

  /* ------------------------ PRIVATE(ISH) STUFF ------------------------------ */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  get systemStereoOptions() {
    return config?.emberStereo;
  }

  _buildStrategies(urlsToTry, options) {
    return new Strategizer(urlsToTry, options).strategies;
  }

  _handlePlaybackError({ sound, options }) {
    let strategy = {
      url: sound.url,
      error: sound.error,
      connectionKey: sound.connectionKey,
    };
    this.errorCache.cache({
      url: sound.url,
      error: sound.error,
      connectionKey: sound.connectionKey,
    });
    this.trigger('audio-load-error', {
      sound: sound,
      failures: [strategy],
      error: sound.error,
    });

    if (!this._shouldSilenceErrors(options)) {
      throw new Error(sound.error || 'stereo playback error', {
        sound,
        failures: [strategy],
      });
    }

    return { sound, failures: [strategy], error: strategy.error };
  }

  _handleLoadError({ /* urlsToTry */ failures, options, strategies }) {
    let errorMessage = this._errorMessageFromFailures(failures);

    let url = null;
    makeArray(failures).forEach((sound) => {
      this.errorCache.cache({
        url: sound.url,
        error: sound.error,
        connectionKey: sound.connectionKey,
        debugInfo: strategies,
      });
      url = sound.url;
    });
    this.trigger('audio-load-error', {
      sound: { url },
      failures: failures,
      error: errorMessage,
    });

    if (!this._shouldSilenceErrors(options)) {
      throw new Error(errorMessage || 'stereo load error', { failures });
    }
    return { failures, error: errorMessage };
  }

  _handlePreloadError({ urlsToTry, options, strategies }) {
    let errorMessage = 'no connections responded';
    let url = makeArray(urlsToTry)[0];
    let failure = {
      url,
      error: errorMessage,
      connectionKey: null,
      debugInfo: strategies,
    };

    if (!this._shouldSilenceErrors(options)) {
      throw new Error(errorMessage, failure);
    }

    this.errorCache.cache(failure);
    this.trigger('audio-load-error', {
      sound: { url },
      failures: [failure],
      error: errorMessage,
    });

    return { failures: [failure], error: errorMessage };
  }

  _errorMessageFromFailures(failures) {
    let nativeAudioFailure = makeArray(failures).find(
      (failure) => failure.connectionKey === 'NativeAudio'
    );
    let errorMessage = '';

    if (nativeAudioFailure) {
      errorMessage = nativeAudioFailure.error;
    } else {
      errorMessage = makeArray(failures)
        .map((f) => f.error)
        .filter((f) => f.toString().length > 0)[0];
    }

    return errorMessage;
  }

  /**
   * Set the current sound and wire up all the events the sound fires so they
   * trigger through the service, remove the ones on the previous current sound,
   * and set the new current sound to the system volume
   * @method currentSound
   * @param {Sound} sound
   * @private
   */

  get currentSound() {
    return this._currentSound;
  }

  set currentSound(sound) {
    if (this.isDestroyed || this.isDestroying) {
      return; // should use ember-concurrency to cancel any pending promises in willDestroy
    }
    this._unregisterEvents(this._currentSound);
    this._registerEvents(sound);
    sound._setVolume(this.volume);
    this._currentSound = sound;
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

  loadConnections(
    connections = this.systemStereoOptions?.connections ||
      emberArray(DEFAULT_CONNECTIONS)
  ) {
    this.connectionLoader = new ConnectionLoader(this, connections);
    setOwner(this.connectionLoader, getOwner(this));
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
    return this.connectionLoader.connections;
  }

  get connectionNames() {
    return this.connectionLoader.names;
  }

  get loadedUrls() {
    return this.soundCache.cachedList;
  }

  get loadedSounds() {
    return this.soundCache.cachedSounds;
  }

  get cachedErrors() {
    return this.errorCache.cachedErrors;
  }

  /**
   * Given a sound, a url, or an object with a URL property, return a sound ready for playing
   *
   * @method findLoadedSound
   * @param {Array} identifiers [..{Promise|String}]
   * @private
   * @return {Sound} A sound that's ready to be played, or an error
   */

  findLoadedSound(identifiers) {
    return this.soundCache.find(identifiers);
  }

  findSound(identifier) {
    return this.soundProxy(identifier)?.value;

    //TODO: use a Proxy? it'd be neat to be able to 'find' a sound
    // that isn't loaded and attach events to it.

    // let soundProxy = this.soundProxy(identifier).value

    // return new Proxy(soundProxy, {
    //   get: function (target, prop, receiver) {
    //     if (target.value) {
    //       return Reflect.get(...[target.value, prop, receiver]);
    //     } else {
    //       return Reflect.get(...arguments);
    //     }
    //   }
    // });
  }

  soundProxy(identifier) {
    if (this.proxyCache.has(identifier)) {
      return this.proxyCache.find(identifier);
    } else if (identifier) {
      let soundProxy = new SoundProxy(identifier, this);
      this.proxyCache.store(identifier, soundProxy);
      return soundProxy;
    }
  }

  /**
   * Given a sound, a url, or an object with a URL property, return a sound ready for playing
   *
   * @method removeSound
   * @async
   * @param {Array} identifier [..{Promise|String}]
   * @private
   * @return {Sound} A sound that's ready to be played, or an error
   */

  removeSound(identifier) {
    let url = new StereoUrl(identifier).url;

    this.soundCache.remove(url);
    this.errorCache.remove(url);
    this.proxyCache.remove(url);

    if (this.currentSound?.url === url) {
      this._unregisterEvents(this.currentSound);
      this.currentSound = null;
    }
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
    debug('ember-stereo')(
      `SUCCESS: [${strategy.connectionName}] -> (${strategy.url})`
    );
    strategy.success = true;
    return { sound };
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
    debug('ember-stereo')(
      `FAILED: [${strategy.connectionName}] -> ${sound.error} (${strategy.url})`
    );
    this._unregisterEvents(sound);
    strategy.error = sound.error;
    let result = { error: sound.error }

    return result;
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
    var newSound = strategy.createSound();
    this._registerEvents(newSound);

    debug('ember-stereo')(
      `TRYING: [${strategy.connectionName}] -> ${strategy.url}`
    );
    strategy.tried = true;
    return yield race([
      this.waitForSuccess.perform(strategy, newSound),
      this.waitForFailure.perform(strategy, newSound),
    ]);
  }

  /**
   * Sets the current sound with its current position, so the sound doesn't have
   * to deal with timers. The service runs the show.
   *
   * @method _setCurrentPosition
   * @private
   */

  _setCurrentPosition() {
    let sound = this._currentSound;
    if (sound) {
      try {
        let newPosition = sound._currentPosition();
        if (sound._position != newPosition) {
          sound._position = newPosition;
        }
      } catch (e) {
        console.error(e);
        // continue regardless of error
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
    });
  }

  // Named functions so Ember Evented can successfully register/unregister them

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
  _relayBlockedEvent(info) {
    this._relayEvent('audio-blocked', info);
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
   * @method _attemptToPlaySound
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
      sound.isBlocked = true;
      sound.trigger('audio-blocked');
    }, 2000);

    sound.one('audio-load-error', () => { });

    sound.one('audio-played', () => {
      document.removeEventListener('touchstart', touchPlay);
      cancel(blockCheck);
    });
    // }
    sound.play(options);
  }

  willDestroy() {
    clearInterval(this.poll);
    this.loadTask.cancelAll();
    this.playTask.cancelAll();
  }
}
