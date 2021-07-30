import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import move from 'ember-animated/motions/move';
import { parallel } from 'ember-animated';
import scale from 'ember-animated/motions/scale';
import { task } from 'ember-concurrency';
import { makeArray } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { trackedReset } from 'tracked-toolbox';
import { action } from '@ember/object';

export default class DiagnosticControls extends Component {
  @service stereo
  @tracked selectedSound = undefined;
  @tracked selectedConnections = Object.fromEntries(this.connections.map(c => [c, true]))
  @tracked url;
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

  @action
  onPresetChange(selection) {
    this.url = selection.url
    this.selectedSound = null;
  }
}
