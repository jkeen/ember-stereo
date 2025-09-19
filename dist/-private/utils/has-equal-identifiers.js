import hasEqualUrls from './has-equal-urls.js';
import resolveUrls from './resolve-urls.js';

async function hasEqualIdentifiers(urlOrPromise1, urlOrPromise2) {
  let urls1 = await resolveUrls(urlOrPromise1);
  let urls2 = await resolveUrls(urlOrPromise2);
  return hasEqualUrls(urls1, urls2);
}

export { hasEqualIdentifiers as default };
//# sourceMappingURL=has-equal-identifiers.js.map
