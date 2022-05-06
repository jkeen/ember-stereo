import normalizeIdentifier from 'ember-stereo/-private/utils/normalize-identifier';

import { module, test } from 'qunit';

module('Unit | Utility | normalize-identifier', function () {
  test('it ignores hashes works', function (assert) {
    let result = normalizeIdentifier(
      'https://koop.org/streaming.mp3#cachebusting'
    );
    assert.strictEqual(result, 'https://koop.org/streaming.mp3');
  });

  test('it ignores query strings', function (assert) {
    let result = normalizeIdentifier(
      'https://koop.org/streaming.mp3?query=foo&bar=baz'
    );
    assert.strictEqual(result, 'https://koop.org/streaming.mp3');
  });
});
