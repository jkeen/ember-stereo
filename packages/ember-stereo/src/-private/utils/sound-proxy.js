import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';;

import { trackedFunction } from 'ember-resources/util/function';
import Evented from 'ember-stereo/-private/utils/evented';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';

/**
* This class lazy loads sounds based on identifiers
  @private
*/

export default class SoundProxy extends Evented {
  @tracked identifier;
  @tracked isLoading = false;

  constructor(identifier, stereo) {
    super(...arguments);

    this.stereo = stereo;
    this.stereo.on('loadTask:started', this.onStart.bind(this));
    this.stereo.on('loadTask:errored', this.onFinish.bind(this));
    this.stereo.on('loadTask:succeeded', this.onFinish.bind(this));

    this.stereo.on('sound-ready', this.onSoundReady.bind(this));
    this.identifier = identifier;
  }

  resolver = trackedFunction(this, async () => {
    return await this.stereo.resolveIdentifier.perform(this.identifier);
  });

  loader = trackedFunction(this, async () => {
    return this.stereo.findLoadedSound(this.url);
  });

  get url() {
    return this.resolver.value;
  }

  @tracked _value;
  set value(val) {
    this._value = val;
  }

  get value() {
    return this.loader.value || this._value;
  }

  async afterLoad(callback) {
    try {
      // await this.waitForLoad.perform();
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
    return this.stereo.cachedErrors.find((error) => hasEqualUrls(error.url, this.url));
  }

  onSoundReady({ sound }) {
    if (hasEqualUrls(sound.url, this.url)) {
      this.value = sound;
    }
  }

  async onStart(taskInstance) {
    let urls = await this.stereo.resolveIdentifier.perform(taskInstance.args[0]);

    let match = hasEqualUrls(urls, this.url);
    if (match) {
      this.isLoading = true;
    }
  }

  async onFinish(taskInstance) {
    let urls = await this.stereo.resolveIdentifier.perform(taskInstance.args[0]);
    let match = hasEqualUrls(urls, this.url);
    if (match) {
      this.isLoading = false;
    }
  }

  willDestroy() {
    this.stereo.off('sound-ready', this.onSoundReady.bind(this));
    this.stereo.off('loadTask:started', this.onStart.bind(this));
    this.stereo.off('loadTask:errored', this.onFinish.bind(this));
    this.stereo.off('loadTask:succeeded', this.onFinish.bind(this));
  }
}
