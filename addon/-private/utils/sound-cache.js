import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import BaseSound from 'ember-stereo/stereo-connections/base';
import hasEqualUrls from './has-equal-urls';

/**
* This class caches sound objects based on urls.
* @private
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
   * @method find
   * @param {String} identifiers
   * @return {Sound}
   */
  find(identifiers) {
    let cache = this._cache;

    let stereoUrls   = makeArray(identifiers).map(identity => new StereoUrl(identity))

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
   * @method remove
   * @param {Sound} sound
   */
  remove(identifier) {
    if (this.isDestroyed) return;
    if (identifier instanceof BaseSound) {
      identifier = identifier.url
    }

    let url = Object.keys(this._cache).find(key => hasEqualUrls(key, identifier))

    debug(this.name)(`removing sound from cache with url: ${identifier}`);
    if (this._cache[url]) {
      delete this._cache[url];
      this.cachedCount = Object.keys(this._cache).length
      this.cachedList = Object.keys(this._cache);
      this.cachedSounds = Object.values(this._cache);
    }
  }

  /**
   * cache - caches the sound by the url
   * @method cache
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
