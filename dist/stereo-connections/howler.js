import { b as _defineProperty, _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { makeArray } from '@ember/array';
import Sound from './base.js';
import { waitFor } from '@ember/test-waiters';

var _class, _class2;

/**
* This is the connection class that uses Howler to play sounds.
*
* @class Howler
* @constructor
* @extensionfor Base

*/
let Howler = (_class = (_class2 = class Howler extends Sound {
  static toString() {
    return 'Howler';
  }
  setup() {
    let urls = makeArray(this.url);
    let sound = this;
    let options = Object.assign({
      src: urls,
      autoplay: false,
      preload: true,
      html5: true,
      volume: 1,
      onload: function () {
        sound.url = this._src;
        sound.howl = this;
        sound.trigger('audio-loaded', {
          sound
        });
        sound.trigger('audio-ready', {
          sound
        });
      },
      onpause: function () {
        // if (!sound.isPlaying) {
        sound.trigger('audio-paused', {
          sound
        });
        // }
      },

      onplay: function () {
        sound.trigger('audio-played', {
          sound
        });
      },
      onend: function () {
        sound.trigger('audio-ended', {
          sound
        });
      },
      onstop: function () {
        sound.trigger('audio-paused', {
          sound
        });
      },
      onloaderror: function (id, code) {
        var MEDIA_NOT_ALLOWED = 0;
        var MEDIA_ERR_ABORTED = 1;
        var MEDIA_ERR_NETWORK = 2;
        var MEDIA_ERR_DECODE = 3;
        var MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
        if (code === MEDIA_NOT_ALLOWED) {
          sound.trigger('audio-blocked', {
            sound,
            error: 'Audio autoplay attempt was blocked by browser user settings'
          });
        } else {
          let message = '';
          switch (code) {
            case MEDIA_ERR_ABORTED:
              message = 'You aborted the audio playback.';
              break;
            case MEDIA_ERR_NETWORK:
              message = 'A network error caused the audio download to fail.';
              break;
            case MEDIA_ERR_DECODE:
              message = 'Decoder error.';
              break;
            case MEDIA_ERR_SRC_NOT_SUPPORTED:
              message = 'Audio source format is not supported.';
              break;
            default:
              message = 'Audio load error';
              break;
          }
          sound.trigger('audio-load-error', {
            sound,
            error: message
          });
        }
      },
      onseek: function () {
        sound.trigger('audio-position-changed', {
          sound
        });
      }
    });
    if (this.options.xhr) {
      options.xhr = {
        withCredentials: this.options.xhr?.withCredentials || false,
        headers: this.options.xhr?.headers || {},
        method: this.options.xhr?.method || 'GET'
      };
    }
    this.loadHowler().then(({
      Howl
    }) => {
      this.howl = new Howl(options);
    });
  }
  teardown() {
    if (this.howl) {
      this.howl.unload();
    }
    super.teardown();
  }
  get audioElement() {
    let sounds = this.howl?._sounds;
    if (sounds && sounds.length > 0) {
      let element = sounds[0]._node;
      if (element) {
        element.setAttribute('crossorigin', 'anonymous');
        element.setAttribute('preload', 'metadata');
        return element;
      }
    }
    return undefined;
  }
  _audioDuration() {
    return this.howl?.duration() * 1000;
  }
  _currentPosition() {
    return this.howl?.seek() * 1000;
  }
  _setPosition(position) {
    this.howl?.seek(position / 1000);
    return this._currentPosition();
  }
  _setVolume(volume) {
    this.howl?.volume(volume / 100);
  }
  play({
    position
  } = {}) {
    if (!this.howl.playing()) {
      this.isLoading = true;
      this.debug('#play');
      if (typeof position !== 'undefined') {
        this.position = position;
      }
      this.howl.play();
    }
  }
  pause() {
    this.debug('#pause');
    this.howl.pause();
  }
  stop() {
    this.debug('#stop');
    this.howl.stop();
  }
  loadHowler() {
    return import('howler').then(module => module.default).then(mod => {
      return Promise.resolve({
        Howl: mod.Howl
      });
    });
  }
}, _defineProperty(_class2, "key", 'Howler'), _class2), (_applyDecoratedDescriptor(_class.prototype, "loadHowler", [waitFor], Object.getOwnPropertyDescriptor(_class.prototype, "loadHowler"), _class.prototype)), _class);

export { Howler as default };
//# sourceMappingURL=howler.js.map
