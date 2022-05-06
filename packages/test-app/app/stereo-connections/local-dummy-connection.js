import BaseSound from 'ember-stereo/stereo-connections/base';
export default class LocalDummySound extends BaseSound {
  static key = 'LocalDummyConnection';
  static toString() {
    return 'Local Dummy Connection';
  }

  willDestroy() {}

  currentPosition() {}

  play() {}

  pause() {}

  _setVolume() {}

  _audioDuration() {}
}
