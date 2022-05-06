import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ServiceExample extends Component {
  @tracked sound;
  @tracked error;
  @service stereo;

  // BEGIN-SNIPPET service-errors-silence-errors.js
  @action
  async togglePlaySound(url) {
    this.error = false;

    if (this.sound) {
      this.sound.togglePause();
    } else {
      let { sound, error /* failures */ } = await this.stereo.play(url, {
        silenceErrors: true,
      });
      this.sound = sound;
      this.error = error;
    }
  }
  // END-SNIPPET service-errors-silence-errors.js
}
