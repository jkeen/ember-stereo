import BaseSound from './base';
import HLS from 'hls';
import { tracked } from '@glimmer/tracking';
/**
* This class connects with HLS.js to create sounds.
*
* @class HLS
* @extends HLSSound
* @constructor
*/

export default class HLSSound extends BaseSound {
  static acceptMimeTypes = ['application/vnd.apple.mpegurl']
  static canUseConnection() {
    // We basically never want to use this on a mobile device
    return HLS.isSupported();
  }

  static toString() {
    return 'HLS';
  }

  @tracked live = false
  @tracked loaded = false
  @tracked mediaRecoveryAttempts = 0
  @tracked id3TagMetadata = null

  setup() {
    let video = document.createElement('video');
    this.video = video;
    let hls = new HLS({debug: true, startFragPrefetch: true});

    this.hls = hls;
    hls.attachMedia(video);
    this._setupHLSEvents(hls);
    this._setupPlayerEvents(video);
  }

  _setupHLSEvents(hls) {
    hls.on(HLS.Events.MEDIA_ATTACHING, () => {
      this.debug('media attaching');
    });
    // hls.on(HLS.Events.MEDIA_DETACHING, () => {
    //   this.debug('media detaching');
    // });
    // hls.on(HLS.Events.MEDIA_DETACHED, () => {
    //   this.debug('media detached');
    // });

    // hls.on(HLS.Events.BUFFER_RESET, () => {
    //   this.debug('buffer reset');
    //   this._checkIfAudioIsReady();
    // });

    // hls.on(HLS.Events.ERROR, (e, data) => this._onHLSError(e, data));

    hls.on(HLS.Events.MEDIA_ATTACHED, () => {
      this.debug('media attached');
      hls.loadSource(this.url);

      hls.on(HLS.Events.MANIFEST_PARSED, (e, data) => {
        this.debug(`manifest parsed and loaded, found ${data.levels.length} quality level(s)`);
        this.manifest = data;
      });

      hls.on(HLS.Events.LEVEL_LOADED, (e, data) => {
        this.debug(`level ${data.level} loaded`);
        this.live = data.details.live;
        this._checkIfAudioIsReady();
      });

      hls.on(HLS.Events.AUDIO_TRACK_LOADED, () => {
        this.debug('audio track loaded');
        this._checkIfAudioIsReady();
      });

      hls.on(HLS.Events.ERROR, (e, data) => this._onHLSError(e, data));

      hls.on(HLS.Events.FRAG_CHANGED, (e, f) => {
        let newId3TagMetadata = {
          title: f.frag.title
        }

        if (JSON.stringify(this.id3TagMetadata) !== JSON.stringify(newId3TagMetadata)) {
          this.debug('hls metadata changed');
          this.trigger('audio-metadata-changed', {
            sound: this,
            old: this.id3TagMetadata,
            new: newId3TagMetadata
          });
          this.id3TagMetadata = newId3TagMetadata;
        }
      });
    });
  }

  _setupPlayerEvents(video) {
    video.addEventListener('playing',         () => {
      if (this.loaded) {
        this.trigger('audio-played', {sound: this});
      }
      else {
        this._signalAudioIsReady();
      }
    });

    video.addEventListener('pause',           ()  => this.trigger('audio-paused', { sound: this }));
    video.addEventListener('durationchange',  ()  => this.trigger('audio-duration-changed', { sound: this }));
    video.addEventListener('seeked',          ()  => this.trigger('audio-position-changed', { sound: this }));
    video.addEventListener('timeupdate',      ()  => this.trigger('audio-position-changed', { sound: this }));
    video.addEventListener('progress',        ()  => this.trigger('audio-loading', { sound: this }));
    video.addEventListener('error',           (e) => this._onVideoError(e));
  }

  _checkIfAudioIsReady() {
    if (!this.loaded) {
      // The only reliable way to check if this thing is actually ready
      // is to play it. If we get a play signal we're golden, but if we
      // get an error, we're outta here

      this.debug('Testing if audio is ready');
      this.video.volume = 0;
      this.video.play();
    }
  }

  _signalAudioIsReady() {
    this.debug('Test succeeded, signaling audio-ready');
    this.loaded = true;
    this.video.pause();
    this.trigger('audio-loaded', {sound: this});
    this.trigger('audio-ready', {sound: this});
  }

  _onVideoError(e) {
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        this.debug("video element error: playback aborted");
        this._giveUpAndDie("unknown error");
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        this.debug("video element error: network error");
        this._giveUpAndDie("Network error caused download to fail");
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        this.debug("video element error: decoding error");
        this._tryToRecoverFromMediaError(e.target.error.MEDIA_ERR_DECODE);
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        this.debug("video element error: source format not supported");
        this._giveUpAndDie("audio source format is not supported");
        break;
      default:
        this._giveUpAndDie("unknown error");
        break;
    }
  }

  _onHLSError(error, data) {
    if (data.fatal) {
      this.debug(data);
      switch(data.type) {
        case HLS.ErrorTypes.NETWORK_ERROR:
          this._giveUpAndDie(`${data.details}`);
          break;
        case HLS.ErrorTypes.MEDIA_ERROR:
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

    switch(mediaRecoveryAttempts) {
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

  _giveUpAndDie(error) {
    this.hls.destroy();
    this.trigger('audio-load-error', {sound: this, error});
  }

  get audioElement() {
    return this.video;
  }


  /* Public interface to sound */

  _audioDuration() {
    if (this.live) {
      return Infinity
    }
    else {
      return this.video.duration * 1000;
    }
  }

  _currentPosition() {
    return this.video.currentTime * 1000;
  }

  _setPosition(position) {
    this.video.currentTime = (position / 1000);

    return position;
  }

  _setVolume(volume) {
    this.video.volume = (volume/100);
  }

  play() {
    if (!this.video.src) {
      this.trigger('audio-loading', this)
      this.setup(); // the stream was stopped before
    }
    this.video.play();

    this.debug('#play');
    if (this.loadStopped) {
      this.hls.startLoad();
      this.loadStopped = false;
    }
  }

  pause() {
    this.debug('#pause');
    this.video.pause();
    this.hls.stopLoad();
    this.loadStopped = true;
  }

  stop() {
    this.debug('#stop');
    this.pause();
    this.video.removeAttribute('src')
  }

  teardown() {
    this.hls.destroy();
  }
}