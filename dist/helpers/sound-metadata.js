import { _ as _applyDecoratedDescriptor, b as _defineProperty, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { inject } from '@ember/service';

var _class, _descriptor;

/**
  A helper to detect if a sound is playing.
  ```hbs
  {{sound-metadata (current-sound)}} // currently loaded sound metadata hash
  {{sound-metadata @identifier key=title}} // metadata 'title' on sound matching @identifier
  ```

  @class {{sound-metadata}}
  @type {Helper}
  @param {String} url
  @return {Object}
*/
let SoundMetadata = (_class = class SoundMetadata extends Helper {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "name", 'sound-metadata');
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  /**
    @method compute
    @param {Any} identifier url, urls, url objects, promise that resolves to a url
    @param {String} key? name of the key to fetch
    @return {Any}
  */

  compute([identifier], {
    key
  }) {
    let metadata = this.stereo.metadataCache.find(identifier);
    if (key && metadata && get(metadata, key)) {
      return get(metadata, key);
    } else if (!key && metadata) {
      return metadata;
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { SoundMetadata as default };
//# sourceMappingURL=sound-metadata.js.map
