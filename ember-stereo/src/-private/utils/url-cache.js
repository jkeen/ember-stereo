import resolveUrls from './resolve-urls';
import ObjectCache from './object-cache';

/**
* This class caches url resolutions.
  @private
  @class UrlCache
*/

export default class UrlCache extends ObjectCache {
  name = 'ember-stereo:url-cache';

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
