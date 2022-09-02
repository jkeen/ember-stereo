import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ServiceExample extends Component {
  @tracked sound;
  @tracked error;
  @service stereo;

  // BEGIN-SNIPPET service-errors-wild-west.js
  @action
  async togglePlaySound(url) {
    this.error = false;

    if (this.sound) {
      this.sound.togglePause();
    } else {
      let { sound, error /* failures */ } = await this.stereo.play(url);

      // error gets thrown and this will never happen. catch your errors, mang
      this.sound = sound;
      this.error[url] = error;
    }
  }
  // END-SNIPPET
}
