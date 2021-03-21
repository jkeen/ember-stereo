import urlToIdentifier from 'ember-hifi/-private/utils/url-to-identifier';
import resolveUrls from 'ember-hifi/-private/utils/resolve-urls';
import { makeArray } from '@ember/array';

export default async function hasEqualUrls(urlOrPromise1, urlOrPromise2) {
  let urls1 = await resolveUrls(urlOrPromise1)
  let urls2 = await resolveUrls(urlOrPromise2)

  urls1 = makeArray(urls1).map(urlToIdentifier);
  urls2 = makeArray(urls2).map(urlToIdentifier);

  return urls1.filter((x) => urls2.includes(x)).length > 0;
}
