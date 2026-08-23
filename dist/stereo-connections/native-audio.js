import { b as _defineProperty, _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-hULyhLkN.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { tracked } from '@glimmer/tracking';
import { run } from '@ember/runloop';
import { macroCondition, isTesting } from '@embroider/macros';
import { timeout, didCancel } from 'ember-concurrency';
import Sound from './base.js';
import isSameAudio from '../-private/utils/is-same-audio.js';
import MediaLength from '../-private/utils/media-length.js';

var _class, _descriptor, _NativeAudio;
// These are the events we're watching for
const AUDIO_EVENTS = ['loadstart', 'durationchange', 'loadedmetadata', 'loadeddata', 'progress', 'canplay', 'canplaythrough', 'error', 'playing', 'waiting', 'pause', 'ended', 'seeking', 'seeked', 'emptied', 'timeupdate'];
const DURATION_SAMPLE_MS = 250;

// Ready state values
// const HAVE_NOTHING = 0;
// const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
// const HAVE_FUTURE_DATA = 3;
// const HAVE_ENOUGH_DATA = 4;

/**
 * This is the connection class that uses a plain ol audio element to play sounds.
 *
 * @class NativeAudio
 * @extends BaseSound
 * @constructor
 */
let NativeAudio = (_class = (_NativeAudio = class NativeAudio extends Sound {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "_internalElement", _descriptor, this);
    _defineProperty(this, "_mediaLength", new MediaLength({
      sampleMs: DURATION_SAMPLE_MS
    }));
    _defineProperty(this, "_playTask", buildTask(() => ({
      context: this,
      generator: function* ({
        position
      }) {
        this.isLoading = true;
        this.isBlocked = false;
        this._stopStreamAfterGraceTask.cancelAll();
        let audio = this.requestControl();
        if (this.isStream && this._streamConnectionIsWarm(audio)) {
          this._seekToLiveEdge(audio);
        } else {
          // pause clears the `src` attr for streams, so restore it here
          this._loadAudio(audio);
          this._restoreState();
        }
        if (typeof position !== 'undefined') {
          this._setPosition(position);
        }
        this.debug('telling audio to play');
        try {
          yield audio.play().catch(e => {
            throw e;
          });
        } catch (e) {
          this._onAudioError(e);
        } finally {
          this.isLoading = false;
        }
      }
    }), {
      restartable: true
    }, "_playTask", null));
    _defineProperty(this, "_stopStreamAfterGraceTask", buildTask(() => ({
      context: this,
      generator: function* (graceMs) {
        yield timeout(graceMs);
        if (!this._stillOwnsSharedElement) {
          this.debug('grace period expired but we no longer own the element');
          return;
        }
        this.debug('stream pause grace period expired, stopping');
        this.stop();
      }
    }), {
      restartable: true
    }, "_stopStreamAfterGraceTask", null));
  }
  static toString() {
    return 'Native Audio';
  }
  static canPlayMimeType(mimeType) {
    let audio = new Audio();
    // it returns "probably" and "maybe". Both are worth trying. Empty is bad.
    return audio.canPlayType(mimeType) !== '';
  }
  setup() {
    let audio = this.requestControl();
    audio.src = this.url;
    this._registerEvents(audio);
    this.retryCount = 0;
    if (macroCondition(isTesting())) {
      audio.muted = true;
    }
    if (this.options?.xhr) {
      this.debug('xhr options are not supported in NativeAudio, ignoring and trying to load anyway');
      audio.load();
    } else {
      audio.load();
    }
  }
  _registerEvents(audio) {
    // Not a class field, because setup() runs from BaseSound's constructor before subclass field initializers.
    this._audioEventHandlers = {};
    AUDIO_EVENTS.forEach(eventName => {
      let handler = e => run(() => this._handleAudioEvent(eventName, e));
      this._audioEventHandlers[eventName] = handler;
      audio.addEventListener(eventName, handler);
    });
  }
  _unregisterEvents(audio) {
    // A single-arg removeEventListener throws in real browsers, aborting teardown.
    let handlers = this._audioEventHandlers;
    if (!handlers) {
      return;
    }
    AUDIO_EVENTS.forEach(eventName => {
      let handler = handlers[eventName];
      if (handler) {
        audio.removeEventListener(eventName, handler);
      }
    });
    this._audioEventHandlers = {};
  }
  _handleAudioEvent(eventName, e) {
    if (!isSameAudio(e.target?.src, this.url, {
      exact: true
    }) && e.target?.src !== '') {
      // This event is not for us if our srcs aren't equal

      // but if the target src is empty it means we've been stopped and in
      // that case should allow the event through.
      return;
    }
    this.debug(`Handling '${eventName}' event from audio element`);
    switch (eventName) {
      case 'loadeddata':
        var audio = this.audioElement;
        // Firefox doesn't fire a 'canplay' event until after you call *play* on
        // the audio, but it does fire 'loadeddata' when it's ready
        if (audio.readyState >= HAVE_CURRENT_DATA) {
          this._onAudioReady();
        }
        break;
      case 'canplay':
      case 'canplaythrough':
        this._onAudioReady();
        break;
      case 'error':
        this._onAudioError(e.target.error);
        break;
      case 'onloadedmetadata':
        this._onAudioDurationChanged();
        this.duration = this._resolveDuration();
        break;
      case 'playing':
        this._onAudioPlayed();
        break;
      case 'waiting':
        this._onAudioWaiting();
        break;
      case 'pause':
        this._onAudioPaused();
        break;
      case 'durationchange':
        this._onAudioDurationChanged();
        this.duration = this._resolveDuration();
        break;
      case 'ended':
        this._onAudioEnded();
        break;
      case 'seeking':
      case 'seeked':
      case 'timeupdate':
        this._onPositionChange();
        break;
      case 'progress':
        this._onAudioProgress(e);
        break;
    }
  }
  _onAudioReady() {
    this.debug('triggering audio ready');
    this.trigger('audio-ready', {
      sound: this
    });
    this.trigger('audio-loaded', {
      sound: this
    });
  }
  _onAudioPlayed() {
    if (!this.isPlaying) {
      this.trigger('audio-played', {
        sound: this
      });
      this._mediaLength.watchTask.perform({
        durationMs: () => this.audioElement?.duration * 1000,
        isPlaying: () => this.isPlaying,
        onReclassified: () => this.duration = this._resolveDuration()
      }).catch(e => {
        if (!didCancel(e)) {
          console.error(e);
        }
      });
    }
  }
  _onAudioPaused() {
    this.trigger('audio-paused', {
      sound: this
    });
  }
  _onAudioEnded() {
    this.trigger('audio-ended', {
      sound: this
    });
  }
  _onAudioWaiting() {
    this.isLoading = true;
  }
  _onAudioError(error) {
    if (error.name === 'NotAllowedError') {
      this.stop();
      this.trigger('audio-blocked', {
        sound: this,
        error: error.message,
        event: error
      });
    } else {
      let message = '';
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          message = 'You aborted the audio playback.';
          break;
        case error.MEDIA_ERR_NETWORK:
          message = 'A network error caused the audio download to fail.';
          break;
        case error.MEDIA_ERR_DECODE:
          message = 'Decoder error.';
          break;
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          message = error.message || 'Audio source format is not supported.';
          break;
        default:
          message = error.message;
          break;
      }
      this.debug(`audio element threw error ${message}`);
      this.trigger('audio-load-error', {
        sound: this,
        error: message,
        event: error
      });
    }
  }
  _onAudioProgress() {
    if (!this.isStream) {
      this.trigger('audio-loading', {
        sound: this,
        ...this._calculatePercentLoaded()
      });
    }
  }
  _onPositionChange() {
    if (!this.isStream) {
      this.trigger('audio-position-changed', {
        sound: this,
        position: this.position
      });
    }
  }
  _onAudioDurationChanged() {
    this.trigger('audio-duration-changed', {
      sound: this,
      duration: this._resolveDuration()
    });
  }
  _loadAudio(audio) {
    this.defeatBrowserCaching();
    if (!isSameAudio(audio.src, this.url, {
      exact: true
    })) {
      audio.setAttribute('src', this.url);
      audio.load();
      this._mediaLength.sourceReloaded();
    }
  }
  defeatBrowserCaching() {
    // https://stackoverflow.com/questions/65740471/html-audio-internet-stream-caching-issue
    // Sometimes the browser can cache streams and when trying to play the stream live
    // after having it paused it will interleave the old cached version and the current live version
    // in an schizophrenically bonkers way. This appends a #timestamp to the end of the url in a way
    // that should overcome that

    if (this.isStream) {
      let a = document.createElement('a');
      a.href = this.url;
      a.hash = new Date().getTime();
      this.url = a.href;
    }
  }
  _streamConnectionIsWarm(audio) {
    return !!audio?.src && isSameAudio(audio.src, this.url, {
      exact: true
    });
  }
  _seekToLiveEdge(audio) {
    try {
      if (audio.seekable?.length) {
        audio.currentTime = audio.seekable.end(audio.seekable.length - 1);
      }
    } catch (e) {
      this.debug('could not seek to the live edge, playing from where we are');
    }
  }
  _calculatePercentLoaded() {
    let ranges = this.audioElement?.buffered;
    if (!ranges?.length) {
      return {};
    }
    let bufferedMs = 0;
    for (let index = 0; index < ranges.length; index++) {
      bufferedMs += (ranges.end(index) - ranges.start(index)) * 1000;
    }
    let durationMs = this._audioDuration();
    this.debug(`buffered ${Math.round(bufferedMs)}ms of ${durationMs}ms`);

    // A live source has no length to be a fraction of.
    if (!Number.isFinite(durationMs) || durationMs <= 0) {
      return {};
    }
    return {
      percentLoaded: bufferedMs / durationMs
    };
  }
  get audioElement() {
    // If we have control, return the shared element
    // if we don't have control, return the internal cloned element

    let sharedAudioAccess = this.sharedAudioAccess;
    if (sharedAudioAccess && sharedAudioAccess.hasControl(this)) {
      return sharedAudioAccess.audioElement;
    }
    return this.internalElement;
  }
  get internalElement() {
    if (!this._internalElement) {
      this._internalElement = document.createElement('audio');
      this._internalElement.setAttribute('preload', 'metadata');
      this._internalElement.setAttribute('crossorigin', 'anonymous');
    }
    return this._internalElement;
  }
  requestControl() {
    if (this.sharedAudioAccess) {
      return this.sharedAudioAccess.requestControl(this);
    } else {
      return this.audioElement;
    }
  }
  releaseControl() {
    if (!this.sharedAudioAccess) {
      return;
    }
    this._stopStreamAfterGraceTask.cancelAll();

    // Send a pause event to ensure playback status is updated correctly.
    // If this doesn't happen, the audio can get stuck in a playing state,
    // even though it's not playing. https://github.com/jkeen/ember-stereo/issues/22
    this._onAudioPaused(this);
    this.sharedAudioAccess.releaseControl(this);
    // save current state of audio element to the internal element that won't be played
    this._saveState(this.sharedAudioAccess.audioElement);
  }
  _saveState(audio) {
    this.debug('Saving audio state');
    this.internalElement.src = audio.src;
    try {
      this.internalElement.currentTime = audio.currentTime;
    } catch (e) {
      this.debug('Errored while trying to save audio current time');
      this.debug(e);
    }
    this.internalElement.volume = audio.volume;
    this.debug('Saved audio state');
  }
  _restoreState() {
    let sharedElement = this.audioElement;
    let internalElement = this.internalElement;
    if (this.sharedAudioAccess && internalElement) {
      this.debug('Restoring audio state…');
      try {
        // restore the state of the shared element from the dummy element
        if (internalElement.currentTime) {
          sharedElement.currentTime = internalElement.currentTime;
        }
        if (internalElement.volume) {
          sharedElement.volume = internalElement.volume;
        }
        this.debug('Restored audio state');
      } catch (e) {
        this.debug('Errored while trying to restore audio state');
        this.debug(e);
      }
    }
  }
  get _stillOwnsSharedElement() {
    return !this.sharedAudioAccess || this.sharedAudioAccess.hasControl(this);
  }
  get _measuredSeekable() {
    return this._seekableWindowMs > 0 || super._measuredSeekable;
  }
  get _seekableWindowMs() {
    let audio = this.audioElement;
    return this._mediaLength.seekableWindowMs({
      elementDurationMs: audio?.duration * 1000,
      seekable: audio?.seekable
    });
  }
  get _probablyAStream() {
    return this._mediaLength.isLive;
  }
  adoptKnownStream(isStream) {
    if (isStream) {
      this._mediaLength.assumeLive();
    }
  }
  _audioDuration() {
    let audio = this.audioElement;
    return this._mediaLength.estimate({
      elementDurationMs: audio?.duration * 1000,
      seekable: audio?.seekable
    });
  }
  _currentPosition() {
    return this.audioElement.currentTime * 1000;
  }
  _setPosition(position) {
    this.audioElement.currentTime = position / 1000;
    return this._currentPosition();
  }
  _setPlaybackSpeed(speed) {
    if (macroCondition(isTesting())) {
      this.debug(`skipping set volume in test env: ${speed}`);
    } else {
      this.debug(`_setPlayback: ${speed}`);
      let audio = this.audioElement;
      audio.playbackSpeed = speed;
    }
  }
  _setVolume(volume) {
    if (macroCondition(isTesting())) {
      this.debug(`skipping set volume in test env: ${volume}`);
    } else {
      this.debug(`_setVolume: ${volume}`);
      let audio = this.audioElement;
      audio.volume = volume / 100;
    }
  }
  play({
    position
  } = {}) {
    return this._playTask.perform({
      position
    });
  }
  pause() {
    this.debug('#pause');
    let audio = this.audioElement;
    audio.pause();
    if (!this.isStream) {
      this.debug('paused a recording, so the element keeps its media');
      return;
    }
    let grace = this.options?.streamPauseGraceMs ?? 0;
    if (!grace) {
      this.debug('no grace period, stopping the stream now');
      this.stop(); // we don't want the stream to continue loading while paused
    } else if (grace === Infinity) {
      this.debug('holding this stream open until something stops it');
    } else {
      this.debug(`holding this stream open for ${grace}ms`);
      this._stopStreamAfterGraceTask.perform(grace).catch(e => {
        if (!didCancel(e)) {
          console.error(e);
        }
      });
    }
  }
  stop() {
    this.debug('#stop');
    let audio = this.audioElement;
    this._stopStreamAfterGraceTask.cancelAll();
    audio.pause();

    // calling pause halts playback but does not stop downloading streaming
    // media. this is the method recommended by MDN: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media
    audio.removeAttribute('src');
    audio.load();
    this._mediaLength.sourceReloaded();

    // load() discards the pause event audio.pause() just queued.
    this._onAudioPaused();
  }
  get shouldRetry() {
    return this.retryCount < 1;
  }
  retry() {
    this.debug(`retrying load with crossorigin not set`);
    this.audioElement.removeAttribute('crossorigin');
    this._mediaLength.sourceReloaded();
    this.retryCount = this.retryCount + 1;
    this.audioElement.src = this.url;
    this.audioElement.load();
  }
  teardown() {
    let audio = this.requestControl();
    this._mediaLength.watchTask.cancelAll();
    this._stopStreamAfterGraceTask.cancelAll();
    this.trigger('_will_destroy', {
      sound: this
    });
    this._unregisterEvents(audio);
    super.teardown();
  }
}, _defineProperty(_NativeAudio, "key", 'NativeAudio'), _NativeAudio), _descriptor = _applyDecoratedDescriptor(_class.prototype, "_internalElement", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { NativeAudio as default };
//# sourceMappingURL=native-audio.js.map
