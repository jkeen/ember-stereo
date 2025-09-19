import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { inject } from '@ember/service';
import Helper from '@ember/component/helper';

var _class, _descriptor;

/**
  A helper to get whether or not autoplay is allowed on the webpage.
  ```hbs
   {{#if (autoplay-allowed)}}
      Autoplay is allowed
   {{/if}}
   ```
  @class {{autoplay-allowed}}
  @type {Helper}
  @return {Boolean}
*/

/**
  @method compute
  @param {Any} identifier url, urls, url objects, promise that resolves to a url
  @return {Boolean}
*/
let autoPlayAllowed = (_class = class autoPlayAllowed extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    return this.stereo.autoPlayAllowed;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { autoPlayAllowed as default };
//# sourceMappingURL=autoplay-allowed.js.map
