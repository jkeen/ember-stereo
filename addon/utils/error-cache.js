import classic from 'ember-classic-decorator';
import Service, { inject as service } from '@ember/service';
import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import urlToIdentifier from 'ember-hifi/utils/url-to-identifier';
import deepSet from 'ember-deep-set';

/**
* This class caches sound objects based on urls. You shouldn't have to interact with this class.
*
* @class sound-cache
* @private
* @constructor
*/

@classic
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
    let cache = this._cache;
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
   * cache - caches the sound by the url
   *
   * @param  {Sound} sound
   */
  cache(urls, failures) {    
    urls = makeArray(urls);

    urls.forEach(url => {
      let identifier = urlToIdentifier(url)
      makeArray(failures).forEach(failure => {
        if (identifier == urlToIdentifier(failure.url)) {
          if (!this._cache[identifier]) {
            this._cache[identifier] = {}
          }

          this._cache[identifier][failure.connectionKey] = failure.error
        }
      })
    })

    urls.forEach(url => {
      let identifier = urlToIdentifier(url);
      this.hifi.trigger('audio-load-error', {
        url: identifier,
        errors: this._cache[identifier]
      })
    })
  }
}
