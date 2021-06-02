import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import { module, test } from 'qunit';

module('Unit | Utility | has-equal-urls', function() {
  test('it works', async function(assert) {
    let result = await hasEqualUrls([{url: '/good/url.mp3'}], '/good/url.mp3');
    assert.equal(result, true);

    result = await hasEqualUrls([{url: '/good/url.mp3'}, {url: '/good/foo.mp3'}], '/good/url.mp3');
    assert.equal(result, true);

    result = await hasEqualUrls([{url: '/good/url2.mp3'}, {url: '/good/foo.mp3'}], '/good/url.mp3');
    assert.equal(result, false);
  });

  test('it fails if anything is empty', async function(assert) {
    let result = await hasEqualUrls([], '/good/url.mp3');
    assert.equal(result, false);

    result = await hasEqualUrls([{url: '/good/url.mp3'}, {url: '/good/foo.mp3'}], undefined);
    assert.equal(result, false);

    result = await hasEqualUrls([{url: '/good/url2.mp3'}, {url: '/good/foo.mp3'}], []);
    assert.equal(result, false);
  });
});
