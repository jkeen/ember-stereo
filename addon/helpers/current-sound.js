import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to get a sound's position.
  ```hbs
   {{current-sound}} #=> sound

   ```

  @class {{current-sound}}
  @type Helper
  @returns {Sound}
*/

export default class currentSound extends Helper {
  @service stereo;

  compute() {
    return this.stereo.currentSound;
  }
}
