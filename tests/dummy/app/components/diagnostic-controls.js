import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
export default class DiagnosticControls extends Component {
  @service stereo
  @tracked selectedSound = undefined;
  @tracked selectedConnections = this.stereo.connectionLoader.names
  @tracked url;
  @tracked metadata;
  @tracked connectionStrategy = 'default'

  connections = this.stereo.connectionLoader.connections

  get items() {
    return this.args.testSounds;
  }

  @action
  setConnectionStrategy(option) {
    this.connectionStrategy = option.target.value;
  }

  get useConnections() {
    if (this.connectionStrategy === 'choose') {
      return this.stereo.connectionLoader.names.filter(name => this.selectedConnections.includes(name));
    }

    return null
  }

  @action
  updateSelectedStrategies(name, op) {
    if (op) {
      this.selectedConnections = this.selectedConnections.filter(d => d !== name)
    }
    else {
      this.selectedConnections = [name].concat(this.selectedConnections)
    }

  }

  get formattedMetadata() {
    try {
      return JSON.parse(this.metadata)
    } catch (e) {
      return {}
    }
  }

  @action
  onPresetChange(e) {
    if (e && e.target) {
      let title = e.target.value
      let item = this.items.find(i => i.title === title);
      this.url = item.url
      this.metadata = JSON.stringify({
        title: item.title
      })
      this.selectedSound = null;
      e.target.options.selectedIndex = 0;

      e.target.parentNode.querySelector('#url').focus();
    }
  }
}
