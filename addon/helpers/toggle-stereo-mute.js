import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**

  ```hbs
  A helper to stop a sound
  ```hbs
    <button {{on 'click' (toggle-stereo-mute)}}>
      Toggle Mute
    </button>
  ```
  @class {{toggle-stereo-mute}}
  @type Helper
  */

export default class ToggleStereoMute extends Helper {
  @service stereo;

  compute() {
    return () => {
      return this.stereo.toggleMute()
    }
  }
}

