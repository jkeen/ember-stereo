import { module, test } from 'qunit';
import Strategy from 'ember-stereo/-private/utils/strategy';
import NativeAudio from 'ember-stereo/stereo-connections/native-audio';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import sinon from 'sinon';

let sandbox;

module('Unit | Utility | strategy', function(hooks) {
  hooks.beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  hooks.afterEach(function () {
    sandbox.restore();
  })
  test("strategy can be created", function(assert) {
    let url = new StereoUrl('/test/1.mp3')
    let strategy = new Strategy(NativeAudio, url)

    assert.equal(strategy.key, "NativeAudio")
    assert.equal(strategy.name, "Native Audio")
    assert.equal(strategy.url, url.href)
    assert.equal(strategy.mimeType, 'audio/mpeg')
  });

  test('calling canPlay on strategy calls canPlay on the connection', function(assert) {
    let canPlaySpy = sandbox.spy(NativeAudio, 'canPlay')
    let canPlayMimeTypeSpy = sandbox.spy(NativeAudio, 'canPlayMimeType')

    let strategy = new Strategy(NativeAudio, new StereoUrl('/test/1.mp3'))
    strategy.canPlay

    assert.equal(canPlaySpy.callCount, 1);
    assert.equal(canPlayMimeTypeSpy.callCount, 1);
  })
});




