import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import debug from 'debug';
import Evented from './evented.js';
import hasEqualUrls from './has-equal-urls.js';
import { waitForProperty, didCancel } from 'ember-concurrency';
import { registerDestructor } from '@ember/destroyable';

var _class, _descriptor, _descriptor2, _descriptor3;
/**
* This class lazy loads sounds based on identifiers
  @private
  @class SoundProxy
*/
let SoundProxy = (_class = class SoundProxy extends Evented {
  constructor(_identifier, stereo) {
    super(...arguments);
    /* FIX ME:
      In order to upgrade to ember-concurrency 5 which does not include waitForProperty and task events ember stereo will need to move forward with
      its refactoring plan of moving the service-level methods into the sound object, have the sound object able to switch between connections,
      and eliminate the need for the sound proxy
    */
    _initializerDefineProperty(this, "isLoading", _descriptor, this);
    _initializerDefineProperty(this, "identifier", _descriptor2, this);
    _initializerDefineProperty(this, "value", _descriptor3, this);
    _defineProperty(this, "waitForLoadTask", buildTask(() => ({
      context: this,
      generator: function* () {
        yield waitForProperty(this, 'identifier', v => !!v);
        debug('ember-stereo:sound-proxy')(`waiting for ${this.identifier} to load`);
        this.value = this.stereo.findLoadedSound(this.identifier);
        yield waitForProperty(this, 'value', v => !!v);
        debug('ember-stereo:sound-proxy')(`the wait is over for ${this.identifier} to load`);
      }
    }), {
      debug: true,
      restartable: true,
      maxConcurrency: 1
    }, "waitForLoadTask", null));
    _defineProperty(this, "resolveUrlTask", buildTask(() => ({
      context: this,
      generator: function* (identifier) {
        this.identifier = yield this.stereo.resolveIdentifierTask.perform(identifier);
        debug('ember-stereo:sound-proxy')(`resolved identifier to ${this.identifier}`);
      }
    }), {
      debug: true,
      restartable: true,
      maxConcurrency: 1
    }, "resolveUrlTask", null));
    this.stereo = stereo;
    this.stereo.on('loadTask:started', this.onStart.bind(this));
    this.stereo.on('loadTask:errored', this.onFinish.bind(this));
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this));
    this.stereo.on('playTask:started', this.onStart.bind(this));
    this.stereo.on('playTask:errored', this.onFinish.bind(this));
    this.stereo.on('playTask:succeeded', this.onFinish.bind(this));
    registerDestructor(this, this.willDestroy.bind(this));
    this.resolveUrlTask.perform(_identifier).catch(e => {
      if (!didCancel(e)) {
        throw e;
      }
    });
    this.waitForLoadTask.perform().catch(e => {
      if (!didCancel(e)) {
        throw e;
      }
    });
  }
  async afterLoad(callback) {
    try {
      await this.waitForLoadTask.perform();
      callback(this.value);
    } catch (e) {
      // no-op
    }
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
    return this.stereo.cachedErrors.find(error => hasEqualUrls(error.url, this.identifier));
  }
  async onStart(taskInstance) {
    let urls = await this.stereo.resolveIdentifierTask.perform(taskInstance.args[0]);
    let match = hasEqualUrls(urls, this.identifier);
    if (match) {
      this.isLoading = true;
    }
  }
  async onFinish(taskInstance) {
    let urls = await this.stereo.resolveIdentifierTask.perform(taskInstance.args[0]);
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
    this.stereo.off('playTask:started', this.onStart.bind(this));
    this.stereo.off('playTask:errored', this.onFinish.bind(this));
    this.stereo.off('playTask:succeeded', this.onFinish.bind(this));
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isLoading", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "identifier", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "value", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { SoundProxy as default };
//# sourceMappingURL=sound-proxy.js.map
