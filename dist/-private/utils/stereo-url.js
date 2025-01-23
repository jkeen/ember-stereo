import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { getMimeType } from './mime-types.js';
import { tracked } from '@glimmer/tracking';
import { isArray } from '@ember/array';

var _class, _descriptor;
let StereoUrl = (_class = class StereoUrl {
  constructor(input, options = {}) {
    _initializerDefineProperty(this, "options", _descriptor, this);
    this.el = document.createElement('a');
    if (!input) {
      throw new Error("can't create URL without any input");
    }
    if (input) {
      if (isArray(input)) {
        input = input[0];
      }
      this.input = input;
      if (input.url) {
        this.el.href = input.url;
      } else if (typeof input === 'string') {
        this.el.href = input;
      }
      if (input.mimeType) {
        this.options = {
          mimeType: input.mimeType
        };
      } else if (options.mimeType) {
        this.options = {
          mimeType: options.mimeType
        };
      }
    }
  }
  get mimeType() {
    if (this.options.mimeType) {
      return this.options.mimeType;
    } else {
      return getMimeType(this.url);
    }
  }

  // this is the key used for comparisons
  get key() {
    return `${this.el.origin}${this.el.pathname}`;
  }
  get href() {
    return this.el.href;
  }
  set href(u) {
    this.el.href = u;
  }
  get pathname() {
    return this.el.pathname;
  }
  get url() {
    return this.el.href;
  }
  set url(u) {
    this.el.href = u;
  }
  toString() {
    return this.el.href;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "options", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
})), _class);

export { StereoUrl as default };
//# sourceMappingURL=stereo-url.js.map
