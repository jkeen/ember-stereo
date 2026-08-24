import { a as _initializerDefineProperty, b as _defineProperty, _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import Sound from './base.js';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _HLSSound;
/**
 * This is the connection class that uses HLS.js to play sounds.
 *
 * @class HLS
 * @extends HLSSound
 * @constructor
 */

function getMediaSource(preferManagedMediaSource = true) {
  if (typeof self === 'undefined') return undefined;
  const mms = (preferManagedMediaSource || !self.MediaSource) && self.ManagedMediaSource;
  return mms || self.MediaSource || self.WebKitMediaSource;
}
function mimeTypeForCodec(codec, type) {
  return `${type}/mp4;codecs="${codec}"`;
}
function getSourceBuffer() {
  return self.SourceBuffer || self.WebKitSourceBuffer;
}
function isMSESupported() {
  const mediaSource = getMediaSource();
  if (!mediaSource) {
    return false;
  }

  // if SourceBuffer is exposed ensure its API is valid
  // Older browsers do not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
  const sourceBuffer = getSourceBuffer();
  return !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
}
let HLSSound = (_class = (_HLSSound = class HLSSound extends Sound {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "live", _descriptor, this);
    _initializerDefineProperty(this, "loaded", _descriptor2, this);
    _initializerDefineProperty(this, "mediaRecoveryAttempts", _descriptor3, this);
    _initializerDefineProperty(this, "skippedFragments", _descriptor4, this);
    _initializerDefineProperty(this, "_currentTime", _descriptor5, this);
    _initializerDefineProperty(this, "_startTime", _descriptor6, this);
    _initializerDefineProperty(this, "_endTime", _descriptor7, this);
  }
  static canUseConnection() {
    // This is copied from the HLS source. We don't want to load all of HLS.js just to check if it can be used
    if (!isMSESupported()) {
      return false;
    }
    const mediaSource = getMediaSource();
    return typeof mediaSource?.isTypeSupported === 'function' && (['avc1.42E01E,mp4a.40.2', 'av01.0.01M.08', 'vp09.00.50.08'].some(codecsForVideoContainer => mediaSource.isTypeSupported(mimeTypeForCodec(codecsForVideoContainer, 'video'))) || ['mp4a.40.2', 'fLaC'].some(codecForAudioContainer => mediaSource.isTypeSupported(mimeTypeForCodec(codecForAudioContainer, 'audio'))));
  }
  static toString() {
    return 'HLS';
  }
  async setup() {
    if (!this.hls && !this.video) {
      this.debug('Setting up HLS');
      let options = {
        debug: false,
        startFragPrefetch: true
      };

      // hls.js re-consults config.startPosition after every stopLoad and live playlist reload.
      let {
        startPosition,
        ...connectionOptions
      } = this.options || {};
      let startsAtPosition = typeof startPosition === 'number';
      if (this.options?.xhr) {
        options.xhrSetup = (xhr, url) => {
          if (this.url !== url && this.options.xhr?.manifestOnly) {
            // If this isn't the manifest request and we've requested manifestOnly, don't set these options
            return;
          }
          xhr.withCredentials = this.options.xhr?.withCredentials || false;
          if (this.options?.xhr?.headers) {
            Object.keys(this.options.xhr.headers).forEach(key => {
              xhr.setRequestHeader(key, this.options?.xhr?.headers[key]);
            });
          }
          xhr.method = this.options.xhr?.method || 'GET';
        };
      }
      await this.loadHLS().then(({
        HLS
      }) => {
        if (this.hls) {
          this.hls.destroy();
        }
        if (this.video) {
          this.video.removeAttribute('src');
        }

        // hls.js only honours startLoad(position) when not already loading.
        if (startsAtPosition) {
          options.autoStartLoad = false;
        }
        let hls = new HLS({
          ...options,
          ...connectionOptions
        });
        this.hls = hls;
        this.startPosition = startsAtPosition ? startPosition : null;
        let video = document.createElement('video');
        video.setAttribute('crossorigin', 'anonymous');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('playsinline', '');
        this.video = video;
        this._setupHLSEvents(hls, HLS);
        this._setupPlayerEvents(this.video);
        hls.attachMedia(this.video);
      });
    }
  }
  _setupHLSEvents(instance, HLS) {
    instance.on(HLS.Events.MEDIA_ATTACHING, () => {
      this.debug('media attaching');
    });
    instance.on(HLS.Events.MEDIA_DETACHING, () => {
      this.debug('media detaching');
    });
    instance.on(HLS.Events.MEDIA_DETACHED, () => {
      this.debug('media detached');
    });

    // hls.on(HLS.Events.BUFFER_RESET, () => {
    //   this.debug('buffer reset');
    //   this._checkIfAudioIsReady();
    // });

    instance.on(HLS.Events.ERROR, (e, data) => this._onHLSError(e, data, HLS));
    instance.on(HLS.Events.MEDIA_ATTACHED, () => {
      this.debug('media attached, loading source');
      instance.loadSource(this.url);
      if (this.startPosition != null) {
        this.debug(`starting load at ${this.startPosition}s`);
        instance.startLoad(this.startPosition);
        this.startPosition = null;
      }
    });
    instance.on(HLS.Events.MANIFEST_PARSED, (e, data) => {
      this.debug(`manifest parsed and loaded, found ${data.levels.length} quality level(s)`);
      this.manifest = data;
    });
    instance.on(HLS.Events.LEVEL_LOADED, (e, data) => {
      this.debug(`level ${data.level} loaded`);
      this.live = data.details.live;
      this._updateStartAndEndTimes(data.details);
      this._signalAudioIsReady();
    });
    instance.on(HLS.Events.AUDIO_TRACK_LOADED, () => {
      this.debug('audio track loaded');
      this._signalAudioIsReady();
    });
    instance.on(HLS.Events.ERROR, (e, data) => this._onHLSError(e, data, HLS));
    instance.on(HLS.Events.FRAG_CHANGED, (e, f) => {
      this.skippedFragments = 0;
      this._updateId3Info(f.frag);
    });
  }
  _updateStartAndEndTimes(levelDetails) {
    if (levelDetails?.fragments?.length > 0) {
      const fragments = levelDetails.fragments;
      const lastFragment = fragments[fragments.length - 1];
      const firstFragment = fragments[0];
      if (firstFragment?.programDateTime) {
        if (new Date(firstFragment.programDateTime) != this._startTime) {
          this._startTime = new Date(firstFragment.programDateTime);
        }
      }
      if (lastFragment?.programDateTime) {
        if (new Date(lastFragment.programDateTime) != this._endTime) {
          this._endTime = new Date(lastFragment.programDateTime);
        }
      }
    }
  }
  _updateId3Info(fragment) {
    let newId3TagMetadata = {
      title: fragment.title,
      programDateTime: fragment.programDateTime,
      rawProgramDateTime: fragment.rawProgramDateTime
    };
    if (JSON.stringify(this.id3TagMetadata) !== JSON.stringify(newId3TagMetadata)) {
      this.debug('hls metadata changed');
      this.trigger('audio-metadata-changed', {
        sound: this,
        old: this.id3TagMetadata,
        new: newId3TagMetadata
      });
      this.id3TagMetadata = newId3TagMetadata;
    }
  }
  _setupPlayerEvents(video) {
    video.addEventListener('playing', () => {
      if (this.loaded) {
        this.trigger('audio-played', {
          sound: this
        });
      } else {
        this._signalAudioIsReady();
      }
    });
    video.addEventListener('pause', () => this.trigger('audio-paused', {
      sound: this
    }));
    video.addEventListener('ended', () => this.trigger('audio-ended', {
      sound: this
    }));
    video.addEventListener('durationchange', () => this.trigger('audio-duration-changed', {
      sound: this
    }));
    video.addEventListener('seeked', () => this.trigger('audio-position-changed', {
      sound: this,
      currentTime: this.currentTime
    }));
    video.addEventListener('timeupdate', () => this.trigger('audio-position-changed', {
      sound: this,
      currentTime: this.currentTime
    }));
    video.addEventListener('progress', () => this.trigger('audio-loading', {
      sound: this
    }));
    video.addEventListener('error', e => this._onVideoError(e));
  }
  async _checkIfAudioIsReady() {
    if (!this.loaded) {
      // The only reliable way to check if this thing is actually ready
      // is to play it. If we get a play signal we're golden, but if we
      // get an error, we're outta here

      this.debug('Testing if audio is ready');
      this.video.volume = 0;
      this.tryPlaying();
    }
  }
  _signalAudioIsReady() {
    this.debug('Test succeeded, signaling audio-ready');
    this.loaded = true;
    this.trigger('audio-loaded', {
      sound: this
    });
    this.trigger('audio-ready', {
      sound: this
    });
  }
  _onVideoError(e) {
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        this.debug('video element error: playback aborted');
        this._giveUpAndDie('unknown error');
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        this.debug('video element error: network error');
        this._giveUpAndDie('Network error caused download to fail');
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        this.debug('video element error: decoding error');
        this._tryToRecoverFromMediaError(e.target.error.MEDIA_ERR_DECODE);
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        this.debug('video element error: source format not supported');
        this._giveUpAndDie('audio source format is not supported');
        break;
      default:
        this._giveUpAndDie('unknown error');
        break;
    }
  }
  _onHLSError(error, data, HLS) {
    if (data.fatal) {
      this.debug('HLS fatal error', data);
      switch (data.type) {
        case HLS.ErrorTypes.NETWORK_ERROR:
          this._giveUpAndDie(`${data.details}`);
          break;
        case HLS.ErrorTypes.MEDIA_ERROR:
          if (this._skipUnparseableFragment(data, HLS)) {
            return;
          }
          this._tryToRecoverFromMediaError(`${data.details}`);
          break;
        default:
          this._giveUpAndDie(`${data.details}`);
          break;
      }
    }
  }
  _tryToRecoverFromMediaError(error) {
    let mediaRecoveryAttempts = this.mediaRecoveryAttempts;
    let hls = this.hls;
    switch (mediaRecoveryAttempts) {
      case 0:
        this.debug(`First attempt at media error recovery for error: ${error}`);
        hls.recoverMediaError();
        break;
      case 1:
        this.debug(`Second attempt at media error recovery: switching codecs for error: ${error}`);
        hls.swapAudioCodec();
        hls.recoverMediaError();
        break;
      case 2:
        this.debug(`We tried our best and we failed: ${error}`);
        this._giveUpAndDie(error);
        break;
    }
    this.mediaRecoveryAttempts = this.mediaRecoveryAttempts + 1;
  }

  // recoverMediaError() loops on the same bad fragment, so seek past it instead.
  _skipUnparseableFragment(data, HLS) {
    if (data.details !== HLS.ErrorDetails.FRAG_PARSING_ERROR) {
      return false;
    }
    const fragment = data.frag;
    if (!fragment || !Number.isFinite(fragment.end)) {
      return false;
    }
    if (this.skippedFragments >= HLSSound.MAX_FRAGMENT_SKIPS) {
      this.debug(`gave up after skipping ${this.skippedFragments} fragments`);
      return false;
    }
    const resumePosition = fragment.end + 0.1;
    this.debug(`skipping unparseable fragment (${fragment.start}s–${fragment.end}s), resuming at ${resumePosition}s`);
    this.skippedFragments = this.skippedFragments + 1;
    this._setVideoCurrentTime(resumePosition);
    this.hls.startLoad();
    return true;
  }

  // video.currentTime throws on non-finite values, which NaN becomes once media detaches.
  _setVideoCurrentTime(seconds) {
    if (!Number.isFinite(seconds)) {
      this.debug(`ignoring non-finite currentTime write: ${seconds}`);
      return false;
    }
    this.video.currentTime = seconds;
    return true;
  }
  _giveUpAndDie(error) {
    this.hls.destroy();
    this.trigger('audio-load-error', {
      sound: this,
      error
    });
  }
  get audioElement() {
    return this.video;
  }

  /* Public interface to sound */

  get currentTime() {
    if (this.hls.playingDate) {
      return new Date(this.hls.playingDate);
    }
    return null;
  }
  get startTime() {
    return this._startTime;
  }
  get endTime() {
    return this._endTime;
  }
  get _measuredSeekable() {
    return true;
  }

  // No #EXT-X-ENDLIST means the show is still on air, which says nothing about its beginning.
  get isLive() {
    return this.live;
  }
  _audioDuration() {
    let duration = this.video.duration * 1000;
    if (Number.isFinite(duration)) {
      return duration;
    }

    // A playlist with no #EXT-X-ENDLIST reports Infinity, so the seekable range is the real recorded timeline.
    let seekable = this.video.seekable;
    return seekable?.length ? seekable.end(seekable.length - 1) * 1000 : duration;
  }
  _currentPosition() {
    return this.video.currentTime * 1000;
  }
  _setPosition(position) {
    let seconds = position / 1000;
    if (this.loadStopped || !this.isPlaying) {
      this.hls.startLoad(seconds);
      this.loadStopped = false;
    }
    this._setVideoCurrentTime(seconds);
    return position;
  }
  _setPlaybackSpeed(speed) {
    this.video.playbackRate = speed;
  }
  _setVolume(volume) {
    this.video.volume = volume / 100;
  }
  async tryPlaying() {
    try {
      await this.video.play();
    } catch (error) {
      if (error.name == 'NotAllowedError') {
        this.trigger('audio-blocked', {
          sound: this,
          error: error.message,
          event: error
        });
        this.pause();
      }
    }
  }
  async play() {
    this.isLoading = true;
    this.isBlocked = false;
    if (!this.video.src) {
      this.trigger('audio-loading', this);
      this.setup(); // the stream was stopped before
    }
    await this.tryPlaying();
    this.debug('#play');
    if (this.loadStopped) {
      this.hls.startLoad();
      this.loadStopped = false;
    }
  }
  pause() {
    this.debug('#pause');
    this.video.pause();

    // Only a live playlist pulls fragments forever.
    if (this.live) {
      this.hls.stopLoad();
      this.loadStopped = true;
    }
  }
  stop() {
    this.debug('#stop');
    this.pause();
    this.hls.stopLoad();
    this.loadStopped = true;
    this.video.removeAttribute('src');
  }
  teardown() {
    this.hls.destroy();
    super.teardown();
  }

  // Lazy chunk. Warm it with stereo.prewarmConnection('HLS').
  static preload() {
    return import('hls.js');
  }
  async loadHLS() {
    return HLSSound.preload().then(module => module.default).then(HLS => {
      return Promise.resolve({
        HLS: HLS
      });
    });
  }
}, _defineProperty(_HLSSound, "acceptMimeTypes", ['application/vnd.apple.mpegurl']), _defineProperty(_HLSSound, "key", 'HLS'), _defineProperty(_HLSSound, "MAX_FRAGMENT_SKIPS", 10), _HLSSound), _descriptor = _applyDecoratedDescriptor(_class.prototype, "live", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "loaded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "mediaRecoveryAttempts", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "skippedFragments", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "_currentTime", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "_startTime", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "_endTime", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, "setup", [waitFor], Object.getOwnPropertyDescriptor(_class.prototype, "setup"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadHLS", [waitFor], Object.getOwnPropertyDescriptor(_class.prototype, "loadHLS"), _class.prototype), _class);

export { HLSSound as default };
//# sourceMappingURL=hls.js.map
