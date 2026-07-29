import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { isTesting, macroCondition } from '@embroider/macros';
import { task, timeout, didCancel } from 'ember-concurrency';
import { cached } from 'tracked-toolbox';
import BaseSound from './base';
// These are the events we're watching for
const AUDIO_EVENTS = [
  'loadstart',
  'durationchange',
  'loadedmetadata',
  'loadeddata',
  'progress',
  'canplay',
  'canplaythrough',
  'error',
  'playing',
  'waiting',
  'pause',
  'ended',
  'seeking',
  'seeked',
  'emptied',
  'timeupdate',
];

// Seconds from zero a seekable window may start and still count as reaching the beginning of the media.
const SEEKABLE_START_TOLERANCE = 1;

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
export default class NativeAudio extends BaseSound {
  @tracked _internalElement;

  static canPlayMimeType(mimeType) {
    let audio = new Audio();
    // it returns "probably" and "maybe". Both are worth trying. Empty is bad.
    return audio.canPlayType(mimeType) !== '';
  }

  static key = 'NativeAudio';
  static toString() {
    return 'Native Audio';
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
      this.debug('xhr options are not supported in NativeAudio, ignoring and trying to load anyway')
      audio.load();
    } else {
      audio.load();
    }
  }

  _registerEvents(audio) {
    // Not a class field: setup() runs from BaseSound's constructor, before subclass field initializers would wipe it.
    this._audioEventHandlers = {};
    AUDIO_EVENTS.forEach((eventName) => {
      let handler = (e) => run(() => this._handleAudioEvent(eventName, e));
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
    AUDIO_EVENTS.forEach((eventName) => {
      let handler = handlers[eventName];
      if (handler) {
        audio.removeEventListener(eventName, handler);
      }
    });
    this._audioEventHandlers = {};
  }

  _handleAudioEvent(eventName, e) {
    if (!this.urlsAreEqual(e.target?.src, this.url) && e.target?.src !== '') {
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
      // 'emptied' is deliberately not treated as a pause: loadAudio and retry empty the element on the way into playing, and #stop reports its own.
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

  releaseControl() {
    if (!this.sharedAudioAccess) {
      return;
    }

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

  requestControl() {
    if (this.sharedAudioAccess) {
      return this.sharedAudioAccess.requestControl(this);
    } else {
      return this.audioElement;
    }
  }

  restoreState() {
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

  _onAudioProgress() {
    if (!this.isStream) {
      this.trigger('audio-loading', {
        sound: this,
        ...this._calculatePercentLoaded(),
      });
    }
  }

  _onPositionChange() {
    if (!this.isStream) {
      this.trigger('audio-position-changed', {
        sound: this,
        position: this.position,
      });
    }
  }

  _onAudioDurationChanged() {
    this.trigger('audio-duration-changed', {
      sound: this,
      duration: this._resolveDuration(),
    });
  }

  _onAudioPlayed() {
    if (!this.isPlaying) {
      this.trigger('audio-played', { sound: this });
      this.durationWorkaroundTask.perform().catch((e) => {
        if (!didCancel(e)) {
          console.error(e);
        }
      });
    }
  }

  _onAudioEnded() {
    this.trigger('audio-ended', { sound: this });
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
        event: error,
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
        event: error,
      });
    }
  }

  _onAudioPaused() {
    this.trigger('audio-paused', { sound: this });
  }

  _onAudioReady() {
    this.debug('triggering audio ready');
    this.trigger('audio-ready', { sound: this });
    this.trigger('audio-loaded', { sound: this });
  }

  _calculatePercentLoaded() {
    let audio = this.audioElement;

    if (audio && audio.buffered && audio.buffered.length) {
      let ranges = audio.buffered;
      let totals = [];
      for (var index = 0; index < ranges.length; index++) {
        totals.push(ranges.end(index) - ranges.start(index));
      }

      let total = A(totals).reduce((a, b) => a + b, 0);

      this.debug(`ms loaded: ${total * 1000}`);
      this.debug(`duration: ${this._audioDuration()}`);
      this.debug(`percent loaded = ${(total / audio.duration) * 100}`);

      return { percentLoaded: total / audio.duration };
    } else {
      return 0;
    }
  }

  /* Public interface */

  _audioDuration() {
    let audio = this.audioElement;
    if (audio.duration > 172800000 || this.probablyAStream) {
      // if audio is longer than 3 days in milliseconds,
      // assume it's a stream, and set duration to infinity as it should be
      // this is a bug in Opera and was reported on 5/25/2017

      // ...except a recording still being written grows the same way, and it
      // can be seeked back to its own beginning. A live stream can't, unless
      // it's a relay that offers one anyway (see BaseSound#declaredDuration).
      let recorded = this._recordedDuration() ?? this._lastRecordedDuration;
      return recorded ?? Infinity;
    }
    return audio.duration * 1000;
  }

  // An element not holding this sound's media measures nothing at all, and that
  // silence is not evidence of a live stream.
  _lastRecordedDuration = null;

  // Milliseconds recorded so far, or null when the seekable window doesn't
  // reach the beginning of the media.
  _recordedDuration() {
    let seekable = this.audioElement?.seekable;
    if (!seekable?.length) {
      return null;
    }

    let start = seekable.start(0);
    let end = seekable.end(seekable.length - 1);

    if (start > SEEKABLE_START_TOLERANCE || !Number.isFinite(end) || end <= 0) {
      return null;
    }

    this._lastRecordedDuration = end * 1000;
    return this._lastRecordedDuration;
  }

  _currentPosition() {
    return this.audioElement.currentTime * 1000;
  }

  _setPosition(position) {
    this.audioElement.currentTime = position / 1000;
    return this._currentPosition();
  }

  // `duration == Infinity` doesn't mean unseekable: a still-airing HLS archive has no #EXT-X-ENDLIST, so duration grows without bound yet the media seeks fine within its buffered window.
  get _seekableWindowMs() {
    let seekable = this.audioElement?.seekable;
    if (!seekable || seekable.length === 0) return 0;
    return (seekable.end(seekable.length - 1) - seekable.start(0)) * 1000;
  }

  get isSeekable() {
    return this._seekableWindowMs > 0 || super.isSeekable;
  }

  get isRewindable() {
    return this._seekableWindowMs > 0 || super.isRewindable;
  }

  get isFastForwardable() {
    return this._seekableWindowMs > 0 || super.isFastForwardable;
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

  // Some files that don't have an obvious mime-type/extension won't return Infinity for their duration
  // despite it being a stream. Instead the duration will continue to increase as the file plays. This method
  // samples the duration of the element and if it doesn't change durations for a while we know it's not a stream

  @cached
  get probablyAStream() {
    let differences = this._durationHistory.reduce(
      (val, cur, index, original) => [
        ...val,
        index === 0 ? 0 : original[index] - original[index - 1],
      ],
      []
    );
    return differences.filter((d) => d === 0).length !== differences.length;
  }

  @tracked _durationHistory = [];

  durationWorkaroundTask = task({ restartable: true }, async () => {
    let audio = this.audioElement;

    if (macroCondition(isTesting())) {
      this._durationHistory = [0, 0, 0];
    } else {
      while (this.isPlaying) {
        let duration = audio.duration * 1000;
        this._durationHistory = this._durationHistory.slice(-20); // only keep last 20 items
        this._durationHistory.push(duration);

        await timeout(250);
      }
    }
  });

  playTask = task({ restartable: true }, async ({ position }) => {
    this.isLoading = true;
    this.isBlocked = false;
    this.stopStreamAfterGraceTask.cancelAll();

    let audio = this.requestControl();

    if (this.isStream && this._streamConnectionIsWarm(audio)) {
      this._seekToLiveEdge(audio);
    } else {
      // pause clears the `src` attr for streams, so restore it here
      this.loadAudio(audio);
      this.restoreState();
    }

    if (typeof position !== 'undefined') {
      this._setPosition(position);
    }

    this.debug('telling audio to play');
    try {
      await audio.play().catch((e) => {
        throw e;
      });
    } catch (e) {
      this._onAudioError(e);
    } finally {
      this.isLoading = false;
    }
  });

  get shouldRetry() {
    return this.retryCount < 1;
  }

  retry() {
    this.debug(`retrying load with crossorigin not set`);
    this.audioElement.removeAttribute('crossorigin');

    this.retryCount = this.retryCount + 1;
    this.audioElement.src = this.url;
    this.audioElement.load();
  }

  play({ position } = {}) {
    return this.playTask.perform({ position });
  }

  pause() {
    this.debug('#pause');
    let audio = this.audioElement;
    audio.pause();

    if (!this.isStream) {
      return;
    }

    let grace = this.streamPauseGraceMs;

    if (!grace) {
      this.stop(); // we don't want the stream to continue loading while paused
    } else if (grace !== Infinity) {
      this.stopStreamAfterGraceTask.perform(grace).catch((e) => {
        if (!didCancel(e)) {
          console.error(e);
        }
      });
    }
  }

  // How long a paused stream holds its connection open. Holding costs bandwidth and a listener slot, so the default is stop on pause; Infinity holds indefinitely.
  get streamPauseGraceMs() {
    return this.options?.streamPauseGraceMs ?? 0;
  }

  stopStreamAfterGraceTask = task({ restartable: true }, async (graceMs) => {
    await timeout(graceMs);

    // The shared element may now belong to another sound; stopping it would kill that sound's playback instead of ours.
    if (this.sharedAudioAccess && !this.sharedAudioAccess.hasControl(this)) {
      this.debug('grace period expired but we no longer own the element');
      return;
    }

    this.debug('stream pause grace period expired, stopping');
    this.stop();
  });

  // Paused, but the grace timer hasn't yet stopped this stream's connection, so rejoining beats a fresh connect.
  _streamConnectionIsWarm(audio) {
    return !!audio?.src && this.urlsAreEqual(audio.src, this.url);
  }

  // A rejoined stream resumes at the stale paused instant; the end of the seekable range is "now".
  _seekToLiveEdge(audio) {
    try {
      if (audio.seekable?.length) {
        audio.currentTime = audio.seekable.end(audio.seekable.length - 1);
      }
    } catch (e) {
      this.debug('could not seek to the live edge, playing from where we are');
    }
  }

  stop() {
    this.debug('#stop');
    let audio = this.audioElement;
    this.stopStreamAfterGraceTask.cancelAll();
    audio.pause();

    // calling pause halts playback but does not stop downloading streaming
    // media. this is the method recommended by MDN: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media
    audio.removeAttribute('src');
    audio.load();

    // load() discards the pause event audio.pause() just queued.
    this._onAudioPaused();
  }

  loadAudio(audio) {
    this.defeatBrowserCaching();
    if (!this.urlsAreEqual(audio.src, this.url)) {
      audio.setAttribute('src', this.url);
      audio.load();
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

  urlsAreEqual(url1, url2) {
    // GOTCHA: audio.src is a fully qualified URL, and this.url may be a relative url
    // So when comparing, make sure we're dealing in absolutes

    let parser1 = document.createElement('a');
    let parser2 = document.createElement('a');
    parser1.href = url1;
    parser2.href = url2;

    return parser1.href === parser2.href;
  }

  teardown() {
    let audio = this.requestControl();
    this.durationWorkaroundTask.cancelAll();
    this.stopStreamAfterGraceTask.cancelAll();
    this.trigger('_will_destroy', { sound: this });
    this._unregisterEvents(audio);
    super.teardown();
  }
}
