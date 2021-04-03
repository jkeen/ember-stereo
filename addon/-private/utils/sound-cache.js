import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import urlToIdentifier from 'ember-hifi/-private/utils/url-to-identifier';
/**
* This class caches sound objects based on urls. You shouldn't have to interact with this class.
*
* @class sound-cache
* @private
* @constructor
*/

export default class SoundCache {
  @tracked cachedCount = 0;
  @tracked cachedList = [];
  @tracked _cache = {};

  constructor(name = 'hifi-cache') {
    this.name = name;
  }

  reset() {
    this._cache = {};
    this.cachedCount = 0;
    this.cachedList = [];
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
    let keysToSearch = emberArray(urls).map(url => urlToIdentifier((url.url || url)));
    let sounds       = emberArray(keysToSearch).map(url => cache[url]);
    let foundSounds  = emberArray(sounds).compact();

    if (foundSounds.length > 0) {
      debug(this.name)(`cache hit for ${foundSounds[0].url}`);
    }
    else {
      debug(this.name)(`cache miss for ${keysToSearch.join(',')}`);
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

    debug(this.name)(`removing sound from cache with url: ${sound.url}`);

    if (this._cache[sound.url]) {
      delete this._cache[sound.url];
      this.cachedCount = Object.keys(this._cache).length
      this.cachedList = Object.keys(this._cache);
    }
  }

  /**
   * cache - caches the sound by the url
   *
   * @param  {Sound} sound
   */
  cache(sound) {
    if (this.isDestroyed) return;
    let identifier = urlToIdentifier(sound.url)

    debug(this.name)(`caching sound with url: ${identifier}`);

    if (!this._cache[identifier]) {
      this._cache[identifier] = sound;
      this.cachedCount = Object.keys(this._cache).length;
      this.cachedList = Object.keys(this._cache);
    }
  }
}
