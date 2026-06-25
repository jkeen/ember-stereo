import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { getOwner, setOwner } from '@ember/application';
import { A as emberArray, makeArray } from '@ember/array';
import { assert } from '@ember/debug';
import {
  race,
  task,
  timeout,
  forever,
  waitForProperty,
  waitForEvent,
  didCancel,
} from 'ember-concurrency';
import { cancel, later, next } from '@ember/runloop';
import { isTesting, macroCondition } from '@embroider/macros';
import canAutoplay from 'can-autoplay';
import debug from 'debug';
import config from 'ember-get-config';
import { TrackedSet } from 'tracked-built-ins';

import EmberEvented from '@ember/object/evented';
import ErrorCache from '../-private/utils/error-cache';
import OneAtATime from '../-private/utils/one-at-a-time';
import UrlCache from '../-private/utils/url-cache';
import MetadataCache from '../-private/utils/metadata-cache';
import SharedAudioAccess from '../-private/utils/shared-audio-access';
import SoundCache from '../-private/utils/sound-cache';
import UntrackedObjectCache from '../-private/utils/untracked-object-cache';
import Strategizer from '../-private/utils/strategizer';
import Strategy from '../-private/utils/strategy';
import StereoUrl from '../-private/utils/stereo-url';
import Sound from '../-private/utils/sound';
import ConnectionLoader from '../-private/utils/connection-loader';
import BaseSound from '../stereo-connections/base';
import NativeAudioCasting from '../stereo-connections/native-audio-casting';
import hasEqualUrls from '../-private/utils/has-equal-urls';
import { EVENT_MAP, SERVICE_EVENT_MAP } from '../-private/utils/event-map';

export { EVENT_MAP, SERVICE_EVENT_MAP };

const DEFAULT_CONNECTIONS = [
  { name: 'NativeAudio' },
  { name: 'Howler' },
  { name: 'HLS' },
];

/**
 * This is the stereo service class.
 *
 * @class stereo
 * @constructor
 */
export default class Stereo extends Service.extend(EmberEvented) {
  @tracked autoPlayAllowed = false;

  @tracked soundCache = new SoundCache();
  @tracked errorCache = new ErrorCache();
  @tracked metadataCache = new MetadataCache();
  @tracked urlCache = new UrlCache();
  // Identity-stable Sound entities, one per identifier. Untracked to avoid
  // render thrash.
  soundEntityCache = new UntrackedObjectCache();
  // Sounds that already have a current-sound transition loop running, so
  // repeated (cache-hit) loads don't spawn duplicate loops.
  _soundsWithTransition = new WeakSet();

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

    setOwner(this.oneAtATime, owner);
    setOwner(this.soundCache, owner);
    setOwner(this.errorCache, owner);
    setOwner(this.metadataCache, owner);
    setOwner(this.urlCache, owner);
    setOwner(this.soundEntityCache, owner);

