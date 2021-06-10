import StereoUrl from 'ember-stereo/-private/utils/stereo-url';

export default function equalUrls(context, arg1, arg2) {
  // use this.pushResult to add the assertion.
  // see: https://api.qunitjs.com/assert/pushResult for more information

  let actual = new StereoUrl(arg1).href;
  let expected = new StereoUrl(arg2).href

  let result = expected === actual

  this.pushResult({ result, actual, expected });
}
