import Component from "@glimmer/component";
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class ServiceExample extends Component {
  @tracked sound
  @tracked error;
  @service stereo;

  // BEGIN-SNIPPET service-errors-try-catch.js
  @task
  *playSound(url) {
    this.error = false

    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      try {
        let { sound, /* error, failures */ } = yield this.stereo.play(url);
        this.sound = sound;
      }
      catch (e) {
        this.error = e.message
      }
    }
  }
  // END-SNIPPET service-errors-try-catch.js
}