    if (macroCondition(isTesting())) {
      // no checks for autoplay as it messes with the fake media element
    } else {
      this._determineAutoplayPermissions();
      this._detectCastingAvailabilityTask.perform();
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
    // While casting, the backend's url is the cast URL, which has no metadata of
    // its own — fall back to the Sound's identifier (the playback url the app
    // keyed now-playing metadata under).
    return (
      this.metadataCache.find(this.currentSound?.url) ||
      this.metadataCache.find(this.currentSound?.identifier)
    );
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
      debug('ember-stereo:service')(`setting current sound volume = ${v}`);
      this.currentSound._setVolume(v);
    }
    this._volume = v;
    debug('ember-stereo:service')(`setting volume = ${v}`);
    this.trigger('volume-change', v);
  }

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
   * Get/set if hifi should treat this as a mobile device
   *
   * @property isMobileDevice
   * @type {Boolean}

  */

  @tracked isMobileDevice = 'ontouchstart' in window;

  /**
   * Is audio currently routed to a remote device (AirPlay/Cast)?
   * @property isCasting
   * @type {Boolean}
   * @readOnly
   * @public
   */
  @tracked isCasting = false;

  /**
   * Name of the current cast device, when the platform exposes it (WebKit
   * AirPlay does not, so this is usually null while AirPlaying).
   * @property castDeviceName
   * @type {String}
   * @readOnly
   * @public
   */
  @tracked castDeviceName = null;

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
    return {
      metadata: {},
      sharedAudioAccess: this._createAndUnlockAudio(),
      useSharedAudioAccess: this.useSharedAudioAccess,
      isMobileDevice: this.isMobileDevice,
      connections: this.connectionLoader.connections,
      ...options,
    };
  }

  loadTask = task(
    { restartable: true, evented: true },
    async (urlsOrPromise, _options) => {
      // The Sound prepares the full load options (incl. audio unlock); the
      // service only needs metadata/silenceErrors visibility for its own
      // post-load handling.
      let options = { metadata: {}, ..._options };

      debug('ember-stereo:service')(`loadTask`, urlsOrPromise, options);
      let urlsToTry = await this.urlCache.resolve(urlsOrPromise);
      debug('ember-stereo:service')(`given urls: ${urlsToTry.join(', ')}`);
      this.trigger('pre-load', urlsToTry);
      this.errorCache.remove(urlsToTry);

      // The Sound owns the strategy waterfall, connection creation, caching,
      // and oneAtATime registration. The service delegates loading to it and
      // reacts. The resolved connection (sound.value) remains the public
      // "sound" returned to callers. Key off the *raw* identifier (not the
      // resolved urls) so a helper observing the same promise/function gets the
      // exact same Sound entity the service loads.
      let entity = this.findSound(urlsOrPromise);
      let connection = await entity.load(_options);

      if (connection) {
        // currentSound tracks the identity-stable Sound (not the connection),
        // so a cast/failover swap of its backend stays transparent to the app.
        if (!this._soundsWithTransition.has(entity)) {
          this._soundsWithTransition.add(entity);
          // eslint-disable-next-line ember-concurrency/no-perform-without-catch
          this.handleCurrentSoundTransitionTask.perform(entity);
        }

        if (options.metadata) {
          connection.metadata = {
            ...connection.metadata,
            ...options.metadata,
          };
        }

        return { sound: connection, entity, failures: entity.failures };
      }

      let strategies = entity.strategies || [];
      if (strategies.filter((strategy) => strategy.canPlay).length === 0) {
        return this._handlePreloadError({ urlsToTry, options, strategies });
      }

      return this._handleLoadError({
        urlsToTry,
        failures: entity.failures,
        options,
        strategies,
      });
    }
  );

  handleCurrentSoundTransitionTask = task(async (sound) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await waitForEvent(sound, 'audio-played');
      debug('ember-stereo:service')('handling sound transition');

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
  });

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

  playTask = task(
    { restartable: true, evented: true },
    async (urlsOrPromise, options = {}) => {
      options = { metadata: {}, ...options };

      debug('ember-stereo:service')(`playTask`, urlsOrPromise, options);

      let previouslyPlayingSound = this.isPlaying ? this.currentSound : false;
      if (
        previouslyPlayingSound &&
        previouslyPlayingSound.urlsAreEqual &&
        previouslyPlayingSound.urlsAreEqual(urlsOrPromise)
      ) {
        return { sound: previouslyPlayingSound, failures: [] };
      }

      let loadPromise = this.loadTask.linked().perform(urlsOrPromise, options);
      this.trigger('new-load-request', { loadPromise, urlsOrPromise, options }); //urls: Promise.resolve(resolveUrls(urlsOrPromise))
      let { sound, entity, failures } = await loadPromise;

      if (sound) {
        // Operate on the Sound (entity) — it relays its connection's events and
        // survives a backend swap; we still return the connection to callers.
        this._registerEvents(entity);
        this._attemptToPlaySound(entity, options);

        // Wait on the connection's real tracked props (waitForProperty uses
        // observers, which fire on the backend's tracked state, not the Sound's
        // proxy getters).
        await race([
          waitForProperty(sound, 'isPlaying'),
          waitForProperty(sound, 'isErrored'),
        ]);

        if (previouslyPlayingSound) {
          this.trigger('current-sound-interrupted', {
            sound: previouslyPlayingSound,
          });
        }

        if ('position' in options) {
          entity.position = options.position;
        }

        if (entity.isPlaying) {
          return { sound, entity, failures };
        } else {
          return this._handlePlaybackError({ sound: entity, options });
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

  resolveIdentifierTask = task({ maxConcurrency: 5 }, async (identifier) => {
    return await this.urlCache.resolve(identifier);
  });

  /* ----------------------------- CASTING ------------------------------------ */
  /* -------------------------------------------------------------------------- */
  /*
   * Casting routes audio to a remote device (AirPlay today). It is just another
   * connection: `NativeAudioCasting` (a `NativeAudio` that drives the single,
   * route-holding `<audio x-webkit-airplay>` outlet element via the standard
   * `SharedAudioAccess` ownership handshake). The route lives on that element and
   * outlives every airing.
   *
   *  - availability detection + the picker drive the cast control,
   *  - when a route engages we swap the current sound's backend for a
   *    `NativeAudioCasting` (`currentSound.swap(cast)`); the identity-stable Sound
   *    stays put, so the app's transport follows the remote clock with no fork,
   *  - while casting, `_buildStrategies` force-injects the cast connection at the
   *    top of the waterfall, so any *new* sound (a feed switch) resolves straight
   *    to the device automatically — and the SharedAudioAccess handshake stops the
   *    previously-cast sound when the new one takes the element,
   *  - on disengage we rebuild a local connection and swap back.
   *
   * The one thing the addon can't know is the device-fetchable URL (a public/
   * signed variant of the stream); the app supplies it as `sound.castUrl`.
   */

  // The set of available cast transports ('general' = Remote Playback API,
  // 'airplay' = WebKit). Non-empty ⇒ casting is offerable.
  castingTypes = new TrackedSet();

  /**
   * Is casting available in this browser/network right now?
   * @property isCastingAvailable
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isCastingAvailable() {
    return this.castingTypes.size > 0;
  }

  // The persistent route element. Created lazily, hosted offscreen, and never
  // torn down across airings — the AirPlay route lives on it.
  get castOutletElement() {
    if (!this._castOutletElement) {
      let element = document.createElement('audio');
      element.setAttribute('x-webkit-airplay', 'allow');
      element.setAttribute('crossorigin', 'anonymous');
      element.setAttribute('preload', 'metadata');
      if ('disableRemotePlayback' in element) {
        element.disableRemotePlayback = false;
      }

      element.addEventListener(
        'webkitcurrentplaybacktargetiswirelesschanged',
        () => this._onCastTargetChange(!!element.webkitCurrentPlaybackTargetIsWireless)
      );
      if (element.remote) {
        element.remote.onconnect = () => this._onCastTargetChange(true);
        element.remote.ondisconnect = () => this._onCastTargetChange(false);
      }

      // A real DOM node gets hosted offscreen so the route is genuine; the test
      // fake isn't a Node, so skip hosting there.
      if (element instanceof Node) {
        this._castOutletHost().appendChild(element);
      }

      this._castOutletElement = element;
    }
    return this._castOutletElement;
  }

  _castOutletHost() {
    let id = 'ember-stereo-cast-outlet';
    let host = document.getElementById(id);
    if (!host) {
      host = document.createElement('div');
      host.setAttribute('id', id);
      host.setAttribute('aria-hidden', 'true');
      host.style.position = 'absolute';
      host.style.width = '1px';
      host.style.height = '1px';
      host.style.overflow = 'hidden';
      host.style.clip = 'rect(0 0 0 0)';
      host.style.pointerEvents = 'none';
      document.body.appendChild(host);
    }
    return host;
  }

  _detectCastingAvailabilityTask = task({ maxConcurrency: 1 }, async () => {
    let element = this.castOutletElement;
    try {
      if (element.remote && typeof element.remote.watchAvailability === 'function') {
        element.remote.watchAvailability((available) => {
          if (available) {
            this.castingTypes.add('general');
          } else {
            this.castingTypes.delete('general');
          }
          this._triggerCastAvailabilityChanged();
        });
      }

      if ('webkitShowPlaybackTargetPicker' in element) {
        element.addEventListener(
          'webkitplaybacktargetavailabilitychanged',
          (event) => {
            if (event.availability === 'available') {
              this.castingTypes.add('airplay');
            } else {
              this.castingTypes.delete('airplay');
            }
            this._triggerCastAvailabilityChanged();
          }
        );
      }

      // In case a route already exists on load (a reattached session), sync
      // once now; the settle task keeps it reconciled thereafter.
      this._reconcileCastState();

      await forever;
    } finally {
      element.remote?.cancelWatchAvailability?.();
    }
  });

  _triggerCastAvailabilityChanged() {
    debug('ember-stereo:service')(
      `cast availability: ${[...this.castingTypes]}`
    );
    this.trigger('audio-cast-availability-changed', {
      available: this.isCastingAvailable,
    });
  }

  /**
   * Load a sound's cast URL onto the outlet ahead of the picker click, so Safari
   * (which won't open a picker for an element with no parsed source) has media
   * to offer. The app calls this when the cast control mounts; for an archive it
   * resolves the signed URL and sets `sound.castUrl` first.
   *
   * @method prewarmCast
   * @param {Array|String|Sound} identifier the sound to prepare (defaults to current)
   * @public
   */
  prewarmCast(identifier) {
    this._loadOutlet(identifier);
  }

  /**
   * Open the device picker for a sound. Must run inside the click gesture —
   * Safari blocks the picker otherwise — so it loads the outlet and opens the
   * picker synchronously.
   *
   * @method showCastMenu
   * @param {Array|String|Sound} identifier the sound to cast (defaults to current)
   * @public
   */
  showCastMenu(identifier) {
    if (!this.isCastingAvailable) {
      return;
    }
    this._loadOutlet(identifier);

    let element = this.castOutletElement;
    if (element.remote && typeof element.remote.prompt === 'function') {
      element.remote.prompt().catch((error) => {
        debug('ember-stereo:service')(`cast prompt error: ${error}`);
      });
    } else if (typeof element.webkitShowPlaybackTargetPicker === 'function') {
      element.webkitShowPlaybackTargetPicker();
    }
  }

  /**
   * Hand playback back to the local device. WebKit has no programmatic
   * disconnect, so it re-opens the picker (where the user disconnects); the
   * Remote Playback API can disconnect directly. Either way the cast-target-change
   * event drives the swap back to local.
   *
   * @method stopCasting
   * @public
   */
  stopCasting() {
    let element = this.castOutletElement;
    if (element.remote && typeof element.remote.disconnect === 'function') {
      element.remote.disconnect();
    } else if (typeof element.webkitShowPlaybackTargetPicker === 'function') {
      element.webkitShowPlaybackTargetPicker();
    }
  }

  // Point the outlet at the sound's cast URL if it isn't already there.
  _loadOutlet(identifier) {
    let sound = identifier ? this.findSound(identifier) : this.currentSound;
    let castUrl = sound?.castUrl;
    if (!castUrl) {
      return;
    }
    let element = this.castOutletElement;
    // hasEqualUrls/StereoUrl throws on an empty input, so don't compare against
    // an unset src — just set it (first cast, before any prewarm landed).
    let currentSrc = element.getAttribute('src');
    if (!currentSrc || !hasEqualUrls(currentSrc, castUrl)) {
      element.setAttribute('src', castUrl);
      element.load();
    }
  }

  _onCastTargetChange(isWireless) {
    // Changing the outlet element's `src` (a feed switch, or first engage on a
    // non-prewarmed url) makes Safari drop then re-establish the AirPlay route,
    // firing this with wireless=false then true. That flap is OUR doing, not a
    // genuine user disconnect — ignore it while a programmatic outlet change is
    // in flight, so it can't trigger a disengage→local→re-engage cascade that
    // fights the re-cast.
    if (this._suppressCastTargetChange) {
      debug('ember-stereo:service')(
        `cast-target change ignored (programmatic outlet change): wireless=${isWireless}`
      );
      return;
    }
    debug('ember-stereo:service')(
      `cast-target change: wireless=${isWireless} -> ${isWireless ? 'engage' : 'disengage'}`
    );
    if (isWireless) {
      this.engageCastTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    } else {
      this.disengageCastTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    }
  }

  // Suppress cast-target-change handling across a programmatic outlet src change
  // (and a short settle window after, while Safari re-establishes the route on
  // the new src). Nestable so the initial engage and a feed-switch re-cast don't
  // clobber each other.
  _beginOutletChange() {
    this._outletChangeDepth = (this._outletChangeDepth || 0) + 1;
    this._suppressCastTargetChange = true;
    this._castTargetSettleTask.cancelAll();
  }

  _endOutletChange() {
    this._outletChangeDepth = Math.max(0, (this._outletChangeDepth || 1) - 1);
    if (this._outletChangeDepth === 0) {
      this._castTargetSettleTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    }
  }

  // Hold the suppression open for a beat after the last outlet change settles, so
  // Safari's trailing route flap on the new src can't engage/disengage.
  // restartable: a new outlet change extends the window.
  _castTargetSettleTask = task({ restartable: true }, async () => {
    await timeout(1500);
    this._suppressCastTargetChange = false;
    // A real connect/disconnect may have landed while we were suppressing the
    // flap; reconcile isCasting to the element's actual route state so the
    // control can't get stuck lit (or stuck off).
    this._reconcileCastState();
  });

  // Sync isCasting to the outlet element's ground-truth route state. The tracked
  // bool is maintained by hand off flap-prone events that can be missed (e.g.
  // during suppression); this is the self-heal.
  _reconcileCastState() {
    let element = this._castOutletElement;
    if (!element || this._suppressCastTargetChange) {
      return;
    }
    let actuallyCasting =
      !!element.webkitCurrentPlaybackTargetIsWireless ||
      element.remote?.state === 'connected';

    debug('ember-stereo:service')(
      `reconcile cast state: actuallyCasting=${actuallyCasting} isCasting=${this.isCasting}`
    );

    if (actuallyCasting && !this.isCasting) {
      this.engageCastTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    } else if (!actuallyCasting && this.isCasting) {
      this.disengageCastTask.perform().catch((e) => {
        if (!didCancel(e)) throw e;
      });
    }
  }

  // Engage: a device target became active. Route the current sound to it by
  // swapping its backing connection for a NativeAudioCasting on the route
  // element. (Subsequent feed switches resolve to the device on their own via
  // the cast strategy in _buildStrategies.) restartable so a flapping target
  // event supersedes cleanly.
  engageCastTask = task({ restartable: true }, async () => {
    this.isCasting = true;
    // The platform doesn't expose the AirPlay target's real name (WebKit and the
    // Remote Playback API both withhold it). This is an AirPlay integration
    // (Chromecast would be a separate Cast SDK), so default to "AirPlay".
    // Cleared on disengage.
    this.castDeviceName = 'AirPlay';
    let sound = this.currentSound;
    debug('ember-stereo:service')(
      `engaging cast -> ${sound?.castUrl ?? '(no current sound; route held, awaiting one)'}`
    );
    this.trigger('audio-cast-connecting', { sound });
    if (sound?.castUrl) {
      let cast = this._buildCastConnection(sound.castUrl, sound.metadata);
      if (cast) {
        await sound.swap(cast);
      }
    }
    this.trigger('audio-cast-connected', { sound });
  });

  // Disengage: swap the device-routed sound back to a fresh local connection.
  disengageCastTask = task({ restartable: true }, async () => {
    if (!this.isCasting) {
      return;
    }
    let sound = this.currentSound;
    debug('ember-stereo:service')(
      `disengaging cast -> keep blessed outlet, resume local (playIntent=${sound?._playIntent})`
    );
    this.isCasting = false;
    this.castDeviceName = null;

    // Do NOT swap to a fresh local connection: a brand-new <audio> element has
    // no user activation, so Safari blocks its autoplay and the audio pauses.
    // The outlet element is already "blessed" (it played under the cast), and
    // when the route drops it outputs locally — so keep the NativeAudioCasting
    // and just resume it if we were playing. The route drop often pauses the
    // element involuntarily (which doesn't change _playIntent), so re-issue play
    // on the blessed element. A later feed switch rebuilds a normal local
    // connection via _castStateMatches.
    if (sound && this._isCastConnection(sound.value)) {
      if (sound._playIntent && !sound.isPlaying) {
        sound.play();
      }
    }

    this.trigger('audio-cast-disconnected', { sound });
  });

  // The service-owned SharedAudioAccess wrapping the route-holding outlet
  // element, so every NativeAudioCasting drives THAT element and coordinates
  // single-ownership through the standard handshake — the same machinery
  // NativeAudio uses to share one element across connections.
  get castSharedAudioAccess() {
    if (!this._castSharedAudioAccess) {
      let access = new SharedAudioAccess();
      access.audioElement = this.castOutletElement;
      this._castSharedAudioAccess = access;
    }
    return this._castSharedAudioAccess;
  }

  // One definition of "the cast connection": a strategy that builds a
  // NativeAudioCasting on the route element for `castUrl`. Shared by the engage
  // swap and the force-injected cast strategy in _buildStrategies.
  _castStrategy(castUrl, metadata) {
    let service = this;
    let strategy = new Strategy(NativeAudioCasting, new StereoUrl(castUrl), {
      metadata,
      sharedAudioAccess: this.castSharedAudioAccess,
      // Changing the routed element's src flaps the AirPlay route; let the cast
      // connection suppress the resulting cast-target events during the change.
      options: {
        beginOutletChange: () => service._beginOutletChange(),
        endOutletChange: () => service._endOutletChange(),
      },
    });
    setOwner(strategy, getOwner(this));
    return strategy;
  }

  _buildCastConnection(castUrl, metadata) {
    return this._castStrategy(castUrl, metadata).createSound();
  }

  _isCastConnection(connection) {
    return connection?.connectionKey === NativeAudioCasting.key;
  }

  // Build a fresh local connection for a sound from its (non-cast) strategies.
  // A sound that adopted a cached connection on load never built strategies, so
  // rebuild them from its identifier rather than leaving disengage with nothing
  // to swap back to (which would strand the Sound silent).
  _buildLocalConnection(sound) {
    let strategies = sound.strategies;
    if (!strategies?.length) {
      strategies = this._buildStrategies(
        makeArray(sound.identifier),
        this.prepareLoadOptions(sound.options)
      );
    }
    let strategy = (strategies || []).find(
      (candidate) =>
        candidate.canPlay && candidate.connectionKey !== NativeAudioCasting.key
    );
    return strategy?.createSound();
  }

  /* ------------------------ PRIVATE(ISH) STUFF ------------------------------ */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  get systemStereoOptions() {
    return config?.emberStereo;
  }

  _buildStrategies(urlsToTry, options) {
    let strategizer = new Strategizer(urlsToTry, options);
    setOwner(strategizer, getOwner(this));
    let strategies = [...strategizer.strategies];

    // While casting, force the cast connection to the top so any sound that
    // loads (a feed switch) resolves straight to the device. The app supplies
    // the device-fetchable URL via options.castUrl; without it we can't cast, so
    // that sound just plays locally.
    if (this.isCasting && options.castUrl) {
      debug('ember-stereo:service')(
        `casting active: injecting cast strategy at top for ${options.castUrl}`
      );
      strategies.unshift(this._castStrategy(options.castUrl, options.metadata));
    }

    return strategies;
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

    if (sound) {
      this._registerEvents(sound);
      this._updateNowPlaying(sound);
      sound._setVolume(this.volume);
      debug('ember-stereo:service')(`setting current sound -> ${sound.url}`);
    } else {
      debug('ember-stereo:service')(`setting current sound -> null`);
    }

    this._currentSound = sound;
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
    if (identifiers instanceof BaseSound) {
      return identifiers;
    } else {
      return this.soundCache.find(identifiers);
    }
  }

  findSound(identifier) {
    if (identifier instanceof BaseSound || identifier instanceof Sound) {
      return identifier;
    }

    if (!identifier) {
      return undefined;
    }

    // Key by the primary url string so the cache normalizes to a stable key.
    // (The raw identifier may be a fresh array each call — `['/a.mp3']` — which
    // normalizes to a per-instance WeakMap key and would never hit.)
    let key = makeArray(identifier)[0];

    if (this.soundEntityCache.has(key)) {
      return this.soundEntityCache.find(key);
    }

    let sound = new Sound(identifier, { owner: getOwner(this) });
    this.soundEntityCache.store(key, sound);
    return sound;
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
    this.soundEntityCache.remove(url);
    this.metadataCache.remove(url);

    if (this.currentSound?.url === url) {
      this.currentSound = null;
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
      debug('ember-stereo:service')(eventName, info);
    });
  }

  // Named functions so Ember Evented can successfully register/unregister them

  _relayPlayedEvent(info) {
    this._updateNowPlaying(this.currentSound);
    this._relayEvent('audio-played', info);
  }
  _relayPausedEvent(info) {
    this._updateNowPlaying(this.currentSound);
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
    this._updateNowPlaying(this.currentSound);
    this._relayEvent('audio-metadata-changed', info);
  }

  /**
   * Updates now playing info from metadata if appropriate keys exist
   * @method _updateNowPlaying
   * @param {Object} sound
   * @private

   */
  _updateNowPlaying(sound) {
    if (!sound) return;
    if (sound.isDestroyed) return;

    if (
      window &&
      navigator &&
      'mediaSession' in navigator &&
      'MediaMetadata' in window
    ) {
      if (sound.isPlaying) {
        navigator.mediaSession.playbackState = 'playing';
      } else {
        navigator.mediaSession.playbackState = 'paused';
      }

      let { title, artist, album, artwork } = sound.metadata ?? {};

      let mediaAttributes = {
        title,
        artist,
        album,
      };

      if (makeArray(artwork).length > 0 && artwork[0]?.src) {
        mediaAttributes.artwork = makeArray(artwork);
      }

      navigator.mediaSession.metadata = new MediaMetadata(mediaAttributes);

      navigator.mediaSession.setActionHandler('play', () => {
        if (!sound.isPlaying) {
          sound.play();
        }
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (sound.isPlaying) {
          sound.pause();
        }
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        sound.stop();
      });
      navigator.mediaSession.setActionHandler('seekbackward', (seekInfo) => {
        if (sound.isRewindable) {
          let offset = (seekInfo?.seekOffset || 15) * 1000;
          sound.rewind(offset);
        }
      });
      navigator.mediaSession.setActionHandler('seekforward', (seekInfo) => {
        if (sound.isFastForwardable) {
          let offset = (seekInfo?.seekOffset || 15) * 1000;
          sound.fastForward(offset);
        }
      });
      navigator.mediaSession.setActionHandler('seekto', (seekInfo) => {
        if (sound.isSeekable) {
          sound.position = seekInfo.seekTime * 1000;
        }
      });
      // navigator.mediaSession.setActionHandler('previoustrack', () => {
      //   /* Code excerpted. */
      // });
      // navigator.mediaSession.setActionHandler('nexttrack', () => {
      //   /* Code excerpted. */
      // });
      // navigator.mediaSession.setActionHandler('skipad', () => {
      //   /* Code excerpted. */
      // });
    }
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
      debug('ember-stereo:service')(
        `triggering sound play from document touch`
      );
      sound.play();
    };

    document.addEventListener('touchstart', touchPlay, { passive: true });

    let blockCheck = later(() => {
      debug('ember-stereo:service')(
        `Looks like the mobile browser blocked an autoplay trying to play sound with url: ${sound.url}`
      );
      sound.isBlocked = true;
      sound.trigger('audio-blocked');
    }, 2000);

    sound.one('audio-load-error', () => {});

    sound.one('audio-played', () => {
      document.removeEventListener('touchstart', touchPlay);
      cancel(blockCheck);
    });
    // }
    sound.play(options);

    if (sound.isPlaying) {
      cancel(blockCheck);
    }
  }

  willDestroy() {
    this.loadTask.cancelAll();
    this.playTask.cancelAll();
    this.engageCastTask.cancelAll();
    this.disengageCastTask.cancelAll();
    this._castTargetSettleTask.cancelAll();
    this._detectCastingAvailabilityTask.cancelAll();
  }
}
