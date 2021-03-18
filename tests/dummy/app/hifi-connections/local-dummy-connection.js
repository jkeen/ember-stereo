import BaseSound from 'ember-hifi/hifi-connections/base';
export default class LocalDummySound extends BaseSound {
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


