import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to toggle stereo's mute status

  ```hbs
    <button {{on 'click' (toggle-stereo-mute)}}>
      Toggle Mute
    </button>
  ```
  @class {{toggle-stereo-mute}}
  @type {Helper}
  */

/**
  @method compute
  @return {Function}
*/
export default class ToggleStereoMute extends Helper {
  @service stereo;

  compute() {
    return () => {
      return this.stereo.toggleMute();
    };
  }
}
