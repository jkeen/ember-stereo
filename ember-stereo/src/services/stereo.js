import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { getOwner, setOwner } from '@ember/application';
import { A as emberArray, makeArray } from '@ember/array';
import { assert } from '@ember/debug';
import { race, task, waitForEvent, didCancel } from 'ember-concurrency';
import { next } from '@ember/runloop';
import { isTesting, macroCondition } from '@embroider/macros';
import debug from 'debug';
import { TrackedSet } from 'tracked-built-ins';

import EmberEvented from '@ember/object/evented';

import OneAtATime from '../-private/utils/one-at-a-time';
import SharedAudioAccess from '../-private/utils/shared-audio-access';
import CastCoordinator from '../-private/utils/cast-coordinator';
import SoundIdentityMap from '../-private/utils/sound-identity-map';
import Strategizer from '../-private/utils/strategizer';
import Sound from '../-private/utils/sound';
import ConnectionLoader from '../-private/utils/connection-loader';
import NativeAudioCasting from '../stereo-connections/native-audio-casting';
import Chromecast from '../stereo-connections/chromecast';
import normalizeIdentifier from '../-private/utils/normalize-identifier';
import { EVENT_MAP, SERVICE_EVENT_MAP } from '../-private/event-map';

export { EVENT_MAP, SERVICE_EVENT_MAP };

const DEFAULT_CONNECTIONS = [
  { name: 'NativeAudio' },
  { name: 'Howler' },
  { name: 'HLS' },
];

const MEDIA_SESSION_ACTIONS = [
  'play',
  'pause',
  'stop',
  'seekbackward',
  'seekforward',
  'seekto',
  'previoustrack',
  'nexttrack',
];

/**
 * This is the stereo service class.
 *
 * @class stereo
 * @constructor
 * @public
 */
export default class Stereo extends Service.extend(EmberEvented) {
  /**
   * Has the browser cleared this page to start audio without a user gesture?
   *
   * @property autoPlayAllowed
   * @type {Boolean}
   * @readOnly
   * @public
   */
  @tracked autoPlayAllowed = false;

  _identityMap = new SoundIdentityMap();
  // Tracked, unlike the identity map, since loads happen outside render.
  _sounds = new TrackedSet();
  _previewSounds = new WeakSet();

  constructor() {
    super(...arguments);
    const owner = getOwner(this);
    owner.registerOptionsForType('ember-stereo@stereo-connection', {
      instantiate: false,
    });
    owner.registerOptionsForType('stereo-connection', { instantiate: false });

    this.loadConnections();

    this.defaultVolume = this.systemStereoOptions?.initialVolume || 100;
    this.defaultPlaybackSpeed =
      this.systemStereoOptions?.defaultPlaybackSpeed || 1.0;
    this.volume = this.defaultVolume;

    this.sharedAudioAccess = new SharedAudioAccess();
    this.oneAtATime = new OneAtATime();
    this.cast = new CastCoordinator(this);
    setOwner(this.cast, owner);

    // Only exists when the host app installs ember-cli-fastboot.
    const fastboot = owner.lookup('service:fastboot');

    if (macroCondition(isTesting())) {
      // no checks for autoplay as it messes with the fake media element
    } else if (!fastboot?.isFastBoot) {
      // Both probes need a real DOM, and the service still instantiates in FastBoot.
      this._determineAutoplayPermissions();
      this.cast.detectAvailabilityTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    }

    this.isReady = true;
  }

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
   * ID3 tags read from the current sound, when its connection exposes them
   * @property currentId3Data
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
   * @public
   */
  @tracked _volume = this.defaultVolume;
  get volume() {
    return this._volume;
  }
  set volume(v) {
    if (this.currentSound) {
      debug('ember-stereo:service')(`setting current sound volume = ${v}`);
      this.currentSound._setVolume(v);
    }
    this._volume = v;
    debug('ember-stereo:service')(`setting volume = ${v}`);
    this.trigger('volume-change', v);
  }

  /**
   * Get/set the playback rate of the current sound, 1.0 being normal speed
   *
   * @property playbackSpeed
   * @type {Float}
   * @public
   */
  @tracked _playbackSpeed = this.defaultPlaybackSpeed;
  get playbackSpeed() {
    return this._playbackSpeed;
  }
  set playbackSpeed(v) {
    if (this.currentSound) {
      debug('ember-stereo:service')(`setting current sound volume = ${v}`);
      this.currentSound._setPlaybackSpeed(v);
    }
    this._playbackSpeed = v;
    debug('ember-stereo:service')(`setting playback speed = ${v}`);
    this.trigger('playback-speed-change', v);
  }

