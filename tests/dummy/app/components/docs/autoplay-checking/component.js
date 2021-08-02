import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class AutoplayChecking extends Component {
  @service stereo
  @tracked sound;

  @action
  playAfterDelay(url) {
    if (this.sound) {
      this.sound.togglePause();
    } else {
      window.setTimeout(async () => {
        let { sound, error, /* failures */ } = await this.stereo.play(url);
        this.sound = sound;
        this.error = error;
      }, 5000)
    }

  }
}
