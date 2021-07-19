import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';

/**
* This class caches errors based on urls. You shouldn't have to interact with this class.
*
* @class Errorcache
* @private
* @constructor
*/

export default class ErrorCache  {
  @tracked cachedCount = 0;
  @tracked _cache = {};
  name = 'ember-stereo:error-cache'

  constructor(stereo) {
    this.stereo = stereo;
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
    let cache        = this._cache;
    let identifiers  = makeArray(urls).map(i => new StereoUrl(i));
    let errors       = emberArray(identifiers).map(identity => cache[identity.key]);
    let foundErrors  = emberArray(errors).compact();

    if (foundErrors.length > 0) {
      debug(this.name)(`cache hit for ${foundErrors[0].url}`);
      return foundErrors;
    }
    else {
      debug(this.name)(`cache miss for ${makeArray(identifiers).join(',')}`);
    }
  }

  /**
   * cache - caches the errors on connection/url
   *
   * @param  {Sound} sound
   */
  cache({url, error, connectionKey}) {
    let identifier = new StereoUrl(url)
    if (!this._cache[identifier.key]) {
      this._cache[identifier.key] = {}
    }
    this._cache[identifier.key][connectionKey] = error
  }
}
