import { module, test } from 'qunit';
import resolveUrls from 'ember-stereo/-private/utils/resolve-urls';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';

module('Unit | Utility | resolve-urls', function() {
  test('it resolves a promise', async function(assert) {
    let p = new Promise((resolve) => {
      return resolve('/good/url.mp3');
    });

    let result = await resolveUrls(p);
    assert.deepEqual(result, [new StereoUrl('/good/url.mp3').url]);
  });

  test('it resolves a function', async function(assert) {
    let result = await resolveUrls((() => ['/good/url.mp3']));
    assert.deepEqual(result, [new StereoUrl('/good/url.mp3').url]);
  })

  test('it resolves a function that returns a hash', async function (assert) {
    let result = await resolveUrls((() => { return { url: '/good/url', mimeType: 'audio/mpeg'}}));
    assert.deepEqual(result, [new StereoUrl('/good/url', { mimeType: 'audio/mpeg' }).url]);
  })

  test('it resolves a string', async function(assert) {
    let result = await resolveUrls((() => '/good/url.mp3'));
    assert.deepEqual(result[0], new StereoUrl('/good/url.mp3').url);
  })

});
