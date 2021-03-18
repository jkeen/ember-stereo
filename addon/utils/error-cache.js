import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import urlToIdentifier from 'ember-hifi/utils/url-to-identifier';

/**
* This class caches sound objects based on urls. You shouldn't have to interact with this class.
*
* @class sound-cache
* @private
* @constructor
*/

export default class ErrorCache  {
  @tracked cachedCount = 0;
  @tracked _cache = {};
  name = 'error-cache'

  constructor(hifi) {
    this.hifi = hifi;
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
    let cache        = this._cache;
    let keysToSearch = emberArray(urls).map(urlToIdentifier);
    let errors       = emberArray(keysToSearch).map(url => cache[url]);
    let foundErrors  = emberArray(errors).compact();

    if (foundErrors.length > 0) {
      debug(this.name)(`cache hit for ${foundErrors[0].url}`);
      return foundErrors;
    }
    else {
      debug(this.name)(`cache miss for ${keysToSearch.join(',')}`);
    }
  }

  /**
   * cache - caches the errors on connection/url
   *
   * @param  {Sound} sound
   */
  cache({url, error, connectionKey}) {    
    let identifier = urlToIdentifier(url)
    if (!this._cache[identifier]) {
      this._cache[identifier] = {}
    }
    this._cache[identifier][connectionKey] = error
  }
}
