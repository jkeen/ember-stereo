import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
export default class HifiTogglePlay extends Helper {
  @service
  hifi;

  compute([compare] /* , metadata = {} */) {
    return () => {
      if (!compare) {
        this.hifi.togglePause();
      }
      else {
        let sound = this.hifi.findLoaded(compare)
        if (sound) {
          return sound.togglePause();
        }
        else {
          return this.hifi.play(compare);
        }
      }
    }
  }
}

