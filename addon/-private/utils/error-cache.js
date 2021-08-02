import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';

/**
* This class caches errors based on urls. You shouldn't have to interact with this class.
*
* @class ErrorCache
* @type {Util}
* @private
* @constructor
*/

export default class ErrorCache  {
  @tracked cachedCount = 0;
  @tracked cachedErrors = [];
  @tracked cachedList = []
  @tracked _cache = {};
  name = 'ember-stereo:error-cache'

  constructor(stereo) {
    this.stereo = stereo;
  }

  reset() {
    this._cache = {};
    this.cachedCount = 0;
    this.cachedList = [];
    this.cachedErrors = [];
  }

  /**
   * find - finds sounds in the cache by urls
   * @method find
   * @param {string} urls
   * @return {Sound}
   */
  find(urls) {
    let identifiers  = makeArray(urls).map(i => new StereoUrl(i));
    let errors       = emberArray(identifiers).map(identity => this.cachedErrors.find(err => hasEqualUrls(err.url, identity)));
    let foundErrors  = emberArray(errors).compact();

    if (foundErrors.length > 0) {
      debug(this.name)(`cache hit for ${foundErrors[0].url}`);
      return foundErrors[0];
    }
    else {
      debug(this.name)(`cache miss for ${makeArray(identifiers).join(',')}`);
    }
  }

  remove(urls) {
    let identifiers = makeArray(urls).map(i => new StereoUrl(i));
    this.cachedErrors = this.cachedErrors.filter(err => !hasEqualUrls(err.url, identifiers));

    identifiers.forEach(identity => {
      delete this._cache[identity];
    })
  }

  cache({url, error, connectionKey, debugInfo}) {
    let identifier = new StereoUrl(url).key

    if (!this._cache[identifier]) {
      this._cache[identifier] = {}
    }

    let errorObject = this._cache[identifier];
    errorObject.url = url;

    if (!errorObject.errors) {
      errorObject.errors = {}
    }

    if (!connectionKey) {
      errorObject.errors.generic = error;
    }
    else {
      errorObject.errors[connectionKey] = error;
    }
    errorObject._debug = debugInfo;
    this._cache[identifier] = errorObject;

    this.cachedCount = Object.keys(this._cache).length;
    this.cachedList = Object.keys(this._cache);
    this.cachedErrors = Object.values(this._cache);
  }
}
