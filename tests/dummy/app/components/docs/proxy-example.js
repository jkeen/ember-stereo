import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET proxy-example.js
export default class ProxyExample extends Component {
  @service stereo;
  @tracked url = 'https://kut.streamguys1.com/kut-web.aac';
  constructor() {
    super(...arguments);
  }

  get sound() {
    return this.stereo.findSound(this.url);
  }
}
// END-SNIPPET proxy-example.js
