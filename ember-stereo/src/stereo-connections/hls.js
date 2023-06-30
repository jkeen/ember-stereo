import BaseSound from './base';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
/**
 * This is the connection class that uses HLS.js to play sounds.
 *
 * @class HLS
 * @extends HLSSound
 * @constructor
 */

export function getMediaSource() {
  if (typeof self === 'undefined') return undefined;
  return self.MediaSource || self.WebKitMediaSource;
}

function getSourceBuffer() {
  return self.SourceBuffer || self.WebKitSourceBuffer;
}

export default class HLSSound extends BaseSound {
  static acceptMimeTypes = ['application/vnd.apple.mpegurl'];
  static canUseConnection() {
    // This is copied from the HLS source. We don't want to load all of HLS.js just to check if it can be used
    const mediaSource = getMediaSource();
    if (!mediaSource) {
      return false;
    }
    const sourceBuffer = getSourceBuffer();
    const isTypeSupported =
      mediaSource &&
      typeof mediaSource.isTypeSupported === 'function' &&
      mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

    // if SourceBuffer is exposed ensure its API is valid
    // Older browsers do not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
    const sourceBufferValidAPI =
      !sourceBuffer ||
      (sourceBuffer.prototype &&
        typeof sourceBuffer.prototype.appendBuffer === 'function' &&
        typeof sourceBuffer.prototype.remove === 'function');
    return !!isTypeSupported && !!sourceBufferValidAPI;
  }

  static key = 'HLS';
  static toString() {
    return 'HLS';
  }

  @tracked live = false;
  @tracked loaded = false;
  @tracked mediaRecoveryAttempts = 0;
  @tracked _currentTime = null;

  @waitFor
  async setup() {
    await this.loadHLS().then(({ HLS }) => {
      let video = document.createElement('video');
      video.setAttribute('crossorigin', 'anonymous');
      this.video = video;

      let options = { debug: false, startFragPrefetch: true };

      if (this.options?.xhr) {
        options.xhrSetup = (xhr, url) => {
          if (this.url !== url && this.options.xhr?.manifestOnly) {
            // If this isn't the manifest request and we've requested manifestOnly, don't set these options
            return;
          }

          xhr.withCredentials = this.options.xhr?.withCredentials || false;

          if (this.options?.xhr?.headers) {
            Object.keys(this.options.xhr.headers).forEach((key) => {
              xhr.setRequestHeader(key, this.options?.xhr?.headers[key]);
            });
          }

          xhr.method = this.options.xhr?.method || 'GET';
        };
        delete this.options.xhr;
      }

      let hls = new HLS({ ...options, ...(this.options || {}) });

      this.hls = hls;
      this._setupHLSEvents(hls, HLS);
      this._setupPlayerEvents(video);
      hls.attachMedia(video);
    });
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
      this.debug('media attached');
      instance.loadSource(this.url);

      instance.on(HLS.Events.MANIFEST_PARSED, (e, data) => {
        this.debug(
          `manifest parsed and loaded, found ${data.levels.length} quality level(s)`
        );
        this.manifest = data;
      });

      instance.on(HLS.Events.LEVEL_LOADED, (e, data) => {
        this.debug(`level ${data.level} loaded`);
        this.live = data.details.live;
        this._signalAudioIsReady();
      });

      instance.on(HLS.Events.AUDIO_TRACK_LOADED, () => {
        this.debug('audio track loaded');
        this._signalAudioIsReady();
      });

      instance.on(HLS.Events.ERROR, (e, data) =>
        this._onHLSError(e, data, HLS)
      );

      instance.on(HLS.Events.FRAG_CHANGED, (e, f) => {
        this._updateAudioBuffer(f.frag);
        this._updateId3Info(f.frag);
      });
    });
  }

  _updateId3Info(fragment) {
    let newId3TagMetadata = {
      title: fragment.title,
      programDateTime: fragment.programDateTime,
      rawProgramDateTime: fragment.rawProgramDateTime,
    };

    if (
      JSON.stringify(this.id3TagMetadata) !== JSON.stringify(newId3TagMetadata)
    ) {
      this.debug('hls metadata changed');
      this.trigger('audio-metadata-changed', {
        sound: this,
        old: this.id3TagMetadata,
        new: newId3TagMetadata,
      });

      this.id3TagMetadata = newId3TagMetadata;
    }
  }

  _setupPlayerEvents(video) {
    video.addEventListener('playing', () => {
      if (this.loaded) {
        this.trigger('audio-played', { sound: this });
      } else {
        this._signalAudioIsReady();
      }
    });

    video.addEventListener('pause', () =>
      this.trigger('audio-paused', { sound: this })
    );
    video.addEventListener('ended', () =>
      this.trigger('audio-ended', { sound: this })
    );
    video.addEventListener('durationchange', () =>
      this.trigger('audio-duration-changed', { sound: this })
    );
    video.addEventListener('seeked', () =>
      this.trigger('audio-position-changed', {
        sound: this,
        currentTime: this.currentTime,
      })
    );
    video.addEventListener('timeupdate', () =>
      this.trigger('audio-position-changed', {
        sound: this,
        currentTime: this.currentTime,
      })
    );
    video.addEventListener('progress', () =>
      this.trigger('audio-loading', { sound: this })
    );
    video.addEventListener('error', (e) => this._onVideoError(e));
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
    this.trigger('audio-loaded', { sound: this });
    this.trigger('audio-ready', { sound: this });
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
      this.debug(data);
      switch (data.type) {
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

    switch (mediaRecoveryAttempts) {
      case 0:
        this.debug(`First attempt at media error recovery for error: ${error}`);
        hls.recoverMediaError();
        break;
      case 1:
        this.debug(
          `Second attempt at media error recovery: switching codecs for error: ${error}`
        );
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
    this.trigger('audio-load-error', { sound: this, error });
  }

  get audioElement() {
    return this.video;
  }

  /* Public interface to sound */

  get currentTime() {
    return this.hls.playingDate;
  }

  _audioDuration() {
    if (this.live) {
      return Infinity;
    } else {
      return this.video.duration * 1000;
    }
  }

  _currentPosition() {
    return this.video.currentTime * 1000;
  }

  _setPosition(position) {
    this.video.currentTime = position / 1000;
    if (!this.isPlaying) {
      this.hls.startLoad();
    }

    return position;
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
          event: error,
        });
        this.pause();
      }
    }
  }

  async play() {
    this.isLoading = true;

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
    this.hls.stopLoad();
    this.loadStopped = true;
  }

  stop() {
    this.debug('#stop');
    this.pause();
    this.video.removeAttribute('src');
  }

  teardown() {
    this.hls.destroy();
    super.teardown();
  }

  @waitFor
  async loadHLS() {
    return import('hls.js')
      .then((module) => module.default)
      .then((HLS) => {
        return Promise.resolve({
          HLS: HLS,
        });
      });
  }
}
