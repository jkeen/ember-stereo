import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { makeArray, A } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import Sound from '../../stereo-connections/base.js';
import hasEqualUrls from './has-equal-urls.js';
import normalizeIdentifier from './normalize-identifier.js';
import { inject } from '@ember/service';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

/**
 * This class caches sound objects based on urls.
 * @private
 * @class SoundCaches
 */
let SoundCache = (_class = class SoundCache {
  constructor() {
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _initializerDefineProperty(this, "cachedCount", _descriptor2, this);
    _initializerDefineProperty(this, "cachedList", _descriptor3, this);
    _initializerDefineProperty(this, "cachedSounds", _descriptor4, this);
    _initializerDefineProperty(this, "_cache", _descriptor5, this);
    _defineProperty(this, "name", 'ember-stereo:sound-cache');
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
  find(_identifiers) {
    let cache = this._cache;
    _identifiers = makeArray(_identifiers);
    let identifiers = _identifiers.map(identity => normalizeIdentifier(identity));
    let sounds = A(identifiers).map(url => cache[url]);
    let foundSounds = A(sounds).compact();
    if (foundSounds.length > 0) ; else {
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
    if (_identifier instanceof Sound) {
      identifier = _identifier.url;
    } else {
      identifier = normalizeIdentifier(_identifier);
    }
    let url = Object.keys(this._cache).find(key => hasEqualUrls(key, identifier));
    debug(this.name)(`removing sound from cache with url: ${identifier}`);
    if (this._cache[url]) {
      delete this._cache[url];
      this.cachedCount = Object.keys(this._cache).length;
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "cachedCount", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "cachedList", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new TrackedArray();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "cachedSounds", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new TrackedArray();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "_cache", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new TrackedObject();
  }
})), _class);

export { SoundCache as default };
//# sourceMappingURL=sound-cache.js.map
