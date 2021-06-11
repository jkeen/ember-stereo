import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import Sound from 'ember-stereo/stereo-connections/base';
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
  @tracked cachedSounds = [];
  @tracked _cache = {};
  name = 'ember-stereo:sound-cache'

  constructor(stereo) {
    this.stereo = stereo;
  }

  reset() {
    this._cache = {};
    this.cachedCount = 0;
    this.cachedList = [];
    this.cachedSounds = [];
  }

  /**
   * find - finds sounds in the cache by urls
   *
   * @param {string} urls
   * @return {Sound}
   */
  find(identifiers) {
    let cache = this._cache;

    let stereoUrls = makeArray(identifiers).map(identity => {
      if (identity instanceof StereoUrl) {
        return identity
      }
      else if (identity instanceof Sound) {
        return new StereoUrl(identity.url);
      }
      else if (typeof identity === 'string') {
        return new StereoUrl(identity);
      }
    })

    let sounds       = emberArray(stereoUrls).map(url => cache[url.key]);
    let foundSounds  = emberArray(sounds).compact();

    if (foundSounds.length > 0) {
      debug(this.name)(`cache hit for ${foundSounds[0].url}`);
    }
    else {
      debug(this.name)(`cache miss for ${stereoUrls.map(u => u.url).join(',')}`);
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
    let identifier = new StereoUrl(sound.url).key

    debug(this.name)(`removing sound from cache with url: ${sound.url}`);
    if (this._cache[identifier]) {
      delete this._cache[identifier];
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
    let identifier = new StereoUrl(sound.url).key

    debug(this.name)(`caching sound with url: ${identifier}`);

    if (!this._cache[identifier]) {
      this._cache[identifier] = sound;
      this.cachedCount = Object.keys(this._cache).length;
      this.cachedList = Object.keys(this._cache);
      this.cachedSounds = Object.values(this._cache);
    }
  }
}
