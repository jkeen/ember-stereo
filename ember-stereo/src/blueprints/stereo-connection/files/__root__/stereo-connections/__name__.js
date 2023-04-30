<%= importStatement %>
import { assert } from '@ember/debug';

let Sound = class Sounds extends <%= baseClass %> {

  // Enable one of these
  // static acceptMimeTypes =['application/vnd.apple.mpegurl']
  // static rejectMimeTypes =['application/vnd.apple.mpegurl']

  // static canPlayMimeType(/* extension */) {
  //   // check if connection can play file with this mime type
  //   return true;
  // }

  static canUseConnection() {
    // check to see if this connection will work on this browser/platform
    return true;
  }

  setup() {
    let url = this.url
    let sound = this;

    // Using the URL, try loading up your sound.

    // Wire up your audio library so it fires these events on this sound class

    // sound.trigger('audio-ready')                     -> when sound is ready to play
    // sound.trigger('audio-load-error', errorMessage)  -> when sound encounters an loading error
    // sound.trigger('audio-loading', info)             -> when sound is loading, optionally include {percentLoaded}

    // sound.trigger('audio-played')                    -> when sound is played
    // sound.trigger('audio-paused')                    -> when sound is paused
    // sound.trigger('audio-ended')                     -> when sound is finished playing
    // sound.trigger('audio-duration-changed')          -> when the audio duration changes
    // sound.trigger('audio-position-changed')          -> when the audio position changes
  }


  get audioElement() {
    // return your raw audio element. This is used in diagnostics
  }

  // If your sound offers real time playback, return the current timestamp here as a Date object
  // get currentTime() {

  // }

  teardown() {

  }

  // implement these methods to control your sound

  _setVolume(volume) { // volume provided as 0-100
    assert('[stereo-connection: <%= name %>] #_setVolume interface not implemented', false);
  }

  _audioDuration() {
    // return Infinity if source is an audio stream
    assert("[stereo-connection: <%= name %>] #_audioDuration interface not implemented", false);
  }

  _currentPosition() {
    // return current position in milliseconds
    assert("[stereo-connection: <%= name %>] #currentPosition interface not implemented", false);
  }

  _setPosition(position) {
    // given position in millseconds, adjust playing sound to position
    assert("[stereo-connection: <%= name %>] #setPosition interface not implemented", false);
  }

  play() {
    assert("[stereo-connection: <%= name %>] #play interface not implemented", false);
  }

  pause() {
    assert("[stereo-connection: <%= name %>] #pause interface not implemented", false);
  }

  stop() {
    // Stop playback and make sure no more audio is downloading
    assert("[stereo-connection: <%= name %>] #stop interface not implemented", false);
  }
}

export default Sound;
