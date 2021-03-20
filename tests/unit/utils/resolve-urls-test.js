import resolveUrls from 'dummy/utils/resolve-urls';
import { module, test } from 'qunit';

module('Unit | Utility | resolve-urls', function() {
  test('it resolves a promise', async function(assert) {
    let p = new Promise((resolve) => {
      return resolve('/good/url.mp3');
    });

    let result = await resolveUrls(p);
    assert.deepEqual(result, ['/good/url.mp3']);
  });

  test('it resolves a function', async function(assert) {
    let result = await resolveUrls((() => ['/good/url.mp3']));
    assert.deepEqual(result, ['/good/url.mp3']);
  })

  test('it resolves a strings', async function(assert) {
    let result = await resolveUrls((() => ['/good/url.mp3']));
    assert.deepEqual(result, ['/good/url.mp3']);
  })

});
