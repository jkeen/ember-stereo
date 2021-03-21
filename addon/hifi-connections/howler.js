import { makeArray } from '@ember/array';
import BaseSound from 'ember-hifi/hifi-connections/base';
import { Howl } from 'howler';
/**
* This class connects with Howler to create sounds.
*
* @class Howler
* @constructor
* @extensionfor Base

*/
export default class Howler extends BaseSound {
  static rejectMimeTypes = ['application/vnd.apple.mpegurl']
  static key = 'Howler';

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
        sound.trigger('audio-loaded', {sound: this});
        sound.trigger('audio-ready', {sound: this});
      },
      onpause: function() {
        if (!sound.isPlaying) {
          sound.trigger('audio-paused', {sound: this});
        }
      },
      onplay: function() {
        sound.trigger('audio-played', {sound: this});
      },
      onend: function() {
        sound.trigger('audio-ended', {sound: this});
      },
      onstop: function() {
        sound.trigger('audio-paused', {sound: this});
      },
      onloaderror: function(id, error) {
        sound.trigger('audio-load-error', {sound: this, error});
      },
      onseek: function() {
        sound.trigger('audio-position-changed', {sound: this});
      }
    }, this.options);

    this.howl = new Howl(options);
  }

  teardown() {
    if (this.howl) {
      this.howl.unload();
    }
  }

  get audioElement() {
    let sounds = this.howl?._sounds

    if (sounds && sounds.length > 0) {
      let element = (sounds[0])._node;
      if (element) {
        element.setAttribute('crossOrigin', 'anonymous');
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
    this.howl?.volume(volume/100);
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