import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import resolveUrls from 'ember-stereo/-private/utils/resolve-urls';
import { makeArray } from '@ember/array';

export default async function hasEqualUrls(urlOrPromise1, urlOrPromise2) {
  let urls1 = await resolveUrls(urlOrPromise1)
  let urls2 = await resolveUrls(urlOrPromise2)

  urls1 = makeArray(urls1).map(i => new StereoUrl(i));
  urls2 = makeArray(urls2).map(i => new StereoUrl(i));

  return urls1.filter((x) => urls2.map(d => d.key).includes(x.key)).length > 0;
}
