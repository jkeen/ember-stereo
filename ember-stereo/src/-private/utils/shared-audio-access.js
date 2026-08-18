import debug from 'debug';
import SILENT_SOURCE from './silent-source';
const log = debug('ember-stereo:shared-audio-access');

/**
 * This class handles sharing a single audio element between multiple sounds.
 * A desktop browser can generally handle multiple `audio` elements, but mobile
 * browsers require some extra consideration. Using a single element and switching
 * out the src allows us to play a piece of audio seamlessly without requiring
 * an extra click by the user to get around strict autoplay restrictions
 *
 * @private
 * @hide
 * @class SharedAudioAccess
 */
/*

 */
export default class SharedAudioAccess {
  audioElement;
  owner;
  isUnlocked = false;

  debug(message) {
    log(message);
  }

  unlock(andPlay) {
    if (!this.audioElement) {
      this.debug('creating new audio element');
      this.audioElement = SharedAudioAccess.createElement();
    }

    // iOS only frees an element that played during a user gesture, and a source-less element cannot play at all.
    if (andPlay && !this.isUnlocked) {
      this.isUnlocked = true;
      if (!this.audioElement.getAttribute('src')) {
        this.audioElement.setAttribute('src', SILENT_SOURCE);
      }
      this.debug('playing silence to unlock the shared audio element');
      this.audioElement.play().catch((error) => {
        this.isUnlocked = false;
        this.debug(`could not unlock the shared element: ${error}`);
      });
    }

    return this;
  }

  requestControl(who) {
    let owner = this.owner;

    if (owner && owner !== who) {
      who.debug('[shared-audio-access] I need audio control');
      this.debug('coordinating peaceful transfer of power');

      owner.releaseControl();
      owner.debug("[shared-audio-access] I've released audio control");
      who.debug('[shared-audio-access] I have control now');
    }

    this.owner = who;
    return this.audioElement;
  }

  hasControl(who) {
    return this.owner === who;
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
    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('id', new Date().getTime());

    return audio;
  }
}
