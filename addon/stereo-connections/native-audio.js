import { A } from '@ember/array';
import { run } from '@ember/runloop';
import BaseSound from 'ember-stereo/stereo-connections/base';
import Ember from 'ember';
import { task } from 'ember-concurrency';
// These are the events we're watching for
const AUDIO_EVENTS = ['loadstart', 'durationchange', 'loadedmetadata', 'loadeddata', 'progress', 'canplay', 'canplaythrough', 'error', 'playing', 'pause', 'ended', 'emptied', 'timeupdate'];

// Ready state values
// const HAVE_NOTHING = 0;
// const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
// const HAVE_FUTURE_DATA = 3;
// const HAVE_ENOUGH_DATA = 4;

/**
* This class connects with the native audio element to create sounds.
*
* @class NativeAudio
* @extends BaseSound
* @constructor
*/
export default class NativeAudio extends BaseSound {
  static canPlayMimeType(mimeType) {
    let audio = new Audio();
    // it returns "probably" and "maybe". Both are worth trying. Empty is bad.
    return (audio.canPlayType(mimeType) !== "");
  }

  static key = 'NativeAudio';
  static toString() {
    return 'Native Audio';
  }

  setup() {
    let audio = this.requestControl();

    audio.src = this.url;
    audio.crossOrigin="anonymous";
    this._registerEvents(audio);

    if (Ember.testing) {
      console.warn('setting audio element volume to zero for testing, to get around autoplay restrictions'); // eslint-disable-line
      audio.muted = true;
    }

    audio.load();
  }

  _registerEvents(audio) {
    AUDIO_EVENTS.forEach(eventName => {
      audio.addEventListener(eventName, e => run(() => this._handleAudioEvent(eventName, e)));
    });
  }

  _unregisterEvents(audio) {
    AUDIO_EVENTS.forEach(eventName => audio.removeEventListener(eventName));
  }

  _handleAudioEvent(eventName, e) {
    if (!this.urlsAreEqual(e.target.src, this.url) && e.target.src !== '') {
      // This event is not for us if our srcs aren't equal

      // but if the target src is empty it means we've been stopped and in
      // that case should allow the event through.
      return;
    }

    this.debug(`Handling '${eventName}' event from audio element`);

    switch(eventName) {
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
      case 'playing':
        this._onAudioPlayed();
        break;
      // the emptied event is triggered by our more reliable stream pause method
      case 'emptied':
        this._onAudioEmptied();
        break;
      case 'pause':
        this._onAudioPaused();
        break;
      case 'durationchange':
        this._onAudioDurationChanged();
        break;
      case 'ended':
        this._onAudioEnded();
        break;
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

    let sharedAudioAccess  = this.sharedAudioAccess;

    if (sharedAudioAccess && sharedAudioAccess.hasControl(this)) {
      return sharedAudioAccess.audioElement;
    }
    else {
      let audioElement = (this._audioElement || document.createElement('audio'));
      this._audioElement = audioElement;

      return audioElement;
    }
  }

  releaseControl() {
    if (!this.sharedAudioAccess) {
      return;
    }

    if (this.isPlaying) {
      // send a pause event so anyone subscribed to stereo's relayed events gets the message
      this._onAudioPaused(this);
    }

    this.sharedAudioAccess.releaseControl(this);
    // save current state of audio element to the internal element that won't be played
    this._saveState(this.sharedAudioAccess.audioElement);
  }

  _saveState(audio) {
    this.debug('Saving audio state');
    let shadowAudio = document.createElement('audio');
    this._audioElement = shadowAudio;
    shadowAudio.preload = 'none';
    shadowAudio.src = audio.src;

    try {
      shadowAudio.currentTime = audio.currentTime;
    }
    catch(e) {
      this.debug('Errored while trying to save audio current time');
      this.debug(e);
    }

    shadowAudio.volume = audio.volume;
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
    let sharedElement     = this.audioElement;
    let internalElement   = this._audioElement;

    if (this.sharedAudioAccess && internalElement) {
      this.debug('Restoring audio state…');
      try {
        // restore the state of the shared element from the dummy element
        if (internalElement.currentTime) {
          sharedElement.currentTime = internalElement.currentTime;
        }
        if (internalElement.volume) {
          sharedElement.volume      = internalElement.volume;
        }
        this.debug('Restored audio state');
      }
      catch(e) {
        this.debug('Errored while trying to restore audio state');
        this.debug(e);
      }
    }
  }

  _onAudioProgress() {
    this.trigger('audio-loading', { sound: this, ...this._calculatePercentLoaded() });
  }

  _onPositionChange() {
    this.trigger('audio-position-changed', { sound: this });
  }

  _onAudioDurationChanged() {
    this.trigger('audio-duration-changed', { sound: this });
  }

  _onAudioPlayed() {
    if (!this.isPlaying) {
      this.trigger('audio-played', { sound: this });
    }
  }

  _onAudioEnded() {
    this.trigger('audio-ended', { sound: this });
  }

  _onAudioError(error) {
    let message = "";
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
        message = 'Audio source format is not supported.';
        break;
      default:
        message = error.message;
        break;
    }

    this.debug(`audio element threw error ${message}`);
    this.trigger('audio-load-error', {sound: this, error: message});
  }

