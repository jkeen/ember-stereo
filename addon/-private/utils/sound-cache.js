import { A as emberArray, makeArray } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import BaseSound from 'ember-stereo/stereo-connections/base';
import hasEqualUrls from './has-equal-urls';
import normalizeIdentifier from './normalize-identifier';
import { inject as service } from '@ember/service';
import {
  TrackedObject,
  TrackedWeakMap,
  TrackedArray,
} from 'tracked-built-ins';

/**
 *
/**
* This class caches sound objects based on urls.
* @private
*/

export default class SoundCache {
  @service stereo;

  @tracked cachedCount = 0;
  @tracked cachedList = new TrackedArray();
  @tracked cachedSounds = new TrackedArray();
  @tracked _cache = new TrackedObject();
  name = 'ember-stereo:sound-cache'

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
  find(_identifiers) {
    let cache = this._cache;
    _identifiers = makeArray(_identifiers);
    let identifiers = _identifiers.map(identity => normalizeIdentifier(identity))
    let sounds = emberArray(identifiers).map(url => cache[url]);
    let foundSounds  = emberArray(sounds).compact();

    if (foundSounds.length > 0) {
      debug(this.name)(`cache hit for `, foundSounds[0].url);
    }
    else {
      debug(this.name)(`cache miss for`, identifiers);
    }

    return foundSounds[0];
  }

  /**
   * remove - removes a sound from the cache
   *
   * @method remove
   * @param {Sound} sound
   */
  remove(_identifier) {
    let identifier;

    if (this.isDestroyed) return;
    if (_identifier instanceof BaseSound) {
      identifier = _identifier.url
    } else {
      identifier = normalizeIdentifier(_identifier);
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
    let identifier = normalizeIdentifier(sound.url);

    debug(this.name)(`caching sound with url: ${identifier}`);

    if (!this._cache[identifier]) {
      this._cache[identifier] = sound;
      this.cachedCount = Object.keys(this._cache).length;
      this.cachedList = Object.keys(this._cache);
      this.cachedSounds = Object.values(this._cache);
    }
  }
}
