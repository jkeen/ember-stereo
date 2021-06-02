import { module, test } from 'qunit';
import Strategy from 'ember-stereo/-private/utils/strategy';
import NativeAudio from 'ember-stereo/stereo-connections/native-audio';

module('Unit | Utility | strategy', function() {
  test("strategy can be created", function(assert) {
    let strategy = new Strategy(NativeAudio, '/test/1')

    assert.equal(strategy.key, "NativeAudio")
    assert.equal(strategy.name, "Native Audio")
    assert.equal(strategy.url, '/test/1')
  });
});




