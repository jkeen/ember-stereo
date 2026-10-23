import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import { getMimeType } from './mime-types.js';
import { tracked } from '@glimmer/tracking';
import { isArray } from '@ember/array';

var _class, _descriptor;

// Resolves relative urls without the DOM, since FastBoot has no document.

// FastBoot's sandbox binds the global URL to node's `url` module, which shadows the WHATWG constructor
// but re-exports it as URL.URL.
const WhatwgURL = URL.URL ?? URL;
function parseUrl(url) {
  let base = typeof document !== 'undefined' ? document.baseURI : 'http://localhost/';
  return new WhatwgURL(url, base);
}
let StereoUrl = (_class = class StereoUrl {
  constructor(input, options = {}) {
    _initializerDefineProperty(this, "options", _descriptor, this);
    _defineProperty(this, "parsed", null);
    if (!input) {
      throw new Error("can't create URL without any input");
    }
    if (input) {
      if (isArray(input)) {
        input = input[0];
      }
      this.input = input;
      if (input.url) {
        this.parsed = parseUrl(input.url);
      } else if (typeof input === 'string') {
        this.parsed = parseUrl(input);
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
    return `${this.parsed?.origin ?? ''}${this.parsed?.pathname ?? ''}`;
  }
  get href() {
    return this.parsed?.href ?? '';
  }
  set href(u) {
    this.parsed = parseUrl(u);
  }
  get pathname() {
    return this.parsed?.pathname ?? '';
  }
  get url() {
    return this.parsed?.href ?? '';
  }
  set url(u) {
    this.parsed = parseUrl(u);
  }
  toString() {
    return this.parsed?.href ?? '';
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "options", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _class);

export { StereoUrl as default };
//# sourceMappingURL=stereo-url.js.map