  /**
   * Get/set whether stereo should treat this as a mobile device
   *
   * @property isMobileDevice
   * @type {Boolean}
   * @public
   */

  @tracked isMobileDevice = 'ontouchstart' in window;

  /**
   * Is audio currently routed to a remote device (AirPlay/Cast)?
   * @property isCasting
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isCasting() {
    return this.cast.isCasting;
  }
  set isCasting(value) {
    this.cast.isCasting = value;
  }

  /**
   * Name of the current cast device, when the platform exposes it (WebKit
   * AirPlay does not, so this is usually null while AirPlaying).
   * @property castDeviceName
   * @type {String}
   * @readOnly
   * @public
   */
  get castDeviceName() {
    return this.cast.deviceName;
  }

  /**
   * Get/set whether stereo should route every sound through one shared audio
   * element. Forced on for mobile devices.
   *
   * @property useSharedAudioAccess
   * @type {Boolean}
   * @public
   */

  _useSharedAudioElement = false;
  get useSharedAudioAccess() {
    return (
      this._useSharedAudioElement ||
      this.isMobileDevice ||
      this.systemStereoOptions?.alwaysUseSingleAudioElement
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
    return parseInt(this.volume, 10) === 0;
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
   * Build the full option hash a Sound needs to load.
   *
   * @method prepareLoadOptions
   * @param {Object} options
   * @private
   * @return {Object}
   */

  prepareLoadOptions(options) {
    return {
      metadata: {},
      sharedAudioAccess: this._createAndUnlockAudio(),
      useSharedAudioAccess: this.useSharedAudioAccess,
      isMobileDevice: this.isMobileDevice,
      connections: this.connectionLoader.connections,
      ...options,
    };
  }

  /**
   * Tries each connection with each url and resolves to the first combination
   * that works.
   *
   * @method loadTask
   * @async
   * @param {Array|Promise} urlsOrPromise [..{Promise|String}]
   * @param {Object} options
   * @param {Object} [options.metadata] attached to the sound once it loads
   * @param {Boolean} [options.preview=false] play without becoming `currentSound`
   * @public
   * @return {Object} { sound, connection, failures }
   */

  loadTask = task({ restartable: true }, async (urlsOrPromise, _options) => {
    let options = { metadata: {}, ..._options };

    debug('ember-stereo:service')(`loadTask`, urlsOrPromise, options);

    // Key off the raw identifier so a helper watching the same promise gets the same Sound.
    let sound = this.findSound(urlsOrPromise);

    let urlsToTry = await sound.resolveUrls();
    sound = this._collapseOntoOwner(sound, urlsToTry);

    // Stamp preview intent before loading, so a connection that autoplays mid-load promotes (or not) correctly.
    if (options.preview) {
      this._previewSounds.add(sound);
    } else {
      this._previewSounds.delete(sound);
    }

    debug('ember-stereo:service')(`given urls: ${urlsToTry.join(', ')}`);
    this.trigger('pre-load', urlsToTry);

    let connection = await sound.load(_options);

    if (connection) {
      if (Object.keys(options.metadata ?? {}).length > 0) {
        sound.metadata = { ...sound.metadata, ...options.metadata };
      }

      return { sound, connection, failures: sound.failures };
    }

    let strategies = sound.strategies || [];
    if (strategies.filter((strategy) => strategy.canPlay).length === 0) {
      return this._handlePreloadError({ urlsToTry, options, strategies });
    }

    return this._handleLoadError({
      sound,
      failures: sound.failures,
      options,
    });
  });

  _soundLoadStarted(sound) {
    this._sounds.add(sound);
  }

  // Sounds call this from their audio-played funnel, however playback started.
  _soundPlayed(sound) {
    if (this._previewSounds.has(sound)) {
      return;
    }
    this.currentSound = sound;
  }

  /**
   * Given an array of URLS, return a sound ready for playing
   *
   * @method load
   * @async
   * @public
   * @param {Array|Promise} urlsOrPromise An array of urls or a promise that will resolve to an array of urls
   * @return {Object} { sound, connection, failures }
   */

  load(urlsOrPromise, options) {
    if (!urlsOrPromise) {
      return Promise.reject(new Error('[ember-stereo] load needs a url'));
    }

    options = { metadata: {}, ...options };

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
        throw e;
      }
    }
  }

