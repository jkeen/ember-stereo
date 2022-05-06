import { A as emberArray, makeArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

import StereoUrl from './stereo-url';

/**
 * URLs given to load or play may be a promise, resolve this promise and get the urls
 * or promisify an array/string and return a promise resolving to a cleaned up array of URLS
 * @method resolveUrls
 * @param {Array or String or Promise} urlOrPromise
 * @private
 * @return {Promise.<urls>}
 */

function prepare(urls) {
  return emberArray(makeArray(urls))
    .uniq()
    .reject((i) => isEmpty(i));
}

function resolveFunction(urlsOrPromise) {
  if (typeof urlsOrPromise === 'function' && !urlsOrPromise.then) {
    return urlsOrPromise();
  } else {
    return urlsOrPromise;
  }
}

export default async function resolveUrls(urlsOrPromise) {
  let resolved = await Promise.resolve(resolveFunction(urlsOrPromise));
  let rawUrls = prepare(resolved);
  let resolvedUrls = rawUrls.map((u) => new StereoUrl(u)); // keep custom mime type in there if provided

  return resolvedUrls;
}
