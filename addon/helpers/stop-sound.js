import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default class stopSound extends Helper {
  @service stereo;

  compute([identifier] /*, metadata = {} */) {
    return () => {
      if (identifier) {
        let sound = this.stereo.findLoaded(identifier)
        if (sound) {
          return sound.stop()
        }
        else {
          return false;
        }
      }
      else if (this.stereo.currentSound) {
        this.stereo.stop()
      }
    }
  }
}

