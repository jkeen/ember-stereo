import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DiagnosticControls extends Component {
  @service stereo
  @tracked selectedSound = undefined;
  @tracked selectedConnections = Object.fromEntries(this.connections.map(c => [c, true]))
  @tracked url;
  @tracked metadata;
  @tracked connectionStrategy = 'default'
  @tracked useConnections = null;

  connections = this.stereo.connectionLoader.connections

  get items() {
    return this.args.testSounds;
  }

  @action
  setConnectionStrategy(option) {
    this.connectionStrategy = option;
    if (this.connectionStrategy === 'default') {
      this.useConnections = null;
    }

  }

  @action
  updateSelectedStrategies(name, _enabled, event) {
    this.selectedConnections[name] = event.target.checked
    this.useConnections = this.connections.filter(name => !!this.selectedConnections[name]);
  }

  get formattedMetadata() {
    try {
      return JSON.parse(this.metadata)
    } catch(e) {
      return {}
    }
  }

  @action
  onPresetChange(selection) {
    this.url = selection.url
    this.metadata = JSON.stringify({
      title: selection.title
    })
    this.selectedSound = null;
  }
}
