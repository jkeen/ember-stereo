import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class Volume extends Component {
  @service stereo;
  @tracked dragAdjustment = 0;
  @tracked alreadyChanged = 0;
  notchCount = 20;

  get numOfNotches() {
    return new Array(this.notchCount);
  }

  get activeNotches() {
    return parseInt((this.stereo.volume / 100) * this.notchCount, 10);
  }
}
