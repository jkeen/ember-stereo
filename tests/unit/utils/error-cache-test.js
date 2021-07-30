import ErrorCache from 'ember-stereo/-private/utils/error-cache';
import { module, test } from 'qunit';

module('Unit | Utility | error-cache', function() {
  test('it works', function(assert) {
    let errorCache = new ErrorCache();
    errorCache.cache({url: '/what/sound.mp3', error: 'errorsville', connectionKey: 'DummyConnection'})
    let errorObj = errorCache.find('/what/sound.mp3')

    assert.equal(errorObj.errors['DummyConnection'], 'errorsville');
  });
});
