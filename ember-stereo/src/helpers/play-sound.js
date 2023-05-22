import StereoBaseActionHelper from '../-private/helpers/action-helper';
import { didCancel } from 'ember-concurrency';
/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (play-sound @identifier}}>
      Play
    </button>
  ```
  @class {{play-sound}}
  @type {Helper}
  @param {String} url
  @param {Object} options
  @param {Object} metadata
  */

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {Hash} metadata? metadata that should be included with the sound
  @param {[String]} useConnections? array of connection names in preference order
  @return {Function}
*/
export default class playSound extends StereoBaseActionHelper {
  performAction() {
    return this.stereo.playTask
      .perform(this.identifier, this.options)
      .catch((e) => {
        if (!didCancel(e)) {
          throw e;
        }
      });
  }
}
