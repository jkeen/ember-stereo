import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET proxy-example.js
export default class ProxyExample extends Component {
  @service stereo;
  @tracked url = 'https://streaming.koop.org/stream.aac';

  @action
  remove() {
    this.stereo.removeSound(this.url);
  }
}
// END-SNIPPET proxy-example.js
