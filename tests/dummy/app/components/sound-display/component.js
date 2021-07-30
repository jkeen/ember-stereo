import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { trackedReset } from 'tracked-toolbox';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';


export default class SoundDisplay extends Component {
  @service stereo;
  @tracked selectedConnections = this.stereo.connections
  @tracked resolvedUrl;
  @trackedReset('args.url') willTryStrategies = [];

  get url() {
    if (this.loadedSound) {
      return this.loadedSound.url
    }
    else {
      return this.args.url
    }
  }

  get loadedSound() {
    return this.stereo.loadedSounds.find(sound => hasEqualUrls(sound.url, this.resolvedUrl))
  }

  get allConnections() {
    return this.stereo.connections
  }

  get isCurrentSound() {
    return this.stereo.currentSound && this.loadedSound && hasEqualUrls(this.stereo.currentSound.url, this.loadedSound.url)
  }

  @action
  async removeSound() {
    this.loadedSound?.stop();
    this.stereo.removeSound(this.url)

    if (this.args.onRemoval) {
      this.args.onRemoval();
    }
  }
}
