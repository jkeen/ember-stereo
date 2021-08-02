import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
export default class CachedSound extends Component {
  @service stereo;

  get loadedItems() {
    return this.stereo.soundCache.cachedList.map((url) =>
      this.stereo.soundCache.find(url)
    );
  }

  get loadedSoundCountSentence() {
    let count = this.stereo.soundCache.cachedCount;
    if (count === 1) {
      return "1 Loaded Sound";
    } else if (count > 1) {
      return `${count} Loaded Sounds`;
    } else {
      return `Loaded Sounds`;
    }
  }
}
