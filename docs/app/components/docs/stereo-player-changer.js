import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StereoPlayerChanger extends Component {
  @tracked identifier = this.args.sounds[0].url;

  @action
  select(url) {
    this.identifier = url;
  }
}
