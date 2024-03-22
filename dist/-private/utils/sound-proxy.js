import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import debug from 'debug';
import Evented from './evented.js';
import hasEqualUrls from './has-equal-urls.js';
import { task, didCancel, waitForProperty } from 'ember-concurrency';
import { registerDestructor } from '@ember/destroyable';

var _dec, _class, _descriptor, _descriptor2, _descriptor3;
/**
* This class lazy loads sounds based on identifiers
  @private
  @class SoundProxy
*/
let SoundProxy = (_dec = task({
  debug: true
}), (_class = class SoundProxy extends Evented {
  constructor(identifier, stereo) {
    super(...arguments);
    _initializerDefineProperty(this, "isLoading", _descriptor, this);
    _initializerDefineProperty(this, "identifier", _descriptor2, this);
    _initializerDefineProperty(this, "value", _descriptor3, this);
    this.stereo = stereo;
    this.stereo.on('loadTask:started', this.onStart.bind(this));
    this.stereo.on('loadTask:errored', this.onFinish.bind(this));
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this));
    registerDestructor(this, this.willDestroy.bind(this));
    this.resolveUrlTask.perform(identifier).catch(e => {
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
  *waitForLoadTask() {
    yield waitForProperty(this, 'identifier', v => !!v);
    debug('ember-stereo:sound-proxy')(`waiting for ${this.identifier} to load`);
    this.value = this.stereo.findLoadedSound(this.identifier);
    yield waitForProperty(this, 'value', v => !!v);
    debug('ember-stereo:sound-proxy')(`the wait is over for ${this.identifier} to load`);
  }
  async afterLoad(callback) {
    try {
      await this.waitForLoadTask.perform();
      callback(this.value);
    } catch (e) {
      // no-op
    }
  }
  *resolveUrlTask(identifier) {
    this.identifier = yield this.stereo.resolveIdentifierTask.perform(identifier);
    debug('ember-stereo:sound-proxy')(`resolved identifier to ${this.identifier}`);
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
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isLoading", [tracked], {
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
}), _applyDecoratedDescriptor(_class.prototype, "waitForLoadTask", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "waitForLoadTask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resolveUrlTask", [task], Object.getOwnPropertyDescriptor(_class.prototype, "resolveUrlTask"), _class.prototype)), _class));

export { SoundProxy as default };
//# sourceMappingURL=sound-proxy.js.map
