import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class SoundDisplay extends Component {
  @service stereo;

  get isCurrentSound() {
    return (
      this.stereo.currentSound &&
      this.args.sound &&
      this.stereo.currentSound.url === this.args.sound.url
    );
  }

  @action
  async removeSound() {
    this.args.sound.stop();
    this.stereo.soundCache.remove(this.args.sound);

    if (this.args.onRemoval) {
      this.args.onRemoval();
    }
  }
}
