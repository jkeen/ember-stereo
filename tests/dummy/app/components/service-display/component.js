import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class ServiceDisplay extends Component {
  @service stereo;

  @tracked showDebugInfo;

  get cachedCount() {
    return this.stereo.soundCache.cachedCount;
  }

  get connections() {
    return Object.values(this.stereo._connections);
  }

  get currentSound() {
    return this.stereo.currentSound;
  }
}
