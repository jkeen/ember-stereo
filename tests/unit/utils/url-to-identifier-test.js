import urlToIdentifier from 'dummy/utils/url-to-identifier';
import { module, test } from 'qunit';

module('Unit | Utility | url-to-identifier', function() {

  test('it works', function(assert) {
    let result = urlToIdentifier('/relative/url');

    let expected = `${window.location.origin}/relative/url`
    assert.equal(expected, result);
  });
});
