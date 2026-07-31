import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';

export default class SoundDisplay extends Component {
  @service stereo;
  @tracked selectedConnections = this.stereo.connectionLoader.connections;

  get loadedSound() {
    return this.stereo.findSound(this.args.url);
  }

  get url() {
    if (this.loadedSound) {
      return this.loadedSound.url;
    } else {
      return this.args.url;
    }
  }

  get usingSingleAudioElement() {
    return this.stereo.useSharedAudioAccess;
  }

  get hasControlOfAudioElement() {
    return (
      this.usingSingleAudioElement &&
      this.loadedSound &&
      this.loadedSound.sharedAudioAccess.hasControl(this.loadedSound)
    );
  }

  get allConnections() {
    return this.stereo.connectionLoader.connections;
  }

  get isCurrentSound() {
    return (
      this.stereo.currentSound &&
      this.loadedSound &&
      hasEqualUrls(this.stereo.currentSound.url, this.loadedSound.url)
    );
  }

  get connectionChoices() {
    let strategies = this.loadedSound?.strategies || [];
    return strategies.filter((strategy) => strategy.canPlay);
  }

  get canSwitchConnections() {
    return this.connectionChoices.length > 1;
  }

  @action
  async switchConnection(event) {
    let sound = this.loadedSound;
    let key = event.target.value;
    if (!sound || key === sound.connectionKey) {
      return;
    }

    // Shorter-than-default timeout: someone is watching this switch happen,
    // and picking another option mid-swap aborts the one in flight.
    await sound.swap(key, { timeout: 10000 });
  }

  @action inspectSound(sound) {
    window.$E = sound;
    console.log(`$E = `, sound);
  }

  @action
  async removeSound() {
    this.stereo.removeSound(this.url);

    if (this.args.onRemoval) {
      this.args.onRemoval();
    }
  }
}
