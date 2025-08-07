import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import resolveUrls from './resolve-urls.js';
import ObjectCache from './object-cache.js';

/**
* This class caches url resolutions.
  @private
  @class UrlCache
*/

class UrlCache extends ObjectCache {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'ember-stereo:url-cache');
  }
  /**
   * Caches promise resolutions to urls, or just resolves the urls
   * @method resolve
   * @param {Any} identifier
   * @return {Sound}
   */

  async resolve(identifier) {
    if (this.has(identifier)) {
      return this.find(identifier);
    } // success! we didn't unnecessarily resolve the promise again

    let stereoUrls = await resolveUrls(identifier);
    this.store(identifier, stereoUrls);
    return stereoUrls;
  }
}

export { UrlCache as default };
//# sourceMappingURL=url-cache.js.map
