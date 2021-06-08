
export default function urlToIdentifier(url) {
  if (url && url.url) {
    url = url.url;
  }

  let parser1 = document.createElement('a');
  parser1.href = url;

  return parser1.origin + parser1.pathname; // don't use search string as part of the identifer
}
