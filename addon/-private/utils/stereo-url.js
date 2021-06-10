import { getMimeType } from "./mime-types";


export default class StereoUrl {
  el = document.createElement('a')
  options = {}
  constructor(input, options = {}) {
    if (input) {
      if (input.then) {
        input.then(u => this.el.href = u)
      }
      else if (input.url) {
        this.el.href = input.url
      }
      else if (typeof input === 'string') {
        this.el.href = input;
      }

      if (input.mimeType) {
        this.options = { mimeType: input.mimeType }
      }
      else if (options?.mimeType) {
        this.options = { mimeType: options.mimeType }
      }
    }
  }

  get mimeType() {
    if (this.options.mimeType) {
      return this.options.mimeType;
    }
    else {
      return getMimeType(this.url)
    }
  }

  get key() {
    return `${this.el.origin}${this.el.pathname}`
  }

  get href() {
    return this.el.href
  }

  get pathname() {
    return this.el.pathname;
  }

  get url() {
    return this.el.href
  }

  toString() {
    return this.el.href;
  }
}
