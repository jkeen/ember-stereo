import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class DocsCastSupport extends Component {
  @service stereo;

  get supportedKind() {
    return this.stereo.supportedCastType;
  }
}
