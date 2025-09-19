import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-fbb42d30.js';
import { inject } from '@ember/service';
import Helper from '@ember/component/helper';

var _class, _descriptor;

/**
  A helper to get the currently playing/paused sound.
  ```hbs
   {{current-sound}}

   {{#if (sound-is-playing (current-sound))}}
     Something in this app is playing!
   {{/if}}
   ```

  @class {{current-sound}}
  @type {Helper}
*/

/**
  @method compute
  @return {Sound} returns current sound
*/
let currentSound = (_class = class currentSound extends Helper {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "stereo", _descriptor, this);
  }
  compute() {
    return this.stereo.currentSound;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereo", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

export { currentSound as default };
//# sourceMappingURL=current-sound.js.map
