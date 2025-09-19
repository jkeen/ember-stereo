import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { next, later, cancel } from '@ember/runloop';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { getMimeType } from '../-private/utils/mime-types.js';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import Evented from '../-private/utils/evented.js';
import hasEqualUrls from '../-private/utils/has-equal-urls.js';
import { getOwner } from '@ember/application';
import { registerDestructor } from '@ember/destroyable';
import { task, didCancel, timeout, animationFrame } from 'ember-concurrency';
import { macroCondition, isTesting } from '@embroider/macros';

var _dec, _dec2, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17;

/**
 * This is the base sound object from which other sound objects are derived.
 *
 * @class BaseSound
 * @constructor
 */
let Sound = (_dec = task({
  maxConcurrency: 1,
  restartable: true
}), _dec2 = task({
  maxConcurrency: 1,
  drop: true
}), (_class = class Sound extends Evented {
  static setup(config) {
    this.config = config;
  }
  static canPlay(url, mimeType) {
    let usablePlatform = this.canUseConnection(url);
    if (!usablePlatform) {
      debug('ember-stereo:canPlay')(`can not use connection on this platform`);
      return false;
    }
    mimeType = mimeType || url.mimeType || getMimeType(url);
    if (mimeType) {
      let result = this.canPlayMimeType(mimeType);
      if (result) {
        debug('ember-stereo:canPlay')(`can play mime type ${mimeType} (${this.url})`);
      } else {
        debug('ember-stereo:canPlay')(`can't play mime type ${mimeType} (${this.url})`);
      }
      return result;
    } else {
      debug('ember-stereo:canPlay')(`can't play mime type ${mimeType} (${this.url})`);
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

  get identifier() {
    return this.url;
  }

  /**
   * name of the connection that produced the sound
   * @property connectionName
   * @type {String}
   * @public
   */

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
  get debugName() {
    var parser = document.createElement('a');
    parser.href = this.url;
    let parts = parser.pathname.split('/');
    return `ember-stereo:${this.connectionName || this.constructor.toString()} (${parts[parts.length - 1]})`;
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
    // _position is updated on a loop on the currently playing sound
    return this._position;
  }
  set position(v) {
    this.setPositionTask.perform(v).catch(e => {
      if (!didCancel(e)) {
        throw e;
      }
    });
  }
  *setPositionTask(v) {
    this.trigger('audio-position-will-change', {
      sound: this,
      currentPosition: this._currentPosition(),
      newPosition: v
    });
    if (macroCondition(isTesting())) ; else {
      yield timeout(50);
    }

    // next(() => {
    this._position = this._setPosition(v);
    // });
  }

  /* we both want to query for the playing sounds position, and fire change events
   more often than an audio element would, as documented in this issue: https://github.com/jkeen/ember-stereo/issues/24  */

  *updatePositionTask() {
    while (this.isPlaying) {
      yield animationFrame();
      yield timeout(50);
      let previousPosition = this._position;
      let currentPosition = this._currentPosition();
      if (previousPosition != currentPosition) {
        this._position = currentPosition;
        this.trigger('audio-position-changed', {
          sound: this,
          position: this._position
        });
      }
    }
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
   * get the sound's start time (probably only available on certain HLS sounds)
   * @property startTime
   * @type {Integer}
   * @public
   */
  get startTime() {
    return null;
  }

  /**
  * get the sound's end time (probably only available on certain HLS sounds)
  * @property endTime
  * @type {Integer}
  * @public
  */
  get endTime() {
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
    _initializerDefineProperty(this, "url", _descriptor, this);
    _initializerDefineProperty(this, "connectionName", _descriptor2, this);
    /**
     * has the sound played?
     * @property hasPlayed
     * @type {Boolean}
     * @public
     */
    _initializerDefineProperty(this, "hasPlayed", _descriptor3, this);
    /**
     * is the sound currently loading?
     * @property isLoading
     * @type {Boolean}
     * @public
     */
    _initializerDefineProperty(this, "isLoading", _descriptor4, this);
    /**
     * is the sound loaded?
     * @property isLoaded
     * @type {Boolean}
     * @public
     */
    _initializerDefineProperty(this, "isLoaded", _descriptor5, this);
    /**
     * is the sound currently playing?
     * @property isPlaying
     * @type {Boolean}
     * @public
     */
    _initializerDefineProperty(this, "isPlaying", _descriptor6, this);
    /**
     * is the sound errored?
     * @property isErrored
     * @type {Boolean}
     * @public
     */
    _initializerDefineProperty(this, "isErrored", _descriptor7, this);
    /**
     * is the sound ready?
     * @property isReady
     * @type {Boolean}
     * @public
     */
    _initializerDefineProperty(this, "isReady", _descriptor8, this);
    /**
     * has the sound been blocked by autoplay protections?
     * @property isBlocked
     * @type {Boolean}
     * @public
     */
    _initializerDefineProperty(this, "isBlocked", _descriptor9, this);
    /**
     * the sound's error, if errored
     * @property error
     * @type {String}
     * @public
     */
    _initializerDefineProperty(this, "error", _descriptor10, this);
    _initializerDefineProperty(this, "_position", _descriptor11, this);
    /**
     * what's the duration of the sound?
     * @property duration
     * @type {Integer} (ms)
     * @public
     */
    _initializerDefineProperty(this, "duration", _descriptor12, this);
    /**
     * @property percentLoaded
     * @type {Integer} (0-100)
     * @public
     */
    _initializerDefineProperty(this, "percentLoaded", _descriptor13, this);
    _initializerDefineProperty(this, "id3Tags", _descriptor14, this);
    _initializerDefineProperty(this, "id3TagMetadata", _descriptor15, this);
    _initializerDefineProperty(this, "_debug", _descriptor16, this);
    // for internal debugging
    _initializerDefineProperty(this, "sharedAudioAccess", _descriptor17, this);
    registerDestructor(this, this.teardown.bind(this));
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
      audioLoadError
    } = this;
    this.isLoading = true;
    this.on('audio-played', () => {
      this.hasPlayed = true;
      this.isLoading = false;
      this.isPlaying = true;
      this.isBlocked = false;
      this.error = null;
      this.updatePositionTask.perform().catch(e => {
        if (!didCancel(e)) {
          throw e;
        }
      });
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
      this.position = 0;
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
      let {
        error
      } = opts;
      if (this.hasPlayed) {
        this.isLoading = false;
        this.isPlaying = false;
      }
      this.debug('audio-load-error');
      if (this.shouldRetry && this.retry) {
        this.retry();
      } else {
        this.isErrored = true;
        this.error = error;
        if (audioLoadError) {
          audioLoadError(this);
        }
      }
    });
    this.on('audio-loaded', () => {
      this.isLoading = false;
      this.isLoaded = true;
      if (audioLoaded) {
        audioLoaded(this);
      }
      this.debug('audio-loaded');
    });
    this.on('audio-loading', info => {
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
          error: `Error in setup ${e.message}`
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
          error: 'request timed out'
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
      newPosition
    });
    this.position = newPosition;
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
      newPosition
    });
    this.position = newPosition;
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
    this.isDestroyed = true;
  }
  hasUrl(url) {
    return hasEqualUrls(this.url, url);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "url", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "connectionName", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "hasPlayed", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "isLoaded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "isPlaying", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "isErrored", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "isReady", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "isBlocked", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "error", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "_position", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "duration", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "percentLoaded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "id3Tags", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "id3TagMetadata", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "_debug", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "sharedAudioAccess", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "setPositionTask", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "setPositionTask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updatePositionTask", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "updatePositionTask"), _class.prototype)), _class));

export { Sound as default };
//# sourceMappingURL=base.js.map
