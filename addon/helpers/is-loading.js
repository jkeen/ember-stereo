
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import { once } from '@ember/runloop';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { getOwner } from '@ember/application';

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
export default class HifiIsLoading extends Helper {
  @service hifi;

  name = 'is-loading'
  listen = ['audio-loading', 'audio-load-error', 'audio-played', 'audio-paused']

  @dedupeTracked isLoading = false;
  @tracked sound = null;
  @tracked compare = null;
  @tracked result = false
  registered = false

  handleEvent(sound, value) {
    if (sound && hasEqualUrls(sound.url, this.registered)) {
      this.isLoading = value //&& !sound.isPlaying;
      this.boundRecompute(this.registered)
    }
    else if (this.registered == 'system') {
      this.isLoading = value //&& !this.hifi.isPlaying;;
      this.boundRecompute(this.registered)
    }
  }

  registerListeners(identifier) {
    this.boundRecompute = (e) => this.recompute(e);
    if (!this.registered) {
      this.registered = identifier;

      this.hifi.on('audio-load-error', (sound) => this.handleEvent(sound, false))
      this.hifi.on('audio-paused', (sound) => this.handleEvent(sound, false))
      this.hifi.on('audio-played', (sound) => this.handleEvent(sound, false))
      this.hifi.on('audio-loading', (sound) => this.handleEvent(sound, true))
      this.hifi.on('pre-load', (e) => this.onPreloadRequest(e))
      this.hifi.on('new-load-request', (e) => this.onNewLoadRequest(e))
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
    if (loadPromise) {
      this.isLoading = true;
      this.boundRecompute(this.registered);
      loadPromise.then(() => {
        this.isLoading = false;
        this.boundRecompute(this.registered)  
      }).catch((e)=> {
        this.isLoading = false;
        this.boundRecompute(this.registered)  
      })
    }
    else {
      this.boundRecompute(this.registered);
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

   compute(compare = 'system') {
    if (compare.toString().trim().length == 0) {
      compare = 'system';
    }
    this.registerListeners(compare);
    this.result = this.isLoading;
    debug(`ember-hifi:helpers:${this.name}:system`)(`render = ${this.result}`); 
  
    return this.result;
  }
  /* inherited */
}