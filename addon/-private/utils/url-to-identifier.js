export default function urlToIdentifier(url) {
  if (url && url.url) {
    url = url.url;
  }

  let parser1 = document.createElement('a');
  parser1.href = url;

  return parser1.origin + parser1.pathname; // don't use search string as part of the identifer
}


export class Identifier {
  el = document.createElement('a')

  constructor(input) {
    if (input && input.url) {
      this.el.href = input.url
    }
    else {
      this.el.href = input;
    }
  }

  get id() {
    return `${this.el.origin}${this.el.pathname}`
  }

  get toString() {
    return this.el.href;
  }
}
