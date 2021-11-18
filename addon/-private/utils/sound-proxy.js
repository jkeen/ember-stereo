import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { tracked } from '@glimmer/tracking';
import { task, waitForProperty, waitForEvent, didCancel } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';
import Evented from 'ember-stereo/-private/utils/evented';
import Ember from 'ember';
import debug from 'debug';
/**
* This class lazy loads sounds based on identifiers
  @private
*/

export default class SoundProxy extends Evented {
  @tracked isLoading = false;
  @tracked url;
  @tracked value;

  constructor(identifier, stereo) {
    super(...arguments);

    this.stereo = stereo;
    this.stereo.on('loadTask:started', this.onStart.bind(this))
    this.stereo.on('loadTask:errored', this.onFinish.bind(this))
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this))

    this.resolveUrl.perform(identifier).catch(e => {
      if (!didCancel(e)) {
        throw e;
      }
    });
    this.waitForLoad.perform().catch(e => {
      if (!didCancel(e)) {
        throw e;
      }
    });
  }

  @task({ debug: true })
  *waitForLoad() {
    yield waitForProperty(this, 'url', (v) => !!v)
    debug('ember-stereo:sound-proxy')(`waiting for ${this.url} to load`)
    while (!this.value) {
      let alreadyLoaded = this.stereo.findLoadedSound(this.url);
      if (alreadyLoaded) {
        this.value = alreadyLoaded;
      } else {
        let { sound } = yield waitForEvent(this.stereo, 'sound-ready');
        if (hasEqualUrls(sound.url, this.url)) {
          this.value = sound;
        }
      }

      if (this.value) {
        break;
      }

      if (Ember.testing) {
        break;
      }
    }
    debug('ember-stereo:sound-proxy')(`the wait is over for ${this.url} to load`)
  }

  async afterLoad(callback) {
    try {
      await this.waitForLoad.perform();
      callback(this.value)
    } catch (e) {
      // no-op
    }
  }

  @task
  *resolveUrl(identifier) {
    this.url = yield this.stereo.resolveIdentifier.perform(identifier)
    debug('ember-stereo:sound-proxy')(`resolved identifier to ${this.url}`)
  }

  get isPending() {
    return !this.value
  }

  get isResolved() {
    return !isEmpty(this.value)
  }

  get isErrored() {
    return !isEmpty(this.errors)
  }

  get errors() {
    return this.stereo.cachedErrors.find(error => hasEqualUrls(error.url, this.url))
  }

  async onStart(taskInstance) {
    let urls = await this.stereo.resolveIdentifier.perform(taskInstance.args[0])

    let match = hasEqualUrls(urls, this.url);
    if (match) {
      this.isLoading = true;
    }
  }

  async onFinish(taskInstance) {
    let urls = await this.stereo.resolveIdentifier.perform(taskInstance.args[0])
    let match = hasEqualUrls(urls, this.url);
    if (match) {
      this.isLoading = false;
    }
  }

  willDestroy() {
    this.stereo.off('loadTask:started', this.onStart.bind(this))
    this.stereo.off('loadTask:errored', this.onFinish.bind(this))
    this.stereo.off('loadTask:succeeded', this.onFinish.bind(this))
  }
}
