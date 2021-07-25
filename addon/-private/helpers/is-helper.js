import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import { task, waitForEvent, race, all, timeout, didCancel} from 'ember-concurrency';
import BaseSound from 'ember-stereo/stereo-connections/base';
import resolveUrls from 'ember-stereo/-private/utils/resolve-urls';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

const UNINITIALIZED = Object.freeze({});
export default class StereoBaseIsHelper extends Helper {
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked isLoading = false
  @dedupeTracked sound = UNINITIALIZED
  @dedupeTracked options = UNINITIALIZED

  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  get waitingForSound() {
    return !this.sound?.url
  }

  @task
  * watchForAudioLoaded(identifier) {
    debugMessage(this, 'waiting for audio-loaded or audio-played');

    while (this.waitingForSound) {
      let { sound } = yield race([waitForEvent(this.stereo, 'audio-loaded'), waitForEvent(this.stereo, 'audio-played')])
      if (sound && hasEqualUrls(sound.url, identifier)) {
        this.isLoading = false;
        this.sound = sound;
      }

      if (Ember.testing) {
        break;
      }
    }
  }

  @task
  * waitForSound(identifier) {
    this.watchForAudioLoaded.perform(identifier)

    while (this.waitingForSound) {
      var sound = null;
      debugMessage(this, 'waiting for new-load-request');
      let { loadPromise, urlsOrPromise, options } = yield waitForEvent(this.stereo, 'new-load-request')
      let urls = yield resolveUrls(urlsOrPromise);

      if (hasEqualUrls(identifier, urls)) {
        debugMessage(this, 'loading sound');
        this.isLoading = true
        try {
          loadPromise.then(value => {
            sound = value.sound
          })
        } catch(e) {
          if (!didCancel(e)) {
            throw e;
          }
        }
      }

      if (sound) {
        debugMessage(this, 'found sound from new-load-request');
        this.sound = sound;
        this.isLoading = false;
      }
      if (Ember.testing) {
        break;
      }
    }
  }

  compute([identifier], options = {}) {
    this.options = options;

    if (identifier !== this.identifier) {
      this.waitForSound.cancelAll()
      if (identifier instanceof BaseSound) {
        this.sound = identifier;
        this.identifier = identifier.url;
      }
      else {
        this.sound = UNINITIALIZED
        this.identifier = identifier;
      }
    }

    this.sound = this.stereo.findLoaded(this.identifier)
    if (this.sound) {
      debugMessage(this, 'found sound already loaded');
    }
    else {
      if (options.load) {
        this.stereo.load(identifier).then(({ sound }) => this.sound = sound);
      }
      else {
        debugMessage(this, 'could not find loaded sound');
        resolveUrls(this.identifier).then(urls => {
          this.waitForSound.perform(urls);
        });
      }
    }

    return this.result;
  }

  get result() {
    return false;
  }
}
