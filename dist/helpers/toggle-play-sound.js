import ActionHelper from '../-private/helpers/action-helper.js';
import { didCancel } from 'ember-concurrency';

/**
  A helper to toggle play/pause a sound
  ```hbs
    <button {{on 'click' (toggle-play-sound @identifier)}}>
      Play/Pause
    </button>
  ```
  @class {{toggle-play-sound}}
  @type {Helper}
  @param {String} url
  */

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Hash} metadata? metadata that should be included with the sound
  @param {[String]} useConnections? array of connection names in preference order
  @param {[String]} xhr? hash of xhr options: { method: 'POST', headers: { Authorization: 'Bearer 1234'}, withCredentials: true }
  @return {Function}
*/
class togglePlaySound extends ActionHelper {
  performAction(sound) {
    if (sound) {
      sound.togglePause();
    } else {
      this.stereo.playTask.perform(this.identifier, this.options).catch(e => {
        if (!didCancel(e)) {
          throw e;
        }
      });
    }
  }
}

export { togglePlaySound as default };
//# sourceMappingURL=toggle-play-sound.js.map
