import BaseSound from 'ember-hifi/hifi-connections/base';
import classic from 'ember-classic-decorator';
@classic
export default class LocalDummySound extends BaseSound {
  static toString() {
    return 'Local Dummy Connection';
  }

  init() {}

  willDestroy() {}

  currentPosition() {}

  play() {}

  pause() {}

  _setVolume() {}
}
