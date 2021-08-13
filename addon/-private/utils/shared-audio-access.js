import debug from 'debug';
const log = debug('ember-stereo:shared-audio-access');

/***
* @class SharedAudioAccess
* @constructor
*/

/**
 * This class handles sharing a single audio element between multiple sounds.
 * A desktop browser can generally handle multiple <audio> elements, but mobile
 * browsers require some extra consideration. Using a single element and switching
 * out the src allows us to play a piece of audio seamlessly without requiring
 * an extra click by the user to get around strict autoplay restrictions
 *
 * @class SharedAudioAccess
 * @private
 */

export default class SharedAudioAccess {

  audioElement;
  owner;

  debug(message) {
    log(message);
  }

  unlock(andPlay) {
    if (!this.audioElement) {
      this.debug('creating new audio element');
      let audioElement = SharedAudioAccess.createElement();
      this.audioElement = audioElement;

      if (andPlay) {
        this.debug(`telling blank audio element to play`);
        audioElement.play();
      }
    }
    return this;
  }

  requestControl(who) {
    let owner = this.owner;

    if ((owner !== who) && owner) {
      who.debug("[shared-audio-access] I need audio control");
      this.debug("coordinating peaceful transfer of power");
    }

    if (owner) {
      owner.releaseControl();
      if ((owner !== who) && owner) {
        owner.debug("[shared-audio-access] I've released audio control");
      }
    }

    this.owner = who;
    if (owner !== who) {
      who.debug("[shared-audio-access] I have control now");
    }
    return this.audioElement;
  }

  hasControl(who) {
    return (this.owner === who);
  }

  releaseControl(who) {
    if (this.hasControl(who)) {
      this.owner = null;
    }
  }

  _reset() {
    this.owner = null;
    this.audioElement = null;
  }

  static createElement() {
    let audio = document.createElement('audio');
    audio.setAttribute('preload', 'auto');
    audio.setAttribute('id', new Date().getTime());

    return audio;
  }
}
