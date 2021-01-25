import urlToIdentifier from 'dummy/utils/url-to-identifier';
import { module, test } from 'qunit';

module('Unit | Utility | url-to-identifier', function() {

  // TODO: Replace this with your real tests.
  test('it works', function(assert) {
    let result = urlToIdentifier('/relative/url');

    let expected = `${window.location.origin}/relative/url`
    assert.equal(expected, result);
  });
});
