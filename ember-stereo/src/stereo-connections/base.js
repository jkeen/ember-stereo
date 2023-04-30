import { next, later, cancel } from '@ember/runloop';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { getMimeType } from '../-private/utils/mime-types';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import Evented from '../-private/utils/evented';
import hasEqualUrls from '../-private/utils/has-equal-urls';
import { getOwner } from '@ember/application';

/**
 * This is the base sound object from which other sound objects are derived.
 *
 * @class BaseSound
 * @constructor
 */
export default class Sound extends Evented {
  static setup(config) {
    this.config = config;
  }

  static canPlay(url, mimeType) {
    let usablePlatform = this.canUseConnection(url);
    if (!usablePlatform) {
      return false;
    }

    mimeType = mimeType || url.mimeType || getMimeType(url);

    if (mimeType) {
      return this.canPlayMimeType(mimeType);
    } else {
      /* eslint-disable no-console */
      console.warn(`Could not determine mime type for ${url}`);
      console.warn(
        'Attempting to play urls with an unknown mime type can be bad for performance. See documentation for more info.'
      );
      /* eslint-enable no-console */
      return true;
    }
  }

  static canUseConnection() {
    return true;
  }

  static canPlayMimeType(mimeType) {
    let mimeTypeWhiteList = this.acceptMimeTypes;
    let mimeTypeBlackList = this.rejectMimeTypes;

    if (mimeTypeWhiteList) {
      return A(mimeTypeWhiteList).includes(mimeType);
    } else if (mimeTypeBlackList) {
      return !A(mimeTypeBlackList).includes(mimeType);
    } else {
      return true; // assume true
    }
  }

  /**
   * The raw url of the sound that will be handed to the audio element.
   * @property url
   * @type {String}
   * @public
   */
  @tracked url;

  get identifier() {
    return this.url;
  }

  /**
   * name of the connection that produced the sound
   * @property connectionName
   * @type {String}
   * @public
   */
  @tracked connectionName;

  /**
   * has the sound played?
   * @property hasPlayed
   * @type {Boolean}
   * @public
   */
  @tracked hasPlayed = false;

  /**
   * is the sound currently loading?
   * @property isLoading
   * @type {Boolean}
   * @public
   */
  @tracked isLoading = false;

  /**
   * is the sound loaded?
   * @property isLoaded
   * @type {Boolean}
   * @public
   */
  @tracked isLoaded = false;

  /**
   * is the sound currently playing?
   * @property isPlaying
   * @type {Boolean}
   * @public
   */
  @tracked isPlaying = false;

  /**
   * is the sound errored?
   * @property isErrored
   * @type {Boolean}
   * @public
   */
  @tracked isErrored = false;

  /**
   * is the sound ready?
   * @property isReady
   * @type {Boolean}
   * @public
   */
  @tracked isReady = false;

  /**
   * has the sound been blocked by autoplay protections?
   * @property isBlocked
   * @type {Boolean}
   * @public
   */
  @tracked isBlocked = false;

  /**
   * the sound's error, if errored
   * @property error
   * @type {String}
   * @public
   */
  @tracked error = null;
  @tracked _position = 0;

  /**
   * what's the duration of the sound?
   * @property duration
   * @type {Integer} (ms)
   * @public
   */
  @tracked duration = 0;

  /**
   * @property percentLoaded
   * @type {Integer} (0-100)
   * @public
   */
  @tracked percentLoaded = 0;

  /**
   * Metadata hash. Put whatever you want in here
   * @property metadata
   * @type {Hash} (0-100)
   * @public
   */

  get metadata() {
    let owner = getOwner(this);
    if (owner) {
      let stereo = owner.lookup('service:stereo');
      return stereo?.metadataCache?.find(this.url);
    }

    return {};
  }

  set metadata(value) {
    let owner = getOwner(this);

    if (owner) {
      let stereo = owner.lookup('service:stereo');
      stereo?.metadataCache?.store(this.url, value);
    }
  }

  @tracked id3Tags = {};
  @tracked id3TagMetadata = {};
  @tracked _debug = {}; // for internal debugging
  @tracked sharedAudioAccess;

  get debugName() {
    var parser = document.createElement('a');
    parser.href = this.url;

    let parts = parser.pathname.split('/');
    return `ember-stereo:${
      this.connectionName || this.constructor.toString()
    } (${parts[parts.length - 1]})`;
  }

  trigger(eventName, info = {}) {
    if (!info) {
      info = {};
    }

    if (!info.sound) {
      info.sound = this;
    }

    this.eventManager.trigger(eventName, info);
  }

  /**
   * is the sound a stream?
   * @property isStream
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isStream() {
    return this.duration == Infinity;
  }

  /**
   * is the sound fast forwardable?
   * @property isFastForwardable
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isFastForwardable() {
    return !this.isStream;
  }

  /**
   * is the sound rewindable?
   * @property isRewindable
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isRewindable() {
    return !this.isStream;
  }

  /**
   * is the sound seekable?
   * @property isSeekable
   * @type {Boolean}
   * @readOnly
   * @public
   */
  get isSeekable() {
    return !this.isStream;
  }

  /**
   * get/set the sound's position (in ms)
   * @property position
   * @type {Integer}
   * @public
   */
  get position() {
    // _position is updated by the service on the currently playing sound
    return this._position;
  }
  set position(v) {
    this.trigger('audio-position-will-change', {
      sound: this,
      currentPosition: this._currentPosition(),
      newPosition: v,
    });

    this._position = this._setPosition(v);
  }

