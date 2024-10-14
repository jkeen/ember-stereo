import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { inject } from '@ember/service';
import Helper from '@ember/component/helper';
import prepareOptions from '../-private/utils/prepare-options.js';
import { didCancel } from 'ember-concurrency';

var _class, _descriptor;
/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (load-sound @identifier}}>
      Load
    </button>
  ```
  @class {{load-sound}}
  @type {Helper}
  */
let LoadSound = (_class = class LoadSound extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  /**
    @method compute
    @param {Any} identifier url, urls, url objects, promise that resolves to a url
    @param {Hash} metadata? metadata that should be included with the sound
    @param {[String]} useConnections? array of connection names in preference order
    @param {[String]} xhr? hash of xhr options: { method: 'POST', headers: { Authorization: 'Bearer 1234'}, withCredentials: true }
    @return {Function}
  */

  compute([urls], options = {}) {
    options = prepareOptions(options);
    return () => {
      try {
        return this.stereo.load(urls, options).then(result => result.sound);
      } catch (e) {
        if (!didCancel(e)) {
          throw e;
        }
      }
    };
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { LoadSound as default };
//# sourceMappingURL=load-sound.js.map
