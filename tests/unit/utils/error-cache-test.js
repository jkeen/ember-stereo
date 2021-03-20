import ErrorCache from 'dummy/utils/error-cache';
import { module, test } from 'qunit';

module('Unit | Utility | error-cache', function() {
  test('it works', function(assert) {
    let errorCache = new ErrorCache();
    errorCache.cache({url: '/what/sound.mp3', error: 'errorsville', connectionKey: 'DummyConnection'})
    let error = errorCache.find('/what/sound.mp3')[0]
    assert.equal(error['DummyConnection'], 'errorsville');
  });
});