  /**
   * Download what a connection needs (hls.js, howler, the Cast SDK) ahead of the
   * sound that needs it, so the first load is audio-only.
   *
   * @method prewarmConnection
   * @public
   * @param {String} connectionKey e.g. 'HLS'
   * @return {Promise}
   */

  prewarmConnection(connectionKey) {
    let connection = this._lookupConnectionClass(connectionKey);

    if (!connection) {
      debug('ember-stereo:service')(
        `can't warm unknown connection ${connectionKey}`
      );
      return Promise.resolve();
    }

    return connection.preload();
  }

  _lookupConnectionClass(connectionKey) {
    let registered =
      this.connectionLoader.get(connectionKey) ||
      this.connectionLoader.connections.find(
        (candidate) => candidate.key === connectionKey
      );

    if (registered) {
      return registered;
    }

    return [Chromecast, NativeAudioCasting].find(
      (candidate) => candidate.key === connectionKey
    );
  }

  /**
   * Given an array of URLs, return a sound and play it.
   *
   * @method playTask
   * @async
   * @public
   * @param {Array|Promise} urlsOrPromise An array of urls or a promise that will resolve to an array of urls
   * @return {Object} { sound, connection, failures }
   */

  playTask = task(
    { restartable: true },
    async (urlsOrPromise, options = {}) => {
      // Runs before the first await, so it is still inside the click that asked to play.
      this.sharedAudioAccess.unlock(this.useSharedAudioAccess);

      options = { metadata: {}, ...options };

      debug('ember-stereo:service')(`playTask`, urlsOrPromise, options);

      let previouslyPlayingSound = this.isPlaying ? this.currentSound : false;
      if (
        previouslyPlayingSound &&
        previouslyPlayingSound === this.findSound(urlsOrPromise)
      ) {
        return {
          sound: previouslyPlayingSound,
          connection: previouslyPlayingSound.connection,
          failures: previouslyPlayingSound.failures,
        };
      }

      let loadPromise = this.loadTask.linked().perform(urlsOrPromise, options);
      this.trigger('new-load-request', { loadPromise, urlsOrPromise, options });
      let { sound, connection, failures } = await loadPromise;

      if (sound) {
        this._registerEvents(sound);
        this._attemptToPlaySound(sound, options);

        if (!sound.isPlaying && !sound.isErrored) {
          await race([
            waitForEvent(sound, 'audio-played'),
            waitForEvent(sound, 'audio-load-error'),
          ]);
        }

        if (previouslyPlayingSound) {
          this.trigger('current-sound-interrupted', {
            sound: previouslyPlayingSound,
          });
        }

        if ('position' in options) {
          sound.position = options.position;
        }

        if (sound.isPlaying) {
          return { sound, connection, failures };
        } else {
          return this._handlePlaybackError({ sound, options });
        }
      } else {
        return this._handleLoadError({ failures, options });
      }
    }
  );

  _shouldSilenceErrors(options) {
    if (Object.keys(options || {}).includes('silenceErrors')) {
      return options.silenceErrors;
    } else if (
      Object.keys(this.systemStereoOptions || {}).includes('silenceErrors')
    ) {
      return this.systemStereoOptions?.silenceErrors;
    } else {
      return false;
    }
  }

  _determineAutoplayPermissions() {
    // can-autoplay crashes the FastBoot sandbox due to Blob and Audio being accessed, so import it only in a browser.
    import('can-autoplay').then(({ default: canAutoplay }) => {
      canAutoplay.audio().then(({ result }) => {
        if (result) {
          this.autoPlayAllowed = true;
        }
      });
    });
  }

  /**
   * Given an array of URLs, return a sound and play it.
   *
   * @method play
   * @async
   * @public
   * @param {Array|Promise} urlsOrPromise Provide an array of urls to try, or a promise that will resolve to an array of urls
   * @return {Object} { sound, connection, failures }
   */

