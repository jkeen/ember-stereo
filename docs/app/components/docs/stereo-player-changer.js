import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StereoPlayerChanger extends Component {
  @service stereo;
  @tracked sound;
  @tracked identifier = this.args.identifiers[0];

  @action
  async pickNextIdentifier() {
    const index = this.args.identifiers.indexOf(this.identifier);
    const nextIndex = (index + 1) % this.args.identifiers.length;
    this.identifier = this.args.identifiers[nextIndex];
  }
}
