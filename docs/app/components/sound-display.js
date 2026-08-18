import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

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
    let connection = this.loadedSound?.connection;
    return (
      this.usingSingleAudioElement &&
      !!connection?.sharedAudioAccess?.hasControl(connection)
    );
  }

  get allConnections() {
    return this.stereo.connectionLoader.connections;
  }

  get isCurrentSound() {
    return this.stereo.currentSound === this.loadedSound;
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
