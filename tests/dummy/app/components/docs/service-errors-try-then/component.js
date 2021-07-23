import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ServiceExample extends Component {
  @tracked sound
  @tracked error;
  @service stereo;

  // BEGIN-SNIPPET service-errors-try-then.js
  @action
  togglePlaySound(url) {
    this.error = false

    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      this.stereo.play(url).then(({ sound, error, failures }) => {
        this.sound = sound;
      }).catch(e => {
        this.error = e.message
      })
    }
  }
  // END-SNIPPET service-errors-try-then.js
}
