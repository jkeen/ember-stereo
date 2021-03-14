import urlToIdentifier from 'ember-hifi/utils/url-to-identifier';
import { makeArray } from '@ember/array';

export default async function hasEqualUrls(urlOrPromise1, urlOrPromise2) {
  let urls1 = makeArray(await Promise.resolve(urlOrPromise1)).map(
    urlToIdentifier
  );
  let urls2 = makeArray(await Promise.resolve(urlOrPromise2)).map(
    urlToIdentifier
  );

  return urls1.filter((x) => urls2.includes(x)).length > 0;
}
