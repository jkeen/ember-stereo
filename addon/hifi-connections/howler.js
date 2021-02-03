import { makeArray } from '@ember/array';
import Mixin from '@ember/object/mixin';
import BaseSound from './base';
import { Howl } from 'howler';
import { get } from '@ember/object';
import classic from 'ember-classic-decorator';
/**
* This class connects with Howler to create sounds.
*
* @class Howler
* @constructor
* @extensionfor Base

*/
@classic
export default class HowlerSound extends BaseSound {
  static rejectMimeTypes = ['application/vnd.apple.mpegurl']

  static toString() {
    return 'Howler';
  }

  setup() {
    let urls = makeArray(this.url);
    let sound = this;
    let options = Object.assign({
      src:      urls,
      autoplay: false,
      preload:  true,
      html5:    true,
      volume:   1,
      onload: function() {
        sound.url = this._src;
        sound.howl = this;
        sound.trigger('audio-loaded', sound);
        sound.trigger('audio-ready', sound);
      },
      onpause: function() {
        if (!sound.isPlaying) {
          sound.trigger('audio-paused', sound);
        }
      },
      onplay: function() {
        sound.trigger('audio-played', sound);
      },
      onend: function() {
        sound.trigger('audio-ended', sound);
      },
      onstop: function() {
        sound.trigger('audio-paused', sound);
      },
      onloaderror: function(id, error) {
        sound.trigger('audio-load-error', error);
      },
      onseek: function() {
        sound.trigger('audio-position-changed', sound);
      }
    }, this.options);

    this.howl = new Howl(options);
  }

  teardown() {
    if (this.howl) {
      this.howl.unload();
    }
  }

  get audioContext() {
    return Howler.ctx
  }
  

  get audioElement() {
    let sounds = get(this, 'howl._sounds');

    if (sounds && sounds.length > 0) {
      let element = get(sounds[0], '_node');
      if (element) {
        element.setAttribute('crossOrigin', 'anonymous');
        return element;
      }
    }
  }

  _audioDuration() {
    return this.howl.duration() * 1000;
  }

  _currentPosition() {
    return this.howl.seek() * 1000;
  }

  _setPosition(position) {
    this.howl.seek(position / 1000);
    return this._currentPosition();
  }

  _setVolume(volume) {
    this.howl.volume(volume/100);
  }

  play({position} = {}) {
    this.debug('#play');
    if (typeof position !== 'undefined') {
      this._setPosition(position);
    }
    this.howl.play();
  }

  pause() {
    this.debug('#pause');
    this.howl.pause();
  }

  stop() {
    this.debug('#stop');
    this.howl.stop();
  }
}