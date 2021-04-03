import { next, later, cancel } from '@ember/runloop';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { getMimeType } from 'ember-hifi/-private/utils/mime-types';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import Evented from 'ember-hifi/-private/utils/evented';

/**
 * This is the base sound object from which other sound objects are derived.
 *
 * @class Sound
 * @constructor
*/
export default class Sound extends Evented {
  static setup(config) {
    this.config = config;
  }

  static canPlay(url) {
    let usablePlatform = this.canUseConnection(url);
    if (!usablePlatform) {
      return false;
    }
    if (typeof url === 'string') {
      let mimeType = getMimeType(url);

      if (!mimeType) {
        /* eslint-disable no-console */
        console.warn(`Could not determine mime type for ${url}`);
        console.warn('Attempting to play urls with an unknown mime type can be bad for performance. See documentation for more info.');
        /* eslint-enable no-console */
        return true;
      }
      else {
        return this.canPlayMimeType(mimeType);
      }
    }
    else if (url.mimeType) {
      return this.canPlayMimeType(url.mimeType);
    }
    else {
      throw new Error('URL must be a string or object with a mimeType property');
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
    }
    else if (mimeTypeBlackList){
      return !A(mimeTypeBlackList).includes(mimeType);
    }
    else {
      return true; // assume true
    }
  }

  @tracked url
  @tracked pollInterval = 1000
  @tracked timeout = 30000
  @tracked connectionName

  @tracked hasPlayed = false
  @tracked isLoading = false
  @tracked isLoaded  = false
  @tracked isPlaying = false
  @tracked isErrored = false;
  @tracked isReady   = false
  @tracked _position = 0;
  @tracked error = null;
  @tracked duration = 0
  @tracked percentLoaded = 0
  @tracked metadata = {};

  get debugName() {
    var parser = document.createElement('a');
    parser.href = this.url;

    let parts = parser.pathname.split('/');
    return `ember-hifi:${this.connectionName || this.constructor.toString()} (${parts[parts.length - 1]})`;
  }

  trigger(eventName, info = {}) {
    if (!info) {
      info = {}
    }

    if (!info.sound) {
      info.sound = this;
    }

    this.eventManager.trigger(eventName, info);
  }

  get isStream() {
    return this.duration == Infinity;
  }

  get isFastForwardable() {
    return !this.isStream;
  }

  get isRewindable() {
    return !this.isStream;
  }

  // _position is updated by the service on the currently playing sound
  get position() {
    return this._position;
  }
  set position(v) {
    this.trigger('audio-position-will-change', { sound: this, currentPosition: this._currentPosition(), newPosition: v });

    this._setPosition(v);
  }

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

    let {
      audioLoading,
      audioLoaded,
      audioReady,
      audioPlayed,
      audioPaused,
      audioEnded,
      audioLoadError
    } = this;
    this.isLoading = true;

    this.on('audio-played', () => {
      this.hasPlayed = true
      this.isLoading = false
      this.isPlaying = true
      this.error = null

      if (audioPlayed) { audioLoading(this); }

      // recover lost isLoading update
      this.debug(`audio-played ${this.isPlaying}`);
    });

    this.on('audio-paused', () => {
      this.isPlaying = false;
      if (audioPaused) { audioPaused(this); }
      this.debug('audio-paused');
    });

    this.on('audio-ended', () => {
      this.isPlaying = false;
      if (audioEnded) { audioEnded(this); }
      this.debug('audio-ended');
    });

    this.on('audio-ready', () => {
      this.isReady = true;
      this.duration = this._audioDuration();
      if (audioReady) { audioReady(this); }
      this.debug('audio-ready');
    });

    this.on('audio-load-error', (opts = {}) => {
      console.error(opts)
      let { error } = opts;

      if (this.hasPlayed) {
        this.isLoading = false;
        this.isPlaying = false;
      }
      this.isErrored = true;
      this.error = error;
      if (audioLoadError) { audioLoadError(this); }
      this.debug('audio-load-error');
    });

    this.on('audio-loaded', () => {
      this.isLoading = false;
      this.isLoaded = true;
      if (audioLoaded) { audioLoaded(this); }
      this.debug('audio-loaded');
    });

    this.on('audio-loading', (info) => {
      if (info && info.percentLoaded) {
        this.percentLoaded = info.percentLoaded;
      }
      if (audioLoading) { audioLoading(this, info && info.percentLoaded); }
      this.debug('audio-loading');
    });

    try {
      this._detectTimeouts();
      this.setup();
    }
    catch(e) {
      next(() => {
        this.trigger('audio-load-error', {sound: this, error: `Error in setup ${e.message}`});
        if (audioLoadError) { audioLoadError(this); }
      });
    }
  }

  _detectTimeouts() {
    if (this.timeout) {
      let timeout = later(() => {
          this.trigger('audio-load-error', {sound: this, error: "request timed out"});
      }, this.timeout);

      this.on('audio-ready',      () => cancel(timeout));
      this.on('audio-load-error', () => cancel(timeout));
    }
  }

  fastForward(duration) {
    let audioLength     = this._audioDuration();
    let currentPosition = this._currentPosition();
    let newPosition     = Math.min((currentPosition + duration), audioLength);

    this.trigger('audio-will-fast-forward', { sound: this, currentPosition, newPosition});
    this._setPosition(newPosition);
  }

  rewind(duration) {
    let currentPosition = this._currentPosition();
    let newPosition     = Math.max((currentPosition - duration), 0);
    this.trigger('audio-will-rewind', { sound: this, currentPosition, newPosition});
    this._setPosition(newPosition);
  }


  togglePause() {
    if (this.isPlaying) {
      this.pause();
    }
    else {
      this.play();
    }
  }

  /* To be defined on the subclass */
  setup() {
    assert("[ember-hifi] #setup interface not implemented", false);
  }

  _setVolume() {
    assert("[ember-hifi] #_setVolume interface not implemented", false);
  }

  _audioDuration() {
    assert("[ember-hifi] #_audioDuration interface not implemented", false);
  }

  _currentPosition() {
    assert("[ember-hifi] #_currentPosition interface not implemented", false);
  }

  _setPosition() {
    assert("[ember-hifi] #_setPosition interface not implemented", false);
  }

  play() {
    assert("[ember-hifi] #play interface not implemented", false);
  }

  pause() {
    assert("[ember-hifi] #pause interface not implemented", false);
  }

  stop() {
    assert("[ember-hifi] #stop interface not implemented", false);
  }

  teardown() {
    // optionally implemented in subclasses
  }

  willDestroy() {
    this.teardown();
  }
}
