import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import { module, test } from 'qunit';

module('Unit | Utility | has-equal-identifiers', function() {
  test('it works', async function(assert) {
    let result = await hasEqualIdentifiers([{url: '/good/url.mp3'}], '/good/url.mp3');
    assert.equal(result, true);

    result = await hasEqualIdentifiers([{url: '/good/url.mp3'}, {url: '/good/foo.mp3'}], '/good/url.mp3');
    assert.equal(result, true);

    result = await hasEqualIdentifiers([{url: '/good/url2.mp3'}, {url: '/good/foo.mp3'}], '/good/url.mp3');
    assert.equal(result, false);
  });

  test('it fails if anything is empty', async function(assert) {
    let result = await hasEqualIdentifiers([], '/good/url.mp3');
    assert.equal(result, false);

    result = await hasEqualIdentifiers([{url: '/good/url.mp3'}, {url: '/good/foo.mp3'}], undefined);
    assert.equal(result, false);

    result = await hasEqualIdentifiers([{url: '/good/url2.mp3'}, {url: '/good/foo.mp3'}], []);
    assert.equal(result, false);
  });
});
