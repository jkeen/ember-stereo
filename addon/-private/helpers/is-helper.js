import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import { task, waitForEvent, race, all, timeout, didCancel} from 'ember-concurrency';
import BaseSound from 'ember-stereo/stereo-connections/base';
import resolveUrls from 'ember-stereo/-private/utils/resolve-urls';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';

import debug from 'debug';

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


  @task
  * watchForAudioLoaded(identifier) {
    debug(`${this.debugName}:${identifier}`)('waiting for audio-loaded or audio-played');

    while (!this.sound) {
      let { sound } = yield race([waitForEvent(this.stereo, 'audio-loaded'), waitForEvent(this.stereo, 'audio-played')])
      if (sound && hasEqualUrls(sound.url, identifier)) {
        debug(`${this.debugName}:${identifier}`)('found sound from audio-loaded');
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

    while (true) {
      var sound = null;
      debug(`${this.debugName}:${identifier}`)('waiting for new-load-request');
      let { loadPromise, urlsOrPromise, options } = yield waitForEvent(this.stereo, 'new-load-request')
      let urls = yield resolveUrls(urlsOrPromise);

      if (hasEqualUrls(identifier, urls)) {
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
        debug(`${this.debugName}:${identifier}`)('found sound from new-load-request');
        this.sound = sound;
      }
      this.isLoading = false;
      if (Ember.testing) {
        break;
      }
    }
  }

  compute([identifier], {key = undefined}) {
    this.options = {key};

    if (identifier !== this.identifier) {
      this.waitForSound.cancelAll()
      if (identifier instanceof BaseSound) {
        this.sound = identifier;
        this.identifier = identifier.url;
      }
      else {
        this.sound = UNINITIALIZED; // if identifier changes, reinitialize sound
        this.identifier = identifier || 'system';
      }
    }

    if (this.identifier !== 'system') {
      this.sound = this.stereo.findLoaded(this.identifier)

      if (this.sound) {
        debug(`${this.debugName}:${this.identifier}`)('found sound already loaded');
      }
      else {
        debug(`${this.debugName}:${this.identifier}`)('could not find loaded sound');
      }

      resolveUrls(identifier).then(urls => {
        this.waitForSound.perform(urls);
      });

    }

    return this.result;
  }

  get result() {
    return false;
  }
}
