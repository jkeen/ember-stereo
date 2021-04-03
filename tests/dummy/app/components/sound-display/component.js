import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class SoundDisplay extends Component {
  @service hifi;

  get isCurrentSound() {
    return (
      this.hifi.currentSound &&
      this.args.sound &&
      this.hifi.currentSound.url === this.args.sound.url
    );
  }

  @action
  async removeSound() {
    this.hifi.soundCache.remove(this.args.sound);
    this.args.sound.stop();
    this.args?.onRemoval();
  }
}
