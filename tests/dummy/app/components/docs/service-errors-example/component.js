import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ServiceExample extends Component {
  @tracked sound
  @tracked error

  // BEGIN-SNIPPET service-errors-example.js
  @service stereo;

  @action
  async togglePlaySoundWithThrow(url) {
    this.error = false

    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      try {
        let { sound, error, failures } = await this.stereo.play(url, { throwErrorOnFailure: true });
        this.sound = sound;
      }
      catch(e) {
        this.error = e.message
      }
    }
  }

  @action
  async togglePlaySoundWithoutThrow(url) {
    this.error = false

    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      let { sound, error, failures } = await this.stereo.play(url);
      this.sound = sound;
      this.error = error;
    }
  }
  // END-SNIPPET

}
