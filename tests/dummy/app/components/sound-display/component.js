import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';

export default class SoundDisplay extends Component {
  @service stereo;
  @tracked selectedConnections = this.stereo.connectionLoader.connections
  @tracked soundProxy;

  constructor() {
    super(...arguments);
    this.soundProxy = this.stereo.soundProxy(this.args.url)
  }

  get loadedSound() {
    if (this.soundProxy?.isResolved) {
      return this.soundProxy.value;
    }
    return false;
  }

  get url() {
    if (this.loadedSound) {
      return this.loadedSound.url
    }
    else {
      return this.args.url
    }
  }

  get allConnections() {
    return this.stereo.connectionLoader.connections
  }

  get isCurrentSound() {
    return this.stereo.currentSound && this.loadedSound && hasEqualUrls(this.stereo.currentSound.url, this.loadedSound.url)
  }

  @action inspectSound(sound) {
    window.$E = sound;
    console.log(`$E = `, sound);
  }

  @action
  async removeSound() {
    if (this.loadedSound) {
      this.loadedSound.stop();
    }
    this.stereo.removeSound(this.url)

    if (this.args.onRemoval) {
      this.args.onRemoval();
    }
  }
}
