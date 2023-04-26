import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ServiceExample extends Component {
  // BEGIN-SNIPPET service-example.js
  @service stereo;
  @tracked sound;

  @action
  async togglePlaySound(url) {
    if (this.sound) {
      this.sound.togglePause();
    } else {
      let { sound } = await this.stereo.play(url);
      this.sound = sound;
    }
  }
  // END-SNIPPET
}
