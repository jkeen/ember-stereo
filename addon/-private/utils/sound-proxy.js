import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { isTesting, macroCondition } from '@embroider/macros';
import debug from 'debug';
import Evented from 'ember-stereo/-private/utils/evented';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { task, waitForProperty, timeout, didCancel } from 'ember-concurrency';
import { cached } from '@glimmer/tracking';
/**
* This class lazy loads sounds based on identifiers
  @private
*/

export default class SoundProxy extends Evented {
  @tracked isLoading = false;
  @tracked url;

  constructor(identifier, stereo) {
    super(...arguments);

    this.stereo = stereo;
    this.stereo.on('loadTask:started', this.onStart.bind(this));
    this.stereo.on('loadTask:errored', this.onFinish.bind(this));
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this));

    this.resolveUrlTask.perform(identifier).catch((e) => {
      if (!didCancel(e)) {
        throw e;
      }
    });
    this.waitForLoadTask.perform().catch((e) => {
      if (!didCancel(e)) {
        throw e;
      }
    });
  }

  @cached
  get value() {
    return this.stereo.findLoadedSound(this.url);
  }

  @task({ debug: true })
  *waitForLoadTask() {
    yield waitForProperty(this, 'url', (v) => !!v);
    debug('ember-stereo:sound-proxy')(`waiting for ${this.url} to load`);
    while (!this.value) {
      yield timeout(200);

      if (this.value) {
        break;
      }

      if (macroCondition(isTesting())) {
        break;
      }
    }
    debug('ember-stereo:sound-proxy')(
      `the wait is over for ${this.url} to load`
    );
  }

  async afterLoad(callback) {
    try {
      await this.waitForLoadTask.perform();
      callback(this.value);
    } catch (e) {
      // no-op
    }
  }

  @task
  *resolveUrlTask(identifier) {
    this.url = yield this.stereo.resolveIdentifierTask.perform(identifier);
    debug('ember-stereo:sound-proxy')(`resolved identifier to ${this.url}`);
  }

  get isPending() {
    return !this.value;
  }

  get isResolved() {
    return !isEmpty(this.value);
  }

  get isErrored() {
    return !isEmpty(this.errors);
  }

  get errors() {
    return this.stereo.cachedErrors.find((error) =>
      hasEqualUrls(error.url, this.url)
    );
  }

  async onStart(taskInstance) {
    let urls = await this.stereo.resolveIdentifierTask.perform(
      taskInstance.args[0]
    );

    let match = hasEqualUrls(urls, this.url);
    if (match) {
      this.isLoading = true;
    }
  }

  async onFinish(taskInstance) {
    let urls = await this.stereo.resolveIdentifierTask.perform(
      taskInstance.args[0]
    );
    let match = hasEqualUrls(urls, this.url);
    if (match) {
      this.isLoading = false;
    }
  }

  willDestroy() {
    this.stereo.off('loadTask:started', this.onStart.bind(this));
    this.stereo.off('loadTask:errored', this.onFinish.bind(this));
    this.stereo.off('loadTask:succeeded', this.onFinish.bind(this));
  }
}
