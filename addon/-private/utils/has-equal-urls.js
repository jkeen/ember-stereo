import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import { makeArray } from '@ember/array';

export default function hasEqualUrls(urls1, urls2) {
  urls1 = makeArray(urls1).map(i => new StereoUrl(i));
  urls2 = makeArray(urls2).map(i => new StereoUrl(i));

  return urls1.filter((x) => urls2.map(d => d.key).includes(x.key)).length > 0;
}