  play(urlsOrPromise, options = {}) {
    if (!urlsOrPromise) {
      return Promise.reject(new Error('[ember-stereo] play needs a url'));
    }

    try {
      return this.playTask.perform(urlsOrPromise, options);
    } catch (e) {
      if (!didCancel(e)) {
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
    return this.currentSound.togglePause();
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

  resolveIdentifierTask = task({ maxConcurrency: 5 }, async (identifier) => {
    return (await this.findSound(identifier)?.resolveUrls()) ?? [];
  });

  /* ----------------------------- CASTING ------------------------------------ */

  /**
   * The cast kinds currently available.
   * @property castingTypes
   * @type {TrackedSet}
   * @readOnly
   * @public
   */
  get castingTypes() {
    return this.cast.castingTypes;
  }

  /**
   * Is casting available in this browser/network right now?
   * @property isCastingAvailable
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isCastingAvailable() {
    return this.cast.isAvailable;
  }

  /**
   * Which kind of casting is engaged: 'airplay' | 'chromecast' | null.
   * @property castKind
   * @readOnly
   * @public
   */
  get castKind() {
    return this.cast.kind;
  }

  /**
   * Icon name for the cast control.
   * @property castIconName
   * @readOnly
   * @public
   */
  get castIconName() {
    return this.cast.iconName;
  }

  get castOutletElement() {
    return this.cast.outlet.element;
  }

  /**
   * Lazily load the Google Cast SDK and wire its availability and session events.
   *
   * @method ensureChromecastSetup
   * @public
   */
  ensureChromecastSetup() {
    this.cast.ensureChromecastSetup();
  }

  /**
   * Load a sound's cast URL onto the outlet ahead of the picker click. Safari
   * won't open a picker for an element with no parsed source.
   *
   * @method prewarmCast
   * @param {Array|String|Sound} identifier the sound to prepare (defaults to current)
   * @public
   */
  prewarmCast(identifier) {
    this.cast.prewarm(identifier);
  }

  /**
   * Open the device picker for a sound. Must run synchronously inside the
   * click gesture, or Safari blocks the picker.
   *
   * @method showCastMenu
   * @param {Array|String|Sound} identifier the sound to cast (defaults to current)
   * @public
   */
  showCastMenu(identifier) {
    this.cast.showMenu(identifier);
  }

  /**
   * Hand playback back to the local device. WebKit has no programmatic
   * disconnect, so it re-opens the picker for the user to disconnect there.
   *
   * @method stopCasting
   * @public
   */
  stopCasting() {
    this.cast.stopCasting();
  }

  /* ------------------------ PRIVATE(ISH) STUFF ------------------------------ */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  config = getOwner(this).resolveRegistration('config:environment');

  get systemStereoOptions() {
    return this.config?.emberStereo;
  }

  _buildStrategies(urlsToTry, options) {
    let strategizer = new Strategizer(urlsToTry, options);
    setOwner(strategizer, getOwner(this));
    let localStrategies = [...strategizer.strategies];

    // Locals stay as fallback so a failed cast resolves instead of stranding the sound.
    if (this.cast.shouldCastUrl(options.castUrl)) {
      debug('ember-stereo:service')(
        `casting active: cast strategy (local fallback) for ${options.castUrl}`
      );
      return [
        this.cast.strategyFor(options.castUrl, options.metadata, {
          startTime: options.castStartTime,
        }),
        ...localStrategies,
      ];
    }

    return localStrategies;
  }

  _handlePlaybackError({ sound, options }) {
    let strategy = {
      url: sound.url,
      error: sound.error,
      connectionKey: sound.connectionKey,
    };

    this.trigger('audio-load-error', {
      sound,
      failures: [strategy],
      error: sound.error,
    });

    if (!this._shouldSilenceErrors(options)) {
      throw new Error(sound.error || 'stereo playback error', {
        sound,
        failures: [strategy],
      });
    }

    return {
      sound,
      connection: sound.connection,
      failures: [strategy],
      error: strategy.error,
    };
  }

  _handleLoadError({ sound, failures, options }) {
    let errorMessage = this._errorMessageFromFailures(failures);

    // Only the first failure carries the url the Sound is keyed by. Later ones are fallback urls.
    let erroredSound =
      sound ?? this.findSound(makeArray(failures)[0]?.url ?? null);

    this.trigger('audio-load-error', {
      sound: erroredSound,
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

    // No strategy ran, so nothing else will record this failure on the sound.
    let sound = this.findSound(url);
    if (sound) {
      sound.failures = [...sound.failures, failure];
    }
    this.trigger('audio-load-error', {
      sound,
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
   * The currently loaded sound. Setting it relays the new sound's events
   * through the service, drops the previous sound's, and applies system volume.
   * Can be `null`, which is how casting disengages.
   *
   * @property currentSound
   * @type {Sound}
   * @public
   */

  get currentSound() {
    return this._currentSound;
  }

  set currentSound(sound) {
    if (this.isDestroyed || this.isDestroying) {
      return; // should use ember-concurrency to cancel any pending promises in willDestroy
    }
    let previousSound = this._currentSound;
    if (previousSound === sound) {
      return;
    }

    this._unregisterEvents(previousSound);
    if (previousSound?.isPlaying) {
      this.trigger('current-sound-interrupted', { sound: previousSound });
    }

    if (sound) {
      this._registerEvents(sound);
      this._updateNowPlaying(sound);
      sound._setVolume(this.volume);
      debug('ember-stereo:service')(`setting current sound -> ${sound.url}`);
    } else {
      this._clearNowPlaying();
      debug('ember-stereo:service')(`setting current sound -> null`);
    }

    this._currentSound = sound;

    // Everything that changes the current sound notifies from here.
    this.trigger('current-sound-changed', { sound, previousSound });
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
   * The activated connections, in priority order
   *
   * @property connections
   * @type {Array}
   * @readOnly
   * @public
   */

  get connections() {
    return this.connectionLoader.connections;
  }

  /**
   * The names of the activated connections, in priority order
   *
   * @property connectionNames
   * @type {Array<String>}
   * @readOnly
   * @public
   */

  get connectionNames() {
    return this.connectionLoader.names;
  }

  /**
   * The Sounds asked to load, newest last, including loading and errored ones
   *
   * @property sounds
   * @type {Array<Sound>}
   * @readOnly
   * @public
   */

  get sounds() {
    return [...this._sounds];
  }

  /**
   * Find or create the identity-stable Sound for an identifier.
   * This returns synchronously, so the Sound may still be pending.
   *
   * @method findSound
   * @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
   * @public
   * @return {Sound}
   */

  findSound(identifier) {
    if (identifier instanceof Sound) {
      return identifier;
    }

    if (!identifier) {
      return undefined;
    }

    // A raw array identifier is a fresh instance each call, so key by its primary url string.
    let key = makeArray(identifier)[0];

    let existing = this._identityMap.find(key);
    if (existing) {
      return existing.canonical;
    }

    let sound = new Sound(identifier, { owner: getOwner(this) });
    this._identityMap.store(key, sound);

    if (typeof key?.then === 'function') {
      sound.resolveUrls().then((urls) => this._collapseOntoOwner(sound, urls));
    }

    // Reading through `canonical` consumes the tracked collapse.
    return sound.canonical;
  }

  /**
   * A promise is keyed by itself until it resolves. Once the url is known, the
   * promise has to name whichever Sound already owns that url.
   *
   * @method _collapseOntoOwner
   * @private
   * @return {Sound} the Sound that owns the url
   */

  _collapseOntoOwner(sound, urls) {
    let key = makeArray(urls)[0];
    if (!key) {
      return sound;
    }

    let owner = this._identityMap.find(key)?.canonical;
    if (!owner) {
      this._identityMap.store(key, sound);
      return sound;
    }

    if (owner !== sound) {
      sound._collapsedInto = owner;
    }
    return owner;
  }

  /**
   * Tear down everything loaded for an identifier. The Sound itself is reset
   * in place, so references to it stay valid.
   *
   * @method removeSound
   * @param {Array} identifier [..{Promise|String}]
   * @private
   */

  removeSound(identifier) {
    for (let sound of this.sounds) {
      if (!sound.hasUrl(identifier)) {
        continue;
      }

      this._sounds.delete(sound);
      sound.reset();

      if (this.currentSound === sound) {
        this.currentSound = null;
      }
    }
  }

  /**
   * Register events on a current sound. Audio events triggered on that sound
   * will be relayed and triggered on this service
   *
   * @method _registerEvents
   * @param {Sound} sound
   * @private
   */

  _registerEvents(sound) {
    let service = this;
    EVENT_MAP.forEach((item) => {
      sound.on(item.event, service, service[item.handler]);
    });
  }

  /**
   * Stop relaying a sound's audio events onto this service
   *
   * @method _unregisterEvents
   * @param {Sound} sound
   * @private
   */

  _unregisterEvents(sound) {
    if (!sound) {
      return;
    }

    let service = this;
    EVENT_MAP.forEach((item) => {
      try {
        if (sound.has(item.event)) {
          sound.off(item.event, service, service[item.handler]);
        }
      } catch (e) {
        // unregistering errors are not super important
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
      debug(
        eventName === 'audio-position-changed'
          ? 'ember-stereo:position'
          : 'ember-stereo:service'
      )(eventName, info);
    });
  }

  // Named functions so Ember Evented can successfully register/unregister them

  // The event names the state, because the next event's write can beat a read off the sound.
  _relayStateChange(info, playbackState) {
    if (info?.sound && info.sound !== this.currentSound) {
      return;
    }
    this._updateNowPlaying(this.currentSound, playbackState);
  }
  _relayPlayedEvent(info) {
    this._relayStateChange(info, 'playing');
    this._relayEvent('audio-played', info);
  }
  _relayPausedEvent(info) {
    this._relayStateChange(info, 'paused');
    this._relayEvent('audio-paused', info);
  }
  _relayEndedEvent(info) {
    this._relayStateChange(info, 'paused');
    this._relayEvent('audio-ended', info);
  }
  _relayDurationChangedEvent(info) {
    this._updatePositionStateThrottled();
    this._relayEvent('audio-duration-changed', info);
  }
  _relayPositionChangedEvent(info) {
    this._updatePositionStateThrottled();
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
    this._updateNowPlaying(this.currentSound);
    this._relayEvent('audio-metadata-changed', info);
  }

  /**
   * Updates now playing info from metadata if appropriate keys exist
   * @method _updateNowPlaying
   * @param {Object} sound
   * @private

   */
  _updateNowPlaying(sound, playbackState) {
    if (!sound) return;

    if (
      window &&
      navigator &&
      'mediaSession' in navigator &&
      'MediaMetadata' in window
    ) {
      navigator.mediaSession.playbackState =
        playbackState ?? (sound.isPlaying ? 'playing' : 'paused');

      let { title, artist, album, artwork } = sound.metadata ?? {};

      let mediaAttributes = {
        title,
        artist,
        album,
      };

      let current = navigator.mediaSession.metadata;

      if (makeArray(artwork).length > 0 && artwork[0]?.src) {
        mediaAttributes.artwork = makeArray(artwork);
      } else if (current?.artwork?.length) {
        // MediaMetadata defaults missing artwork to empty, so omitting it strips the art rather than keeping it.
        mediaAttributes.artwork = current.artwork;
      }

      // Metadata is rebuilt from scratch, so an update with nothing to say would blank the lock screen mid-playback.
      if (title || artist || album || !current) {
        navigator.mediaSession.metadata = new MediaMetadata(mediaAttributes);
      }

      this._updatePositionState(sound);

      let actions = this._mediaSessionActionsFor(sound);

      // A registered handler is what makes the OS draw the button, and null drops the control entirely.
      let handlerFor = (action, fallback, argument = (info) => info) => {
        let declined = action in actions && !actions[action];
        if (declined || (!fallback && !(action in actions))) {
          return null;
        }

        // Looked up when pressed, so overrides can register after install.
        return (info) => {
          let override = this._mediaSessionActionsFor(sound)[action];
          return override ? override(argument(info)) : fallback?.(info);
        };
      };

      let seekOffsetMs = (seekInfo) => (seekInfo?.seekOffset || 15) * 1000;
      let seekToMs = (seekInfo) => seekInfo.seekTime * 1000;

      navigator.mediaSession.setActionHandler(
        'play',
        handlerFor('play', () => {
          if (!sound.isPlaying) {
            sound.play();
          }
        })
      );
      navigator.mediaSession.setActionHandler(
        'pause',
        handlerFor('pause', () => {
          if (sound.isPlaying) {
            sound.pause();
          }
        })
      );
      navigator.mediaSession.setActionHandler(
        'stop',
        handlerFor('stop', () => sound.stop())
      );
      navigator.mediaSession.setActionHandler(
        'seekbackward',
        handlerFor(
          'seekbackward',
          (seekInfo) => {
            if (sound.isRewindable) {
              sound.rewind(seekOffsetMs(seekInfo));
            }
          },
          seekOffsetMs
        )
      );
      navigator.mediaSession.setActionHandler(
        'seekforward',
        handlerFor(
          'seekforward',
          (seekInfo) => {
            if (sound.isFastForwardable) {
              sound.fastForward(seekOffsetMs(seekInfo));
            }
          },
          seekOffsetMs
        )
      );
      navigator.mediaSession.setActionHandler(
        'seekto',
        handlerFor(
          'seekto',
          (seekInfo) => {
            if (sound.isSeekable) {
              sound.position = seekToMs(seekInfo);
            }
          },
          seekToMs
        )
      );
      // A sound has no idea what the next track is, so it's offered only when the app registered an override.
      navigator.mediaSession.setActionHandler(
        'previoustrack',
        handlerFor('previoustrack', null)
      );
      navigator.mediaSession.setActionHandler(
        'nexttrack',
        handlerFor('nexttrack', null)
      );
    }
  }

  _positionStateUpdatedAt = 0;
  // No lock screen renders finer than a second, and the OS extrapolates between updates.

  static POSITION_STATE_INTERVAL_MS = 1000;

  _mediaSessionActions = new Map();

  /**
   * Register the OS media control handlers a sound should offer, as
   * `{ nexttrack, previoustrack, ... }`. A registered handler is what makes the
   * lock screen draw that button.
   *
   * @method registerMediaSessionActions
   * @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
   * @param {Object} actions
   * @public
   */

  registerMediaSessionActions(identifier, actions) {
    this._mediaSessionActions.set(normalizeIdentifier(identifier), actions);
  }

  /**
   * Drop the media control handlers registered for an identifier
   *
   * @method unregisterMediaSessionActions
   * @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
   * @public
   */

  unregisterMediaSessionActions(identifier) {
    this._mediaSessionActions.delete(normalizeIdentifier(identifier));
  }

  _mediaSessionActionsFor(sound) {
    let registered = makeArray(sound?.urls ?? sound?.url)
      .map((url) => this._mediaSessionActions.get(normalizeIdentifier(url)))
      .find(Boolean);

    return registered ?? {};
  }

  _clearNowPlaying() {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }

    navigator.mediaSession.playbackState = 'none';
    navigator.mediaSession.metadata = null;

    try {
      navigator.mediaSession.setPositionState();
    } catch (e) {}

    MEDIA_SESSION_ACTIONS.forEach((action) => {
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch (e) {}
    });
  }

  // Without this the lock screen shows transport buttons but no timeline.
  _updatePositionState(sound) {
    if (
      !sound ||
      typeof navigator === 'undefined' ||
      !('mediaSession' in navigator) ||
      typeof navigator.mediaSession.setPositionState !== 'function'
    ) {
      return;
    }

    // An app-supplied timeline, like a live broadcast's airing window, overrides the sound's own duration.
    let timeline = sound.metadata?.timeline;
    let duration = timeline ? timeline.duration : sound.duration;

    if (
      (!timeline && !sound.isSeekable) ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      try {
        navigator.mediaSession.setPositionState();
      } catch (e) {
        // nothing to clear
      }
      return;
    }

    let reported = timeline ? timeline.position : sound.position;
    let position = Number.isFinite(reported) ? reported : 0;
    this._positionStateUpdatedAt = Date.now();

    try {
      navigator.mediaSession.setPositionState({
        duration: duration / 1000,
        position: Math.min(Math.max(position, 0), duration) / 1000,
        playbackRate: this.playbackSpeed || 1,
      });
    } catch (e) {
      // A mid-seek sound briefly reports a position past the duration, and browsers throw on that.
      debug('ember-stereo:service')(`could not set position state`, e);
    }
  }

  _updatePositionStateThrottled() {
    if (
      Date.now() - this._positionStateUpdatedAt <
      Stereo.POSITION_STATE_INTERVAL_MS
    ) {
      return;
    }

    this._updatePositionState(this.currentSound);
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

  // A blocked autoplay rejects play() with NotAllowedError, which surfaces as audio-blocked.
  _attemptToPlaySound(sound, options) {
    let touchPlay = () => {
      debug('ember-stereo:service')(
        `triggering sound play from document touch`
      );
      sound.play();
    };

    document.addEventListener('touchstart', touchPlay, { passive: true });

    sound.one('audio-played', () => {
      document.removeEventListener('touchstart', touchPlay);
    });

    sound.play(options);
  }

  willDestroy() {
    this.loadTask.cancelAll();
    this.playTask.cancelAll();
    this.cast.teardown();
  }
}
