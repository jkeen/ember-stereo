import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import debug from 'debug';
import Evented from './evented';
import hasEqualUrls from './has-equal-urls';
import { task, waitForProperty, didCancel } from 'ember-concurrency';
import { registerDestructor } from '@ember/destroyable';
/**
* This class lazy loads sounds based on identifiers
  @private
  @class SoundProxy
*/

export default class SoundProxy extends Evented {
  @tracked isLoading = false;
  @tracked identifier;

  constructor(identifier, stereo) {
    super(...arguments);

    this.stereo = stereo;
    this.stereo.on('loadTask:started', this.onStart.bind(this));
    this.stereo.on('loadTask:errored', this.onFinish.bind(this));
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this));

    registerDestructor(this, this.willDestroy.bind(this));

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

  @tracked value;

  @task({ debug: true })
  *waitForLoadTask() {
    yield waitForProperty(this, 'identifier', (v) => !!v);
    debug('ember-stereo:sound-proxy')(`waiting for ${this.identifier} to load`);

    this.value = this.stereo.findLoadedSound(this.identifier);

    yield waitForProperty(this, 'value', (v) => !!v);
    debug('ember-stereo:sound-proxy')(
      `the wait is over for ${this.identifier} to load`
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
    this.identifier = yield this.stereo.resolveIdentifierTask.perform(
      identifier
    );
    debug('ember-stereo:sound-proxy')(
      `resolved identifier to ${this.identifier}`
    );
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
      hasEqualUrls(error.url, this.identifier)
    );
  }

  async onStart(taskInstance) {
    let urls = await this.stereo.resolveIdentifierTask.perform(
      taskInstance.args[0]
    );

    let match = hasEqualUrls(urls, this.identifier);
    if (match) {
      this.isLoading = true;
    }
  }

  async onFinish(taskInstance) {
    let urls = await this.stereo.resolveIdentifierTask.perform(
      taskInstance.args[0]
    );
    let match = hasEqualUrls(urls, this.identifier);
    if (match) {
      this.isLoading = false;
      this.value = this.stereo.findLoadedSound(this.identifier);
    }
  }

  willDestroy() {
    this.stereo.off('loadTask:started', this.onStart.bind(this));
    this.stereo.off('loadTask:errored', this.onFinish.bind(this));
    this.stereo.off('loadTask:succeeded', this.onFinish.bind(this));
  }
}
