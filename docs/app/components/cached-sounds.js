import Component from '@glimmer/component';
import { service } from '@ember/service';
export default class CachedSound extends Component {
  @service stereo;

  get loadedItems() {
    return this.stereo.sounds;
  }

  get loadedSoundCountSentence() {
    let count = this.stereo.sounds.length;
    if (count === 1) {
      return '1 Loaded Sound';
    } else if (count > 1) {
      return `${count} Loaded Sounds`;
    } else {
      return `Loaded Sounds`;
    }
  }
}
