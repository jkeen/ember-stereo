import { _ as _applyDecoratedDescriptor, b as _defineProperty, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import { inject } from '@ember/service';
import debugMessage from '../-private/utils/debug-message.js';
import hasEqualUrls from '../-private/utils/has-equal-urls.js';

var _class, _descriptor, _descriptor2;

/**
  A helper to display error details.
  ```hbs
  {{sound-error-details @identifier}}

  {{sound-error-details @identifier connectionName="NativeAudio"}} // only display errors from native audio
  ```

  @class {{sound-error-details}}
  @type {Helper}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @param {String} connectionName? name of connection's errors to get
  @return {any}
*/

const UNINITIALIZED = null;
let SoundIsErrored = (_class = class SoundIsErrored extends Helper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-is-errored');
    _initializerDefineProperty(this, "stereo", _descriptor, this);
    _defineProperty(this, "identifier", UNINITIALIZED);
    _initializerDefineProperty(this, "url", _descriptor2, this);
  }
  get result() {
    return this.stereo.cachedErrors.find(e => hasEqualUrls(e.url, this.url));
  }
  compute([identifier], {
    connectionName
  }) {
    if (identifier !== this.identifier) {
      this.identifier = identifier;
      this.stereo.resolveIdentifierTask.perform(this.identifier).then(url => this.url = url).catch();
    }
    if (!this.result) {
      return;
    }
    var errObject = this.result;
    if (connectionName) {
      debugMessage(this, `render = ${errObject.errors[connectionName]}`);
      return errObject.errors[connectionName];
    } else {
      let errors = [];
      this.stereo.connectionNames.forEach(name => {
        if (errObject.errors[name]) {
          errors.push(errObject.errors[name]);
        }
      });
      return errors[0] || errObject.errors.generic;
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "url", [dedupeTracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { SoundIsErrored as default };
//# sourceMappingURL=sound-error-details.js.map
