import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ServiceDisplay extends Component {
  @service stereo;
  @tracked showDebugInfo;
}
