import { later, cancel } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import { assign } from '@ember/polyfills';
import { getOwner } from '@ember/application';
import Evented from '@ember/object/evented';
import SoundCache from 'ember-hifi/utils/sound-cache';
import ErrorCache from 'ember-hifi/utils/error-cache';
import Service, { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { bind } from '@ember/runloop';
import debug from 'debug';
import { next } from '@ember/runloop';
import SharedAudioAccess from 'ember-hifi/utils/shared-audio-access';
import { Promise } from 'rsvp';

const log = debug('ember-hifi');
import { set, get, getProperties, computed } from '@ember/object';
import { or, readOnly, equal, reads, alias } from '@ember/object/computed';
import { A as emberArray, makeArray } from '@ember/array';
import { dasherize } from '@ember/string';
import OneAtATime from '../utils/one-at-a-time';
import RSVP from 'rsvp';
import PromiseRace from '../utils/promise-race';
import { tracked } from '@glimmer/tracking';
const DEFAULT_CONNECTIONS = [{ name: 'NativeAudio' }];

export const EVENT_MAP = [
  { event: 'audio-played', handler: '_relayPlayedEvent' },
  { event: 'audio-paused', handler: '_relayPausedEvent' },
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
 * This is the hifi service class.
 *
 * @class hifi
 * @constructor
 */
export default class Hifi extends Service.extend(Evented) {
  @service poll;
  @service hifiSync;

  @tracked currentSound = null;
  @tracked errorCache = null;

  /**
   * When the Service is created, activate connections that were specified in the
   * configuration. This config is injected into the Service as `options`.
   *
   * @method init
   */

  init() {
    const owner = getOwner(this);
    owner.registerOptionsForType('ember-hifi@hifi-connection', {
      instantiate: false,
    });
    owner.registerOptionsForType('hifi-connection', { instantiate: false });

    this.loadConnections();

    this.alwaysUseSingleAudioElement = !!get(
      this,
      'options.emberHifi.alwaysUseSingleAudioElement'
    );
    this.appEnvironment = get(this, 'options.environment') || 'development';
    this.defaultVolume = get(this, 'options.emberHifi.initialVolume') || 100;
    this.sharedAudioAccess = new SharedAudioAccess();
    this.oneAtATime = new OneAtATime();
    this.soundCache = new SoundCache(this);
    this.errorCache = new ErrorCache(this);

    this.volume = this.defaultVolume;
    // this.volume                      = get(this, 'options.emberHifi.initialVolume') || 100;
    this.isReady = true;

    // Polls the current sound for position. We wanted to make it easy/flexible
    // for connection authors, and since we only play one sound at a time, we don't
    // need other non-active sounds telling us position info
    this.poll.addPoll({
      interval: this.pollInterval || 500,
      callback: bind(this, this._setCurrentPosition),
    });

    super.init(...arguments);
  }

  get isMobileDevice() {
    return this._isMobileDevice || 'ontouchstart' in window;
  }
  set isMobileDevice(v) {
    this._isMobileDevice = v;
    return v;
  }

  get useSharedAudioAccess() {
    return this.isMobileDevice || this.alwaysUseSingleAudioElement;
  }

  get id3TagMetadata() {
    return this.currentSound?.id3TagMetadata;
  }

  get currentMetadata() {
    return this.currentSound?.metadata;
  }

  get isPlaying() {
    return this.currentSound?.isPlaying || false;
  }

  get isLoading() {
    return this._isLoading || false;
  }
  set isLoading(v) {
    this._isLoading = v;
  }

  get isStream() {
    return this.currentSound?.isStream;
  }

  get isFastForwardable() {
    return this.currentSound?.isFastForwardable;
  }

  get isRewindable() {
    return this.currentSound?.isRewindable;
  }

  get isMuted() {
    return this.volume === 0;
  }

  get duration() {
    return this.currentSound?.duration;
  }

  get percentLoaded() {
    return this.currentSound?.percentLoaded;
  }

  get pollInterval() {
    return (
      this._pollInterval || get(this, 'options.emberHifi.positionInterval')
    );
  }
  set pollInterval(p) {
    this._pollInterval = p;
  }

  get position() {
    return this.currentSound?.position;
  }
  set position(v) {
    this.currentSound.position = v;
  }

  _volume = this.defaultVolume;
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
   * Toggles mute state. Sets volume to zero on mute, resets volume to the last level it was before mute, unless
   * unless the last level was zero, in which case it sets it to the default volume
   *
   * @method toggleMute
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
   * Returns the list of activated and available connections
   *
   * @method loadConnections
   * @return {Array}
   */

  loadConnections(connections = get(this, 'options.emberHifi.connections')) {
    if (!connections) {
      connections = emberArray(DEFAULT_CONNECTIONS);
    }
    this._connections = {};
    this._activateConnections(connections);
  }

  /**
   * Returns the list of activated and available connections
   *
   * @method availableConnections
   * @return {Array}
   */

  get availableConnections() {
    return Object.keys(this._connections);
  }

  /**
   * Given a sound, a url, or an object with a URL property, return a sound ready for playing
   *
   * @method findLoaded
   * @async
   * @param identifier [..{Promise|String}]
   * Provide an array of urls to try, or a promise that will resolve to an array of urls
   * @return {Sound} A sound that's ready to be played, or an error
   */

  findLoaded(identifiers) {
    var sound;

    makeArray(identifiers).forEach((identifier) => {
      if (!sound) {
        if (identifier && identifier.url) {
          sound = this.soundCache.find(identifier.url);
        } else if (identifier) {
          sound = this.soundCache.find(identifier.toString());
        }
      }
    });

    return sound;
  }

  /**
   * Given an array of URLS, return a sound ready for playing
   *
   * @method load
   * @async
   * @param urlsOrPromise [..{Promise|String}]
   * Provide an array of urls to try, or a promise that will resolve to an array of urls
   * @return {Sound} A sound that's ready to be played, or an error
   */

  load(urlsOrPromise, options) {
    var sharedAudioAccess = this._createAndUnlockAudio();

    options = assign({ metadata: {}, sharedAudioAccess }, options);
    this.isLoading = true;

    let promise = new Promise((resolve, reject) => {
      return this._resolveUrls(urlsOrPromise).then((urlsToTry) => {
        if (isEmpty(urlsToTry)) {
          return reject(new Error('[ember-hifi] URLs must be provided'));
        }

        this.trigger('pre-load', urlsToTry);
        let sound = this.soundCache.find(urlsToTry);
        if (sound) {
          debug('ember-hifi')('retreived sound from cache');
          return resolve({ sound });
        } else {
          let strategies = this._prepareAllStrategies(urlsToTry, options);
          let search = this._findFirstPlayableSound(strategies, options);
          search.then((results) => {
            resolve({ sound: results.success, failures: results.failures })
          });
          search.catch((failures) => {
            failures.forEach((strategy) => {
              this.errorCache.cache({
                url: strategy.url,
                error: strategy.error,
                connectionKey: strategy.connectionKey,
              });
            });
            this.trigger('audio-load-error', {
              url: urlsToTry,
              failures,
            });
            // reset the UI since trying to play that sound failed
            // let err = new Error(`[ember-hifi] URL Promise failed because`);

            resolve({ failures });
          });
          search.finally(() => (this.isLoading = false));

          return search;
        }
      });
    });

    this.trigger('new-load-request', {
      loadPromise: promise,
      urlsOrPromise,
      options,
    });

    promise.then(({ sound }) => {
      sound.metadata = options.metadata;
    });
    promise.then(({ sound }) => this.soundCache.cache(sound));

    // On audio-played this pauses all the other sounds. One at a time!
    promise.then(({ sound }) => this.oneAtATime.register(sound));

    promise.then(({ sound }) =>
      sound.on('audio-played', () => {
        let previousSound = this.currentSound;
        let currentSound = sound;

        if (previousSound !== currentSound) {
          if (previousSound?.isPlaying) {
            this.trigger('current-sound-interrupted', previousSound);
          }

          this.trigger('current-sound-changed', currentSound, previousSound);
          this.setCurrentSound(sound);
        }
      })
    );

    return promise;
  }

  /**
   * Given an array of URLs, return a sound and play it.
   *
   * @method play
   * @async
   * @param urlsOrPromise [..{Promise|String}]
   * Provide an array of urls to try, or a promise that will resolve to an array of urls
   * @return {Sound} A sound that's playing, or an error
   */

  play(urlsOrPromise, options = {}) {
    if (this.isPlaying) {
      this.trigger('current-sound-interrupted', this.currentSound);
      this.pause();
    }
    // update the UI immediately while `.load` figures out which sound is playable
    this.isLoading = true;
    let load = this.load(urlsOrPromise, options);

    // We want to keep this chainable elsewhere
    return new Promise((resolve, reject) => {
      load.then(({ sound, failures }) => {
        debug('ember-hifi')('Finished load, trying to play sound');
        sound.one('audio-played', () => resolve({ sound, failures }));

        this._registerEvents(sound);
        this._attemptToPlaySound(sound, options);
      });
      load.catch(reject);
    });
  }

  /**
   * Pauses the current sound
   *
   * @method pause
   */

  pause() {
    assert('[ember-hifi] Nothing is playing.', this.currentSound);
    this.currentSound.pause();
  }

  /**
   * Stops the current sound
   *
   * @method stop
   */

  stop() {
    assert('[ember-hifi] Nothing is playing.', this.currentSound);
    this.currentSound.stop();
  }

  /**
   * Toggles play/pause state of the current sound
   *
   * @method togglePause
   */

  togglePause() {
    assert('[ember-hifi] Nothing is playing.', this.currentSound);
    if (this.isPlaying) {
      this.currentSound.pause();
    } else {
      this.isLoading = true;
      this.currentSound.play();
    }
  }

  /**
   * Fast forwards current sound if able
   *
   * @method fastForward
   * @param {Integer} duration in ms
   */

  fastForward(duration) {
    assert('[ember-hifi] Nothing is playing.', this.currentSound);
    this.currentSound.fastForward(duration);
  }

  /**
   * Rewinds current sound if able
   *
   * @method rewind
   * @param {Integer} duration in ms
   */

  rewind(duration) {
    assert('[ember-hifi] Nothing is playing.', this.currentSound);
    this.currentSound.rewind(duration);
  }

  /**
   * Set the current sound and wire up all the events the sound fires so they
   * trigger through the service, remove the ones on the previous current sound,
   * and set the new current sound to the system volume
   *
   * @method setCurrentSound
   * @param {Sound} sound
   */

  setCurrentSound(sound) {
    if (this.isDestroyed || this.isDestroying) {
      return; // should use ember-concurrency to cancel any pending promises in willDestroy
    }
    this._unregisterEvents(this.currentSound);
    this._registerEvents(sound);

    sound._setVolume(this.volume);
    this.currentSound = sound;
    debug('ember-hifi')(`setting current sound -> ${sound.url}`);
  }

  /* ------------------------ PRIVATE(ISH) METHODS ---------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  /**
   * Prepares the strategies to attempt to play the sound
   *
   * @method _prepareAllStrategies
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
   * @method _setCurrentSoundForPosition
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
   * @method relayEvent
   * @param {String, Object} eventName, sound
   * @private
   */

  _relayEvent(eventName, sound, info = {}) {
    // next(() => {
    this.trigger(eventName, sound, info);
    debug('ember-hifi')(eventName, sound);
    // })
  }

  /**
    Named functions so Ember Evented can successfully register/unregister them
  */

  _relayPlayedEvent(sound) {
    this._relayEvent('audio-played', sound);
  }
  _relayPausedEvent(sound) {
    this._relayEvent('audio-paused', sound);
  }
  _relayEndedEvent(sound) {
    this._relayEvent('audio-ended', sound);
  }
  _relayDurationChangedEvent(sound) {
    this._relayEvent('audio-duration-changed', sound);
  }
  _relayPositionChangedEvent(sound) {
    this._relayEvent('audio-position-changed', sound);
  }
  _relayLoadedEvent(sound) {
    this._relayEvent('audio-loaded', sound);
  }
  _relayLoadingEvent(sound) {
    this._relayEvent('audio-loading', sound);
  }
  _relayPositionWillChangeEvent(sound, info = {}) {
    this._relayEvent('audio-position-will-change', sound, info);
  }
  _relayWillRewindEvent(sound, info) {
    this._relayEvent('audio-will-rewind', sound, info);
  }
  _relayWillFastForwardEvent(sound, info) {
    this._relayEvent('audio-will-fast-forward', sound, info);
  }
  _relayMetadataChangedEvent(sound, info) {
    this._relayEvent('audio-metadata-changed', sound, info);
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
      const { name } = connectionOption;
      const connection = cachedConnections[name]
        ? cachedConnections[name]
        : this._activateConnection(connectionOption);

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
    assert('[ember-hifi] Could not find hifi connection ${name}.', name);
    Connection.setup(config);
    return Connection;
  }

  /**
   * Looks up the connection from the container. Prioritizes the consuming app's
   * connections over the addon's connections.
   *
   * @method _lookupConnection
   * @param {string} connectionName
   * @private
   * @return {Connection} a local connection or a connection from the addon
   */

  _lookupConnection(connectionName) {
    assert(
      '[ember-hifi] Could not find a hifi connection without a name.',
      connectionName
    );

    const dasherizedConnectionName = dasherize(connectionName);
    const availableConnection = getOwner(this).lookup(
      `ember-hifi@hifi-connection:${dasherizedConnectionName}`
    );
    const localConnection = getOwner(this).lookup(
      `hifi-connection:${dasherizedConnectionName}`
    );

    assert(
      `[ember-hifi] Could not load hifi connection ${dasherizedConnectionName}`,
      localConnection || availableConnection
    );

    return localConnection ? localConnection : availableConnection;
  }

  /**
   * URLs given to load or play may be a promise, resolve this promise and get the urls
   * or promisify an array/string and
   * @method _resolveUrls
   * @param {Array or String or Promise} urlOrPromise
   * @private
   * @return {Promise.<urls>} a promise resolving to a cleaned up array of URLS
   */

  async _resolveUrls(urlsOrPromise) {
    debug('ember-hifi')(`resolve urls: ${urlsOrPromise}`);
    let prepare = (urls) => {
      return emberArray(makeArray(urls).map((u) => u.toString()))
        .uniq()
        .reject((i) => isEmpty(i));
    };

    if (urlsOrPromise && urlsOrPromise.then) {
      debug('ember-hifi')('#load passed URL promise');
    }

    let urls = await Promise.resolve(urlsOrPromise);
    urls = prepare(urls);
    debug('ember-hifi')(`given urls: ${urls.join(', ')}`);
    return urls;
  }

  /**
   * Given an array of strategies with {connection, url} try the connection and url
   * return the first thing that works
   *
   * @method _findFirstPlayableSound
   * @param {Array} urlsToTry
   * @private
   * @return {Promise.<Sound|error>} A sound that's ready to be played, or an error with a failures property
   */

  _findFirstPlayableSound(strategies, options) {
    debug('ember-hifi')('start: _findFirstPlayableSound');

    let promise = PromiseRace.start(
      strategies,
      (strategy, returnSuccess, markAsFailure) => {
        let Connection = strategy.connection;
        let connectionOptions = getProperties(
          strategy,
          'url',
          'connectionName',
          'sharedAudioAccess',
          'options'
        );
        connectionOptions.container = getOwner(this);
        let sound = new Connection(connectionOptions);

        this._registerEvents(sound);

        debug('ember-hifi')(
          `TRYING: [${strategy.connectionName}] -> ${strategy.url}`
        );

        sound.one('audio-load-error', (error) => {
          strategy.error = error;
          this._unregisterEvents(sound);
          markAsFailure(strategy);
          debug('ember-hifi')(
            `FAILED: [${strategy.connectionName}] -> ${error} (${strategy.url})`
          );
        });

        sound.one('audio-ready', () => {
          returnSuccess(sound);
          debug('ember-hifi')(
            `SUCCESS: [${strategy.connectionName}] -> (${strategy.url})`
          );
        });
      }
    );

    promise.finally(() =>
      debug('ember-hifi')(`finish: _findFirstPlayableSound`)
    );

    return promise;
  }

  /**
   * Given some urls, it prepares an array of connection and url pairs to try
   *
   * @method _prepareParamsForLoadWorkingAudio
   * @param {Array} urlsToTry
   * @private
   * @return {Array} {connection, url}
   */

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
    debug('ember-hifi')(
      'modifying standard strategy for to work best on mobile'
    );

    let nativeStrategies = emberArray(strategies).filter(
      (s) => s.connectionKey === 'NativeAudio'
    );
    let otherStrategies = emberArray(strategies).reject(
      (s) => s.connectionKey === 'NativeAudio'
    );
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
      this.availableConnections,
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
    connectionKeys = makeArray(connectionKeys);
    let strategies = [];
    let connectionOptions = get(this, 'options.emberHifi.connections') || [];
    connectionOptions = emberArray(connectionOptions);

    urlsToTry.forEach((url) => {
      let connectionSuccesses = [];
      connectionKeys.forEach(async (name) => {
        let connection = get(this, `_connections.${name}`);
        let config = connectionOptions.findBy('name', name);
        let canPlay = connection.canPlay(url);
        if (canPlay) {
          connectionSuccesses.push(name);
          strategies.push({
            connectionName: connection.toString(),
            connectionKey: name,
            connection: connection,
            url: url.url || url,
            options: config ? config.options : null,
          });
        }
      });
      debug('ember-hifi')(
        `Compatible connections for ${url}: ${connectionSuccesses.join(', ')}`
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

    return this.sharedAudioAccess.unlock(this.isMobileDevice);
  }

  /**
   * Attempts to play the sound after a load, which in certain cases can fail on mobile
   * @method _attemptToPlaySoundOnMobile
   * @param {Sound} sound
   * @private
   */

  _attemptToPlaySound(sound, options) {
    if (this.isMobileDevice) {
      let touchPlay = () => {
        debug('ember-hifi')(`triggering sound play from document touch`);
        sound.play();
      };

      document.addEventListener('touchstart', touchPlay, { passive: true });

      let blockCheck = later(() => {
        debug('ember-hifi')(
          `Looks like the mobile browser blocked an autoplay trying to play sound with url: ${sound.url}`
        );
      }, 2000);

      sound.one('audio-played', () => {
        document.removeEventListener('touchstart', touchPlay);
        cancel(blockCheck);
      });
    }
    sound.play(options);
  }
}
