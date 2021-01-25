
export default function urlToIdentifier(url) {
  let parser1 = document.createElement('a');
  parser1.href = url;

  return parser1.href;
}
