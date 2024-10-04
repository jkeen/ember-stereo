import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
// BEGIN-SNIPPET queued.js
export default class Queued extends Component {
  @service stereo;

  @tracked identifier;
  @tracked queue = [];

  @action
  async playSound() {
    this.queue = [
      '/sounds/attention.mp3',
      '/sounds/internet-on-computers.mp3',
      'https://streaming.koop.org/stream.aac',
    ];

    let sound = await this.playNext();
    sound.audioElement.setAttribute(
      'id',
      `id-${Math.floor(Math.random() * 10000)}`
    );

    this.stereo.on('audio-ended', ({ sound }) => {
      console.log(sound.audioElement);
      this.playNext();
    });
  }

  async playNext() {
    let next = this.queue.shift();
    if (next) {
      let { sound } = await this.stereo.play(next);

      return sound;
    }
  }
}
// END-SNIPPET queued.js
