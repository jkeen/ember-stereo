import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class ServiceDisplay extends Component {
  @service hifi;

  @tracked showDebugInfo;

  get cachedCount() {
    return this.hifi.soundCache.cachedCount;
  }

  get connections() {
    return Object.values(this.hifi._connections);
  }

  get currentSound() {
    return this.hifi.currentSound;
  }
}
