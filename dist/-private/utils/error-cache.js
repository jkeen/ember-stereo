import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { makeArray, A } from '@ember/array';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import hasEqualUrls from './has-equal-urls.js';
import normalizeIdentifier from './normalize-identifier.js';
import { inject } from '@ember/service';

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

/**
 * This class caches errors based on urls.
 * @private
 * @class ErrorCache
 */
let ErrorCache = (_class = class ErrorCache {
  constructor() {
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _initializerDefineProperty(this, "cachedCount", _descriptor2, this);
    _initializerDefineProperty(this, "cachedErrors", _descriptor3, this);
    _initializerDefineProperty(this, "cachedList", _descriptor4, this);
    _initializerDefineProperty(this, "_cache", _descriptor5, this);
    _defineProperty(this, "name", 'ember-stereo:error-cache');
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
    let identifiers = makeArray(urls).map(i => normalizeIdentifier(i));
    let errors = A(identifiers).map(identity => this.cachedErrors.find(err => hasEqualUrls(err.url, identity)));
    let foundErrors = A(errors).compact();
    if (foundErrors.length > 0) {
      debug(this.name)(`cache hit for ${foundErrors[0].url}`);
      return foundErrors[0];
    } else {
      debug(this.name)(`cache miss for ${makeArray(identifiers).join(',')}`);
    }
  }
  remove(urls) {
    let identifiers = makeArray(urls).map(i => normalizeIdentifier(i));
    this.cachedErrors = this.cachedErrors.filter(err => !hasEqualUrls(err.url, identifiers));
    identifiers.forEach(identity => {
      delete this._cache[identity];
    });
  }
  cache({
    url,
    error,
    connectionKey,
    debugInfo
  }) {
    let identifier = normalizeIdentifier(url);
    if (!this._cache[identifier]) {
      this._cache[identifier] = {};
    }
    let errorObject = this._cache[identifier];
    errorObject.url = url;
    if (!errorObject.errors) {
      errorObject.errors = {};
    }
    if (!connectionKey) {
      errorObject.errors.generic = error;
    } else {
      errorObject.errors[connectionKey] = error;
    }
    if (debugInfo) {
      errorObject._debug = debugInfo;
    }
    this._cache[identifier] = errorObject;
    this.cachedCount = Object.keys(this._cache).length;
    this.cachedList = Object.keys(this._cache);
    this.cachedErrors = Object.values(this._cache);
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
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "cachedErrors", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "cachedList", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "_cache", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
})), _class);

export { ErrorCache as default };
//# sourceMappingURL=error-cache.js.map
