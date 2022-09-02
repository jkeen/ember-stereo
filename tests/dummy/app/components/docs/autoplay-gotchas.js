import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AutoplayGotchas extends Component {
  @tracked sound;
  @tracked url;
  @service stereo;

  // BEGIN-SNIPPET autoplay-gotchas.js

  async fetchUrl() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('https://streaming.koop.org/stream.aac'), 2000);
    });
  }

  @action
  async togglePlaySound() {
    this.url = await this.fetchUrl();

    let { sound } = await this.stereo.load(this.url, { silenceErrors: true });
    await sound.play();
  }
  // END-SNIPPET autoplay-gotchas.js
}
