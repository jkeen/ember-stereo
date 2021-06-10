import { assert, module, test } from 'qunit';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';

module('Unit | Utility | stereo-url', function() {
  test('it calculates absolute url', function (assert) {
    let stereoUrl = new StereoUrl('/good/url')
    let a = document.createElement('a');
    a.href = '/good/url';
    assert.equal(stereoUrl.href, a.href)
  })

  test('it can detect mime type', function (assert) {
    let stereoUrl = new StereoUrl('/url.mp3')
    assert.equal(stereoUrl.mimeType, 'audio/mpeg');
  });

  test('it keys without query strings and protocols', function(assert) {
    let stereoUrl = new StereoUrl('http://example.com/url.mp3?access_key=125125125&t=12125')
    assert.equal(stereoUrl.key, 'http://example.com/url.mp3')
  })

  test('it can have mime type provided', function () {
    let stereoUrl = new StereoUrl('/url', { mimeType: 'audio/mpeg' })
    assert.equal(stereoUrl.mimeType, 'audio/mpeg');
  })
});
