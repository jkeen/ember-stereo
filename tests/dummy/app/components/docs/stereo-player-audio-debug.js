import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class DocsStereoPlayerAudioDebugComponent extends Component {
  @service stereo;

  element = null;
  constructor() {
    super(...arguments);
    this.stereo.on('audio-loaded', this.onAudioLoaded.bind(this));
  }

  @action
  onAudioLoaded({ sound }) {
    if (sound.hasUrl(this.args.identifier) && this.element) {
      // sound.audioElement.setAttribute('controls', true);
      // this.element.appendChild(sound.audioElement);
    }
  }

  @action
  registerDebugArea(element) {
    this.element = element;
  }
}
