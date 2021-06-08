import urlToIdentifier from 'ember-stereo/-private/utils/url-to-identifier';
import { module, test } from 'qunit';

module('Unit | Utility | url-to-identifier', function() {

  test('it works', function(assert) {
    let result = urlToIdentifier('/relative/url');

    let expected = `${window.location.origin}/relative/url`
    assert.equal(expected, result);
  });

  test('it does not include query strings in identifiers', function (assert) {
    let result = urlToIdentifier('/relative/url?');

    let expected = `${window.location.origin}/relative/url`
    assert.equal(expected, result);
  });
});
