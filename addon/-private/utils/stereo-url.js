import { getMimeType } from "./mime-types";
import { tracked } from '@glimmer/tracking';

export default class StereoUrl {
  @tracked el = document.createElement('a')
  @tracked options = {}
  constructor(input, options = {}) {
    if (input) {
      this.input = input;
      if (input.then) {
        Promise.resolve(input).then(res => {
          console.log(res)
          if (res.url) {
            this.el.href = res.url
          }
          else if (typeof res === 'string') {
            this.el.href = res;
          }
          if (res.mimeType) {
            this.options = { mimeType: res.mimeType }
          }
        })
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
