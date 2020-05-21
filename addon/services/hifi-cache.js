import Service from '@ember/service';
import { A as emberArray, makeArray } from '@ember/array';
import { inject as service } from '@ember/service';

/**
* This class caches sound objects based on urls. You shouldn't have to interact with this class.
*
* @class hifi-cache
* @constructor
*/

export default Service.extend({
  debugName: 'hifi-cache',
  debugLogger: service('hifi-debug'),
  cachedCount: 0,

  init() {
    this.set('_cache', {});
    this._super(...arguments);
  },

  reset() {
    this.set('_cache', {});
  },

  /**
   * find - finds sounds in the cache by urls
   *
   * @param {string} urls
   * @return {Sound}
   */
  find(urls) {
    urls = makeArray(urls);
    let cache = this.get('_cache');
    let keysToSearch = emberArray(urls).map(url => (url.url || url));
    let sounds       = emberArray(keysToSearch).map(url => cache[url]);
    let foundSounds  = emberArray(sounds).compact();

    if (foundSounds.length > 0) {
      this.debugLogger.log('hifi-cache', `cache hit for ${foundSounds[0].get('url')}`);
    }
    else {
      this.debugLogger.log('hifi-cache', `cache miss for ${keysToSearch.join(',')}`);
    }

    return foundSounds[0];
  },

  /**
   * remove - removes a sound from the cache
   *
   * @param {Sound} sound
   */
  remove(sound) {
    if (this.isDestroyed) return;

    this.debugLogger.log('hifi-cache', `removing sound from cache with url: ${sound.get('url')}`);

    if (this._cache[sound.get('url')]) {
      delete this._cache[sound.get('url')]
      this.set('cachedCount', Object.keys(this._cache).length);
      this.notifyPropertyChange('_cache');
    }
  },

  /**
   * cache - caches the sound by the url
   *
   * @param  {Sound} sound
   */
  cache(sound) {
    if (this.isDestroyed) return;

    this.debugLogger.log('hifi-cache', `caching sound with url: ${sound.get('url')}`);

    if (!this._cache[sound.get('url')]) {
      this._cache[sound.get('url')] = sound;
      this.set('cachedCount', Object.keys(this._cache).length);
      this.notifyPropertyChange('_cache');
    }
  }
});