  _onAudioEmptied() {
    this.trigger('audio-paused', { sound: this });
  }

  _onAudioPaused() {
    this.trigger('audio-paused', { sound: this });
  }

  _onAudioReady() {
    this.trigger('audio-ready', { sound: this });
    this.trigger('audio-loaded', { sound: this });
  }

  _calculatePercentLoaded() {
    let audio = this.audioElement;

    if (audio && audio.buffered && audio.buffered.length) {
      let ranges = audio.buffered;
      let totals = [];
      for( var index = 0; index < ranges.length; index++ ) {
        totals.push(ranges.end(index) - ranges.start(index));
      }

      let total = A(totals).reduce((a, b) => (a + b), 0);

      this.debug(`ms loaded: ${total * 1000}`);
      this.debug(`duration: ${this._audioDuration()}`);
      this.debug(`percent loaded = ${(total / audio.duration) * 100}`);

      return {percentLoaded: (total / audio.duration)};
    }
    else {
      return 0;
    }
  }

  /* Public interface */

  _audioDuration() {
    let audio = this.audioElement;

    if (audio.duration > 172800000) {
      // if audio is longer than 3 days in milliseconds,
      // assume it's a stream, and set duration to infinity as it should be
      // this is a bug in Opera and was reported on 5/25/2017

      return Infinity;
    }

    return audio.duration * 1000;
  }

  _currentPosition() {
    let audio = this.audioElement;
    return audio.currentTime * 1000;
  }

  _setPosition(position) {
    let audio = this.audioElement;
    audio.currentTime = (position / 1000);
    return this._currentPosition();
  }

  _setVolume(volume) {
    this.debug(`_setVolume: ${volume}`);
    let audio = this.audioElement;
    audio.volume = (volume/100);
  }

  @task({maxConcurrency: 1, drop: true})
  *playTask({position, retryCount = 0 }) {
    this.isLoading = true
    let audio = this.requestControl();

    // since we clear the `src` attr on pause, restore it here
    this.loadAudio(audio);
    this.restoreState();

    if (typeof position !== 'undefined') {
      this._setPosition(position);
    }

    this.debug('telling audio to play');
    try {
      yield audio.play().catch(e => {
        if (retryCount < 2) {
          this.playTask.perform({ position, retryCount: retryCount + 1 });
        } else {
          this._onAudioError(e)
        }
      });
    } catch(e) {
      if (retryCount < 2) {
        this.playTask.perform({ position, retryCount: retryCount + 1 });
      } else {
        this._onAudioError(e)
      }
    } finally {
      this.isLoading = false
    }
  }

  play({position} = {}) {
    return this.playTask.perform({position});
  }

  pause() {
    this.debug('#pause');
    let audio = this.audioElement;

    if (this.isStream) {
      this.stop(); // we don't want to the stream to continue loading while paused
    }
    else {
      audio.pause();
    }
  }

  stop() {
    this.debug('#stop');
    let audio = this.audioElement;
    audio.pause();

    // calling pause halts playback but does not stop downloading streaming
    // media. this is the method recommended by MDN: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media
    // NOTE: this fires an `'emptied'` event, which we treat the same way as `'pause'`
    audio.removeAttribute('src');
    audio.load();
  }

  loadAudio(audio) {
    if (!this.urlsAreEqual(audio.src, this.url)) {
      audio.setAttribute('src', this.url);
    }
  }

  urlsAreEqual(url1, url2) {
    // GOTCHA: audio.src is a fully qualified URL, and this.url may be a relative url
    // So when comparing, make sure we're dealing in absolutes

    let parser1 = document.createElement('a');
    let parser2 = document.createElement('a');
    parser1.href = url1;
    parser2.href = url2;

    return (parser1.href === parser2.href);
  }

  teardown() {
    let audio = this.requestControl();
    this.trigger('_will_destroy', { sound: this});
    this._unregisterEvents(audio);
  }
}