  /**
   * get the sound's current real time position (probably only available on certain HLS sounds)
   * @property currentTime
   * @type {Integer}
   * @public
   */
  get currentTime() {
    return null;
  }

  /**
   * get the sound's reported mimeType
   * @property mimeType
   * @type {Integer}
   * @public
   */
  get mimeType() {
    return getMimeType(this.url);
  }

  debug() {
    const log = debug(this.debugName);
    log(...arguments);
  }

  constructor(args = {}) {
    super(...arguments);
    this.url = args.url;
    this.connectionName = args.connectionName;
    this.connectionKey = args.connectionKey;
    this.options = args.options;
    this.sharedAudioAccess = args.sharedAudioAccess;
    this.timeout = 'timeout' in args ? args.timeout : 30000;

    let {
      audioLoading,
      audioLoaded,
      audioReady,
      audioPlayed,
      audioPaused,
      audioEnded,
      audioLoadError,
    } = this;
    this.isLoading = true;

    this.on('audio-played', () => {
      this.hasPlayed = true;
      this.isLoading = false;
      this.isPlaying = true;
      this.isBlocked = false;
      this.error = null;

      if (audioPlayed) {
        audioLoading(this);
      }

      this.debug(`audio-played ${this.isPlaying}`);
    });

    this.on('audio-paused', () => {
      this.isPlaying = false;
      if (audioPaused) {
        audioPaused(this);
      }
      this.debug('audio-paused');
    });

    this.on('audio-ended', () => {
      this.isPlaying = false;
      this._position = this._setPosition(0);
      if (audioEnded) {
        audioEnded(this);
      }
      this.debug('audio-ended');
    });

    this.on('audio-ready', () => {
      this.isReady = true;
      this.duration = this._audioDuration();
      if (audioReady) {
        audioReady(this);
      }
      this.debug('audio-ready');
    });

    this.on('audio-load-error', (opts = {}) => {
      let { error } = opts;

      if (this.hasPlayed) {
        this.isLoading = false;
        this.isPlaying = false;
      }
      this.isErrored = true;
      this.error = error;
      if (audioLoadError) {
        audioLoadError(this);
      }
      this.debug('audio-load-error');
    });

    this.on('audio-loaded', () => {
      this.isLoading = false;
      this.isLoaded = true;
      if (audioLoaded) {
        audioLoaded(this);
      }
      this.debug('audio-loaded');
    });

    this.on('audio-loading', (info) => {
      if (info && info.percentLoaded) {
        this.percentLoaded = info.percentLoaded;
      }
      if (audioLoading) {
        audioLoading(this, info && info.percentLoaded);
      }
      this.debug('audio-loading');
    });

    this.on('audio-duration-changed', () => {
      this.duration = this._audioDuration();
    });

    this.on('audio-blocked', () => {
      this.isBlocked = true;
    });

    try {
      this._detectTimeouts();
      this.setup();
    } catch (e) {
      next(() => {
        this.trigger('audio-load-error', {
          sound: this,
          error: `Error in setup ${e.message}`,
        });
        if (audioLoadError) {
          audioLoadError(this);
        }
      });
    }
  }

  _detectTimeouts() {
    if (this.timeout) {
      let timeout = later(() => {
        this.trigger('audio-load-error', {
          sound: this,
          error: 'request timed out',
        });
      }, this.timeout);

      this.on('audio-ready', () => cancel(timeout));
      this.on('audio-load-error', () => cancel(timeout));
    }
  }

  /**
   * fast forward the sound
   * @method fastForward
   * @param {Integer} duration
   * @public
   */
  fastForward(duration) {
    let audioLength = this._audioDuration();
    let currentPosition = this._currentPosition();
    let newPosition = Math.min(currentPosition + duration, audioLength);

    this.trigger('audio-will-fast-forward', {
      sound: this,
      currentPosition,
      newPosition,
    });
    this._setPosition(newPosition);
    this._position = this._currentPosition();
  }

  /**
   * rewind the sound
   * @method rewind
   * @param {Integer} duration
   * @public
   */
  rewind(duration) {
    let currentPosition = this._currentPosition();
    let newPosition = Math.max(currentPosition - duration, 0);
    this.trigger('audio-will-rewind', {
      sound: this,
      currentPosition,
      newPosition,
    });
    this._setPosition(newPosition);
    this._position = this._currentPosition();
  }

  /**
   * toggle the play/pause state
   * @method togglePause
   * @public
   */
  togglePause() {
    if (this.isPlaying) {
      return this.pause();
    } else {
      return this.play();
    }
  }

  /* To be defined on the subclass */
  setup() {
    assert('[ember-stereo] #setup interface not implemented', false);
  }

  _setVolume() {
    assert('[ember-stereo] #_setVolume interface not implemented', false);
  }

  _audioDuration() {
    assert('[ember-stereo] #_audioDuration interface not implemented', false);
  }

  _currentPosition() {
    assert('[ember-stereo] #_currentPosition interface not implemented', false);
  }

  _setPosition() {
    assert('[ember-stereo] #_setPosition interface not implemented', false);
  }

  /**
   * play the sound
   * @method play
   * @public
   */
  play() {
    assert('[ember-stereo] #play interface not implemented', false);
  }

  /**
   * pause the sound
   * @method pause
   * @public
   */
  pause() {
    assert('[ember-stereo] #pause interface not implemented', false);
  }

  /**
   * stop the sound
   * @method stop
   * @public
   */
  stop() {
    assert('[ember-stereo] #stop interface not implemented', false);
  }

  teardown() {
    // optionally implemented in subclasses
  }

  hasUrl(url) {
    return hasEqualUrls(this.url, url);
  }
}
