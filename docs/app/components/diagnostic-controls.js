import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class DiagnosticControls extends Component {
  @service stereo;
  @tracked selectedConnections = this.stereo.connectionLoader.names;
  @tracked url;
  @tracked metadata;
  @tracked connectionStrategy = 'default';

  connections = this.stereo.connectionLoader.connections;

  get items() {
    return this.args.testSounds ?? [];
  }

  @action
  setConnectionStrategy(option) {
    this.connectionStrategy = option.target.value;
  }

  get useConnections() {
    if (this.connectionStrategy === 'choose') {
      return this.stereo.connectionLoader.names.filter((name) =>
        this.selectedConnections.includes(name),
      );
    }

    return null;
  }

  @action
  updateSelectedStrategies(name, op) {
    if (op) {
      this.selectedConnections = this.selectedConnections.filter(
        (d) => d !== name,
      );
    } else {
      this.selectedConnections = [name].concat(this.selectedConnections);
    }
  }

  @action updateMetadata() {
    let sound = this.url ? this.stereo.findSound(this.url) : null;
    if (sound) {
      sound.metadata = this.formattedMetadata;
    }
  }

  get parsedMetadata() {
    if (!this.metadata?.trim()) {
      return { value: {} };
    }

    try {
      return { value: JSON.parse(this.metadata) };
    } catch (error) {
      return { value: {}, error: error.message };
    }
  }

  get formattedMetadata() {
    return this.parsedMetadata.value;
  }

  get metadataError() {
    return this.parsedMetadata.error;
  }

  @action
  selectPreset(item) {
    this.url = item.url;
    this.metadata = JSON.stringify({ title: item.title });
  }
}
