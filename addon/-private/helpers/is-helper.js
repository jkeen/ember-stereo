import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import { task, waitForEvent, waitForProperty, race, all, timeout, didCancel} from 'ember-concurrency';
import BaseSound from 'ember-stereo/stereo-connections/base';
import resolveUrls from 'ember-stereo/-private/utils/resolve-urls';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import debugMessage from 'ember-stereo/-private/utils/debug-message';

const UNINITIALIZED = Object.freeze({});
export default class StereoBaseIsHelper extends Helper {
  @service stereo;

  identifier = UNINITIALIZED;
  @dedupeTracked task = UNINITIALIZED
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
    while (this.waitingForSound) {
      let { sound } = yield race([
        waitForEvent(this.stereo, 'audio-loaded'),
        waitForEvent(this.stereo, 'audio-played'),
        waitForEvent(this.stereo, 'audio-load-error')
      ])

      if (sound) {
        if (yield hasEqualIdentifiers(sound.url, identifier)) {
          this.sound = sound;
        }
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
      let identifierUrls = yield resolveUrls(identifier)
      yield waitForProperty(this.stereo.loadTask, 'last.urls', (urls) => {
        return hasEqualUrls(urls, identifierUrls)
      });

      this.task = this.stereo.loadTask.last
      let result = yield waitForProperty(this.stereo.loadTask, 'last.value');
      this.sound = result.sound;

      if (Ember.testing) {
        break;
      }
    }
  }

  compute([identifier], options = {}) {
    this.options = options;

    if (identifier !== this.identifier) {
      this.waitForSound.cancelAll()
      this.watchForAudioLoaded.cancelAll();

      if (identifier instanceof BaseSound) {
        this.sound = identifier;
        this.identifier = identifier.url;
      }
      else {
        this.sound = UNINITIALIZED
        this.identifier = identifier
        this.sound = this.stereo.findLoaded(identifier)
      }

      if (!this.sound) {
        if (options.load) {
          this.stereo.load(this.identifier).then(({ sound }) => this.sound = sound);
        }
        else {
          resolveUrls(this.identifier).then(stereoUrls => {
            stereoUrls.forEach(stereoUrl => this.waitForSound.perform(stereoUrl.url));
          });
        }
      }
    }

    return this.result;
  }

  get isLoading() {
    return this.task && this.task.isRunning
  }

  get result() {
    return false;
  }
}
