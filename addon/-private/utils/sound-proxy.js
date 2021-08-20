import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { tracked } from '@glimmer/tracking';
import { task, waitForProperty, race, waitForEvent } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';
import debug from 'debug';
/**
* This class lazy loads sounds based on identifiers
*
* @class SoundProxy
* @type {Util}
*/

export default class SoundProxy {
  @tracked isLoading = false;
  @tracked url;
  @tracked value;

  constructor(identifier, stereo) {
    this.stereo = stereo;
    this.stereo.on('loadTask:started', this.onStart.bind(this))
    this.stereo.on('loadTask:errored', this.onFinish.bind(this))
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this))

    this.resolveUrl.perform(identifier).catch(e => {
      throw e; // this feels real
    });
    this.waitForLoad.perform();
  }

  @task({ debug: true })
  *waitForLoad() {
    yield waitForProperty(this, 'url', (v) => !!v)
    debug('ember-stereo:sound-proxy')(`waiting for ${this.url} to load`)
    while (true) {
      yield race([
        waitForEvent(this.stereo, 'audio-loaded'),
        waitForEvent(this.stereo, 'audio-loading')
      ]);

      this.value = this.stereo.loadedSounds.find(sound => hasEqualUrls(sound.url, this.url))
      if (this.value) {
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
