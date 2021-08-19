import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { tracked } from '@glimmer/tracking';
import { task, waitForProperty } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';

/**
* This class lazy loads sounds based on identifiers
*
* @class SoundProxy
* @type {Util}
*/

export default class SoundProxy {
  @tracked isLoading = false;
  @tracked url;

  constructor(identifier, stereo) {
    this.stereo = stereo;

    this.resolveUrl.perform(identifier).catch(e => {
      throw e; // this feels real
    });
    this.stereo.on('loadTask:started', this.onStart.bind(this))
    this.stereo.on('loadTask:errored', this.onFinish.bind(this))
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this))
  }

  @task
  *waitForLoad() {
    yield waitForProperty(this, 'value')
  }

  afterLoad(callback) {
    try {
      this.waitForLoad.perform().then(() => {
        callback(this.value)
      }).catch()
    } catch (e) {
      // no-op
    }
  }

  @task
  *resolveUrl(identifier) {
    let url = yield this.stereo.resolveIdentifier.perform(identifier).catch()

    if (!isEmpty(url)) {
      this.url = url;
    }
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

  get value() {
    return this.stereo.loadedSounds.find(sound => hasEqualUrls(sound.url, this.url))
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
