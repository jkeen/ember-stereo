import classic from 'ember-classic-decorator';
import Service from '@ember/service';
import { A as emberArray, makeArray } from '@ember/array';
import { inject as service } from '@ember/service';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
/**
* This class caches sound objects based on urls. You shouldn't have to interact with this class.
*
* @class hifi-cache
* @private
* @constructor
*/

@classic
export default class HifiCache  {
  debugName = 'hifi-cache';
  @tracked cachedCount = 0;

  constructor() {
    this._cache = {};
  }

  reset() {
    this._cache = {};
  }

  /**
   * find - finds sounds in the cache by urls
   *
   * @param {string} urls
   * @return {Sound}
   */
  find(urls) {
    urls = makeArray(urls);
    let cache = this._cache;
    let keysToSearch = emberArray(urls).map(url => (url.url || url));
    let sounds       = emberArray(keysToSearch).map(url => cache[url]);
    let foundSounds  = emberArray(sounds).compact();

    if (foundSounds.length > 0) {
      this.debug(`cache hit for ${foundSounds[0].url}`);
    }
    else {
      this.debug(`cache miss for ${keysToSearch.join(',')}`);
    }

    return foundSounds[0];
  }

  /**
   * remove - removes a sound from the cache
   *
   * @param {Sound} sound
   */
  remove(sound) {
    if (this.isDestroyed) return;

    this.debug(`removing sound from cache with url: ${sound.url}`);

    if (this._cache[sound.url]) {
      delete this._cache[sound.url]
      this.cachedCount = Object.keys(this._cache).length
    }
  }

  /**
   * cache - caches the sound by the url
   *
   * @param  {Sound} sound
   */
  cache(sound) {
    if (this.isDestroyed) return;

    this.debug(`caching sound with url: ${sound.url}`);

    if (!this._cache[sound.url]) {
      this._cache[sound.url] = sound;
      this.cachedCount = Object.keys(this._cache).length;
    }
  }

  debug(message) {
    const log = debug(this.debugName);
    log(message);
  }
}
