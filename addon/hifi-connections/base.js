import { equal, not } from '@ember/object/computed';
import { next, later, cancel } from '@ember/runloop';
import Evented from '@ember/object/evented';
import { A } from '@ember/array';
import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import EmberObject, { computed } from '@ember/object';
import { getMimeType } from 'ember-hifi/utils/mime-types';
import { inject as service } from '@ember/service';
import debug from 'debug';


/**
* This is the base sound object from which other sound objects are derived. 
*
* @class BaseSound
* @constructor
*/

let ClassMethods = Mixin.create({
  setup(config) {
    this.config = config;
  },

  canPlay(url) {
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
  },

  canUseConnection() {
    return true;
  },

  canPlayMimeType(mimeType) {
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
});

let Sound = EmberObject.extend(Evented, {
  sync: service('hifi-sync'),
  debugName: computed('url', 'connectionName', function() {
    var parser = document.createElement('a');
    parser.href = this.get('url');

    let parts = parser.pathname.split('/');
    return `ember-hifi:${this.get('connectionName')} (${parts[parts.length - 1]})`;
  }),

  pollInterval:      1000,
  timeout:           30000,

  hasPlayed:         false,
  isLoading:         false,
  isPlaying:         false,
  isErrored:         computed('error', function() {
    return !!this.get('error');
  }),
  error:             null,

  isStream:          equal('duration', Infinity),
  isFastForwardable: not('isStream'),
  isRewindable:      not('isStream'),

  duration:          0,
  percentLoaded:     0,

  // _position is updated by the service on the currently playing sound
  position:          computed('_position', {
    get() {
      return this._currentPosition();
    },
    set(k, v) {
      this.trigger('audio-position-will-change', this, {currentPosition: this._currentPosition(), newPosition: v});

      return this._setPosition(v);
    }
  }),

  mimeType: computed('url', function() {
    return getMimeType(this.url);
  }),

  debug(message) {
    const log = debug(this.debugName);
    log(message);
  },

  onSyncChanged(data) {
    console.log('on sync changed', data);
  },

  syncState() {
    this.sync.broadcast(this.url, {
      isPlaying: this.isPlaying,
      isLoaded: this.isLoaded,
      isStream: this.isStream,
      isFastForwardable: this.isFastForwardable,
      isRewindable: this.isRewindable,
      position: !this.isStream ? this.position : null
    })
  },

  audioContext() {
    if (!this._audioContext) {
      let element = this.audioElement();
      element.crossOrigin = "anonymous";
      this._audioContext =  new (window.AudioContext || window.webkitAudioContext)  
    }

    return this._audioContext;
  },

  audioMediaSource() {
    if (!this._audioMediaSource) {
      this._audioMediaSource = this.audioContext().createMediaElementSource(this.audioElement());
    }

    return this._audioMediaSource;
  },

  audioAnalyser() {
    if (!this._audioAnalyser) {
      this._audioAnalyser = this.audioContext().createAnalyser();
      this._audioAnalyser.fftSize = 2048;
    }

    return this._audioAnalyser;
  },

  startAnalysing() {
    this.audioMediaSource().connect(this.audioAnalyser());
    this.audioMediaSource().connect(this.audioContext().destination);
    return new Uint8Array(this.audioAnalyser().frequencyBinCount);
  },

  init: function() {
    let {
      audioLoading,
      audioLoaded,
      audioReady,
      audioPlayed,
      audioPaused,
      audioEnded,
      audioLoadError
    } = this.getProperties('audioLoading', 'audioLoaded', 'audioReady', 'audioPlayed', 'audioPaused', 'audioEnded', 'audioLoadError');
    this.set('isLoading', true);

    this.on('audio-played',    () => {
      this.set('hasPlayed', true);
      this.set('isLoading', false);
      this.set('isPlaying', true);
      this.set('error', null);

      if (audioPlayed) { audioLoading(this); }

      // recover lost isLoading update
      this.notifyPropertyChange('isLoading');
      this.syncState()
      this.debug('audio-played');
    });

    this.on('audio-paused',   () => {
      this.set('isPlaying', false);
      if (audioPaused) { audioPaused(this); }
      this.syncState()
      this.debug('audio-paused');
    });

    this.on('audio-ended',    () => {
      this.set('isPlaying', false);
      if (audioEnded) { audioEnded(this); }
      this.syncState()
      this.debug('audio-ended');
    });

    this.on('audio-ready',    () => {
      this.set('duration', this._audioDuration());
      if (audioReady) { audioReady(this); }
      this.syncState()
      this.debug('audio-ready');
    });

    this.on('audio-load-error', (e) => {
      if (this.get('hasPlayed')) {
        this.set('isLoading', false);
        this.set('isPlaying', false);
      }
      this.set('error', e);
      if (audioLoadError) { audioLoadError(this); }
      this.syncState()
      this.debug('audio-load-error');
    });

    this.on('audio-loaded', () => {
      this.set('isLoading', false);
      if (audioLoaded) { audioLoaded(this); }
      this.debug('audio-loaded');
    });

    this.on('audio-loading', (info) => {
      if (info && info.percentLoaded) {
        this.set('percentLoaded', info.percentLoaded);
      }
      if (audioLoading) { audioLoading(this, info && info.percentLoaded); }
      this.debug('audio-loading');
    });

  
    this.sync.on(`change:${this.url}`, this.onSyncChanged);

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
  },

  _detectTimeouts() {
    if (this.get('timeout')) {
      let timeout = later(() => {
          this.trigger('audio-load-error', "request timed out");
      }, this.get('timeout'));

      this.on('audio-ready',      () => cancel(timeout));
      this.on('audio-load-error', () => cancel(timeout));
    }
  },

  fastForward(duration) {
    let audioLength     = this._audioDuration();
    let currentPosition = this._currentPosition();
    let newPosition     = Math.min((currentPosition + duration), audioLength);

    this.trigger('audio-will-fast-forward', this, {currentPosition, newPosition});
    this._setPosition(newPosition);
  },

  rewind(duration) {
    let currentPosition = this._currentPosition();
    let newPosition     = Math.max((currentPosition - duration), 0);
    this.trigger('audio-will-rewind', this, {currentPosition, newPosition});
    this._setPosition(newPosition);
  },


  togglePause() {
    if (this.isPlaying) {
      this.pause();
    }
    else {
      this.play();
    }
  },

  /* To be defined on the subclass */
  setup() {
    assert("[ember-hifi] #setup interface not implemented", false);
  },

  _setVolume() {
    assert("[ember-hifi] #_setVolume interface not implemented", false);
  },

  _audioDuration() {
    assert("[ember-hifi] #_audioDuration interface not implemented", false);
  },

  _currentPosition() {
    assert("[ember-hifi] #_currentPosition interface not implemented", false);
  },

  _setPosition() {
    assert("[ember-hifi] #_setPosition interface not implemented", false);
  },

  play() {
    assert("[ember-hifi] #play interface not implemented", false);
  },

  pause() {
    assert("[ember-hifi] #pause interface not implemented", false);
  },

  stop() {
    assert("[ember-hifi] #stop interface not implemented", false);
  },

  teardown() {
    // optionally implemented in subclasses
  },

  willDestroy() {
    this.teardown();
  }
});

Sound.reopenClass(ClassMethods);

export default Sound;
