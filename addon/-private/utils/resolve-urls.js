import { A as emberArray, makeArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import debug from 'debug';

/**
 * URLs given to load or play may be a promise, resolve this promise and get the urls
 * or promisify an array/string and
 * @method resolveUrls
 * @param {Array or String or Promise} urlOrPromise
 * @private
 * @return {Promise.<urls>} a promise resolving to a cleaned up array of URLS
 */

function prepare(urls) {
  return emberArray(makeArray(urls)).uniq().reject((i) => isEmpty(i));
}

function resolveFunction(urlsOrPromise) {
  if (typeof urlsOrPromise === 'function' && !urlsOrPromise.then) {
    return urlsOrPromise();
  }
  else {
    return urlsOrPromise;
  }
}

export default async function resolveUrls(urlsOrPromise) {
  let urls = prepare(await Promise.resolve(resolveFunction(urlsOrPromise)));
  debug('ember-stereo')(`given urls: ${urls.join(', ')}`);
  return urls;
}
