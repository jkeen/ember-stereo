import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AutoplayGotchas extends Component {
  @tracked sound
  @tracked error;
  @service stereo;

  // BEGIN-SNIPPET autoplay-gotchas.js

  @action
  async togglePlaySound(url) {
    if (this.sound) {
      this.sound.togglePause();
    }
    else {
      let { sound, error, failures } = await this.stereo.load(url, { silenceErrors: true });
      this.sound = sound;
    }
  }
  // END-SNIPPET autoplay-gotchas.js
}
