import { next, later, cancel } from '@ember/runloop';
import { A } from '@ember/array';
import { getProperties } from '@ember/object';
import { assert } from '@ember/debug';
import { getMimeType } from 'ember-hifi/utils/mime-types';
import { inject as service } from '@ember/service';
import debug from 'debug';
import classic from 'ember-classic-decorator';
import { tracked } from '@glimmer/tracking';
import Evented from 'ember-hifi/utils/evented';
/**
* This is the base sound object from which other sound objects are derived. 
*
* @class Sound
* @constructor
*/
@classic
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
  // @service('hifi-sync') sync;

  @tracked url
  @tracked pollInterval = 1000
  @tracked timeout   = 30000
  @tracked connectionName

  @tracked hasPlayed = false
  @tracked isLoading = false
  @tracked isLoaded  = false
  @tracked isPlaying = false
  @tracked isErrored = false;
  @tracked isReady   = false
  @tracked _position;
  @tracked error = null;
  @tracked duration = 0
  @tracked percentLoaded = 0

  get debugName() {
    var parser = document.createElement('a');
    parser.href = this.url;

    let parts = parser.pathname.split('/');
    return `ember-hifi:${this.connectionName || this.constructor.toString()} (${parts[parts.length - 1]})`;
  }


  get isErrored() {
    return !!this.error;
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
    this.trigger('audio-position-will-change', this, { currentPosition: this._currentPosition(), newPosition: v });

    return this._setPosition(v);
  }

  get mimeType() {
    return getMimeType(this.url);
  }

  debug(message) {
    const log = debug(this.debugName);
    log(message);
  }

  onSyncChanged(data) {
    console.log('on sync changed', data);
  }

  syncState() {
    // this.sync.broadcast(this.url, {
    //   isPlaying: this.isPlaying,
    //   isLoaded: this.isLoaded,
    //   isStream: this.isStream,
    //   isFastForwardable: this.isFastForwardable,
    //   isRewindable: this.isRewindable,
    //   position: !this.isStream ? this.position : null
    // })
  }

  constructor(args = {}) {
    super(...arguments);

    this.url = args.url;
    this.connectionName = args.connectionName;
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
    } = getProperties(this, 'audioLoading', 'audioLoaded', 'audioReady', 'audioPlayed', 'audioPaused', 'audioEnded', 'audioLoadError');
    this.isLoading = true;

    this.on('audio-played',    () => {
      this.hasPlayed = true
      this.isLoading = false
      this.isPlaying = true
      this.error = null

      if (audioPlayed) { audioLoading(this); }

      // recover lost isLoading update
      this.syncState()
      this.debug(`audio-played ${this.isPlaying}`);
    });

    this.on('audio-paused',   () => {
      this.isPlaying = false;
      if (audioPaused) { audioPaused(this); }
      this.syncState()
      this.debug('audio-paused');
    });

    this.on('audio-ended',    () => {
      this.isPlaying = false;
      if (audioEnded) { audioEnded(this); }
      this.syncState()
      this.debug('audio-ended');
    });

    this.on('audio-ready',    () => {
      this.isReady = true;
      this.duration = this._audioDuration();
      if (audioReady) { audioReady(this); }
      this.syncState()
      this.debug('audio-ready');
    });

    this.on('audio-load-error', (e) => {
      if (this.hasPlayed) {
        this.isLoading = false;
        this.isPlaying = false;
      }
      this.error = e;
      if (audioLoadError) { audioLoadError(this); }
      this.syncState()
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

    // this.sync.on(`change:${this.url}`, this.onSyncChanged);

    try {
      this._detectTimeouts();
      this.setup();
    }
    catch(e) {
      next(() => {
        this.trigger('audio-load-error', `Error in setup ${e.message}`);
        if (audioLoadError) { audioLoadError(this); }
      });
    }
  }

  _detectTimeouts() {
    if (this.timeout) {
      let timeout = later(() => {
          this.trigger('audio-load-error', "request timed out");
      }, this.timeout);

      this.on('audio-ready',      () => cancel(timeout));
      this.on('audio-load-error', () => cancel(timeout));
    }
  }

  fastForward(duration) {
    let audioLength     = this._audioDuration();
    let currentPosition = this._currentPosition();
    let newPosition     = Math.min((currentPosition + duration), audioLength);

    this.trigger('audio-will-fast-forward', this, {currentPosition, newPosition});
    this._setPosition(newPosition);
  }

  rewind(duration) {
    let currentPosition = this._currentPosition();
    let newPosition     = Math.max((currentPosition - duration), 0);
    this.trigger('audio-will-rewind', this, {currentPosition, newPosition});
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