import { _ as _applyDecoratedDescriptor, b as _defineProperty, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from '../-private/utils/has-equal-urls.js';
import { inject } from '@ember/service';

var _class, _descriptor, _descriptor2;

/**
  A helper to detect if a sound is errored.
  ```hbs
    {{#if (sound-is-errored @identifier)}}
      <p>This sound is errored</p>
    {{else}}
      <p>This sound is not errored</p>
    {{/if}}
  ```

  @class {{sound-is-errored}}
  @type {Helper}
  @param {String} url
*/

const UNINITIALIZED = Object.freeze({});

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {String} format time, ms, s,
  @param {Boolean} load load the sound if it's not loaded?
*/
let SoundIsErrored = (_class = class SoundIsErrored extends Helper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-errored');
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _initializerDefineProperty(this, "result", _descriptor2, this);
    _defineProperty(this, "identifier", UNINITIALIZED);
  }
  compute([identifier = 'system'], {
    connectionName
  }) {
    let errors = this.stereo.cachedErrors.filter(async e => hasEqualUrls(e.url, identifier));
    if (connectionName) {
      return errors.filter(e => e.connectionName === connectionName).length > 0;
    } else {
      return errors.length > 0;
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "result", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class);

export { SoundIsErrored as default };
//# sourceMappingURL=sound-is-errored.js.map
