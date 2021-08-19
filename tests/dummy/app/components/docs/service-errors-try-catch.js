import Component from "@glimmer/component";
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ServiceExample extends Component {
  @tracked sound
  @tracked error;
  @service stereo;

  // BEGIN-SNIPPET service-errors-try-catch.js
  @action
  async togglePlaySound(url) {
    this.error = false

    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      try {
        let { sound, /* error, failures */ } = await this.stereo.play(url);
        this.sound = sound;
      }
      catch (e) {
        this.error = e.message
      }
    }
  }
  // END-SNIPPET service-errors-try-catch.js
}
