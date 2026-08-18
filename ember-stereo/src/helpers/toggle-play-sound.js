import StereoBaseActionHelper from '../-private/helpers/action-helper';
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
  @param {Any} identifier a url, an array of urls, a url object, a Sound, or a promise resolving to any of those
  @param {Hash} metadata? metadata that should be included with the sound
  @param {[String]} useConnections? array of connection names in preference order
  @param {[String]} xhr? hash of xhr options: { method: 'POST', headers: { Authorization: 'Bearer 1234'}, withCredentials: true }
  @return {Function}
*/
export default class togglePlaySound extends StereoBaseActionHelper {
  performAction(sound) {
    if (sound?.isResolved) {
      sound.togglePause();
    } else {
      this.stereo.playTask.perform(this.identifier, this.options).catch((e) => {
        if (!didCancel(e)) {
          throw e;
        }
      });
    }
  }
}
