
import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';
import { makeArray } from '@ember/array';
@classic
export default class HifiIsLoading extends HifiBaseIsHelper {
  name = 'is-loading'
  listen = ['audio-loaded', 'audio-loading', 'current-sound-changed']

  init() {
    super.init(...arguments);

    this.boundOnNewLoadRequest = (args) => this.onNewLoadRequest(args);
    this.boundOnPreloadRequest = (args) => this.onPreloadRequest(args);

    this.hifi.on('new-load-request', this.boundOnNewLoadRequest);
    this.hifi.on('pre-load', this.boundOnPreloadRequest);
  }

  onNewLoadRequest({loadPromise, urlsOrPromise}) {
    if (this.compare && makeArray(this.compare).some(u => u && urlsOrPromise == u.toString())) {
      console.log('new load req match, setting is loading = true')
      this.updateResult(true);
      if (loadPromise) {
        loadPromise.then(() => {
          this.updateResult(false);
        })  
      }
    }
    else if (!this.compare.toString()) {
      this.updateResult(true);
      if (loadPromise) {
        loadPromise.then(() => {
          this.updateResult(false);
        })  
      }
    }
  }

  onPreloadRequest({loadPromise, urlsOrPromise}) {
    if (this.compare && this.compare.some(u => u && urlsOrPromise == u.toString())) {
      console.log('preload match, setting is loading = true')
      this.updateResult(true);
      if (loadPromise) {
        loadPromise.then(() => {
          this.updateResult(false);
        })  
      }
    }
    else if (!this.compare.toString()) {
      this.updateResult(true);
      if (loadPromise) {
        loadPromise.then(() => {
          this.updateResult(false);
        })
      }
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.hifi.off('new-load-request', this.boundOnNewLoadRequest);
    this.hifi.off('pre-load', this.boundOnPreloadRequest);
  }

  checkSystem() {
    return this.hifi.isLoading;
  }

  checkSound(sound) {
    return sound && sound.isLoading;
  }
}