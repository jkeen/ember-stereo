import urlToIdentifier from 'ember-hifi/utils/url-to-identifier';
import resolveUrls from 'ember-hifi/utils/resolve-urls';
import { makeArray } from '@ember/array';

export default async function hasEqualUrls(urlOrPromise1, urlOrPromise2) {
  let urls1 = makeArray(await resolveUrls(urlOrPromise1)).map(
    urlToIdentifier
  );
  let urls2 = makeArray(await resolveUrls(urlOrPromise2)).map(
    urlToIdentifier
  );

  return urls1.filter((x) => urls2.includes(x)).length > 0;
}
