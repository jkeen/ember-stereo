import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

/**
  A helper to get the currently playing/paused sound.
  ```hbs
   {{current-sound}}

   {{#if (sound-is-playing (current-sound))}}
     Something in this app is playing!
   {{/if}}
   ```

  @class {{current-sound}}
  @type {Helper}
*/

/**
  @method compute
  @return {Sound} returns current sound
*/
export default class currentSound extends Helper {
  @service stereo;

  compute() {
    return this.stereo.currentSound;
  }
}
