import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency'

export default class DocsTryMultipleUrlsComponent extends Component {
  // BEGIN-SNIPPET try-multiple-urls-via-service.js
  @service stereo;
  @tracked sound;

  @task
  *playTask() {
    this.error = false

    if (this.sound) {
      yield this.sound.togglePause();
    }
    else {
      try {
        let { sound, error, failures } = yield this.stereo.playTask.perform([
          "https://failing.example.url/1.mp3",
          "https://streaming.koop.org/stream.mp3"
        ])
        this.sound = sound;
      } catch(e) {
        this.error = e.message
      }
    }
  }
  // END-SNIPPET try-multiple-urls-via-service.js
}
