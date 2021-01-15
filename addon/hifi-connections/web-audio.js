import { A } from '@ember/array';
import { run } from '@ember/runloop';
import Mixin from '@ember/object/mixin';
import BaseSound from './base';
import NativeAudio from './native-audio';
import Ember from 'ember';

// These are the events we're watching for
const AUDIO_EVENTS = ['loadstart', 'durationchange', 'loadedmetadata', 'loadeddata', 'progress', 'canplay', 'canplaythrough', 'error', 'playing', 'pause', 'ended', 'emptied', 'timeupdate'];


/**
* This class connects with the native audio element to create sounds.
*
* @class WebAudio
* @extends BaseSound
* @constructor
*/
export default class WebAudioSound extends NativeAudio {
  static canUseConnection() {
    try {
      return true
    }
    catch(e) {
      return false;
    }
  }

  static canPlayMimeType() {
    return true
  }
  
  static toString() {
    return 'Web Audio'
  }

  setup() {
    let audio = this.requestControl();

    audio.src = this.get('url');
    this._registerEvents(audio);

    if (Ember.testing) {
      console.warn('setting audio element volume to zero for testing, to get around autoplay restrictions'); // eslint-disable-line
      audio.muted = true;
    }
    audio.load();

    this.context = new AudioContext();
    this.track = this.context.createMediaElementSource(audio);
    const gainNode = audioContext.createGain();

    const pannerOptions = { pan: 0 };
    const panner = new StereoPannerNode(this.context, pannerOptions);
    this.track.connect(gainNode).connect(this.context.destination);

  }





}