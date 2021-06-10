import BaseSound from 'ember-stereo/stereo-connections/base';
export default class LocalDummySound extends BaseSound {
  static toString() {
    return 'Local Dummy Connection';
  }

  static key = 'LocalDummyConnection'

  willDestroy() {}

  currentPosition() {}

  play() {}

  pause() {}

  _setVolume() {}

  _audioDuration() {}
}


