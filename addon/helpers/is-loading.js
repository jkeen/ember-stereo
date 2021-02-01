
import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';
import { makeArray } from '@ember/array';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { dedupeTracked } from 'tracked-toolbox';


/**
  A helper to detect if a sound is loading.
  ```hbs
    {{#if (is-loading this.url)}}
      <p>This url is currently loading</p>
    {{else}}
      <p>This url is not currently loading</p>
    {{/if}}
  ```

  Can also look for any system-level loading event by passing in no argument
  ```hbs
    {{#if (is-loading)}}
      <p>Something is loading</p>
    {{else}}
      <p>Something is not loading</p>
    {{/if}}
  ```

  @class {{is-loading}}
  @type Helper
  @param {String} url
*/
@classic
export default class HifiIsLoading extends HifiBaseIsHelper {
  name = 'is-loading'
  listen = ['audio-loading']

  @dedupeTracked isLoading = false;

  registerListeners(identifier) {
    this.boundRecompute = (e) => this.recompute(e);
    if (!this.registered) {
      super.registerListeners(identifier)

      this.hifi.on('pre-load', (e) => this.onPreloadRequest(e));
      this.hifi.on('new-load-request', (e) => this.onNewLoadRequest(e));
    }
  }

  onNewLoadRequest({loadPromise, urlsOrPromise}) {
    if (hasEqualUrls(this.registered, urlsOrPromise)) {
      this.handleLoadPromise(...arguments);
    }
    else if (this.registered == 'system') {
      this.handleLoadPromise(...arguments);
    }
  }

  handleLoadPromise({loadPromise, urlsOrPromise}) {
    this.isLoading = true;
    this.boundRecompute(this.registered);
    if (loadPromise) {
      loadPromise.finally(() => {
        this.isLoading = false;
        this.boundRecompute(this.registered)
      })
    }
  }

  onPreloadRequest({loadPromise, urlsOrPromise}) {
    if (hasEqualUrls(this.registered, urlsOrPromise)) {
      this.handleLoadPromise(...arguments);
    }
    else if (this.registered == 'system') {
      this.handleLoadPromise(...arguments);
    }
  }

  checkSystem() {
    return this.hifi.isLoading || this.isLoading;
  }

  checkSound(sound) {
    return !!(sound && sound.isLoading) || this.isLoading;
  }


  /**
    returns the state
    @method compute
    @param {String} [url]
    @return {boolean}
  */

  /* inherited */
}