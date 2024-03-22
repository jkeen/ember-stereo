import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import debug from 'debug';

const log = debug('ember-stereo:shared-audio-access');

/**
 * This class handles sharing a single audio element between multiple sounds.
 * A desktop browser can generally handle multiple `audio` elements, but mobile
 * browsers require some extra consideration. Using a single element and switching
 * out the src allows us to play a piece of audio seamlessly without requiring
 * an extra click by the user to get around strict autoplay restrictions
 *
 * Note from late 2023:
 * The above was true in 2016-2017, but not sure if it still stands. Apparently using
 * a single element also solved some WNYC-specific issues with adswizz not allowing multiple
 * connections at once (as documented in the changelog for 1.6.0). But again, not sure if that's
 * worth keeping something that significantly complicates the codebase.
 *
 * @private
 * @class SharedAudioAccess
 */
/*

 */
class SharedAudioAccess {
  constructor() {
    _defineProperty(this, "audioElement", void 0);
    _defineProperty(this, "owner", void 0);
  }
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
    if (owner !== who && owner) {
      who.debug('[shared-audio-access] I need audio control');
      this.debug('coordinating peaceful transfer of power');
    }
    if (owner) {
      owner.releaseControl();
      if (owner !== who && owner) {
        owner.debug("[shared-audio-access] I've released audio control");
      }
    }
    this.owner = who;
    if (owner !== who) {
      who.debug('[shared-audio-access] I have control now');
    }
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

export { SharedAudioAccess as default };
//# sourceMappingURL=shared-audio-access.js.map
