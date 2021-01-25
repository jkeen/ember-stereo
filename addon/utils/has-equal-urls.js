import urlToIdentifier from 'ember-hifi/utils/url-to-identifier';

export default function hasEqualUrls(url1, url2) {
  return (urlToIdentifier(url1) === urlToIdentifier(url2));
}
