import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import { module, test } from 'qunit';
import sinon from 'sinon';

let audioElement = document.createElement('audio');

module('Unit | Utility | shared audio element', function(hooks) {
  let sharedAudioAccess;
  hooks.beforeEach(function() {
    sharedAudioAccess = new SharedAudioAccess();
    sinon.stub(SharedAudioAccess, 'createElement').returns(audioElement);
  });

  hooks.afterEach(function() {
    SharedAudioAccess.createElement.restore();
  });

  test('it works', function(assert) {
    let result = sharedAudioAccess.unlock();
    assert.ok(result);
  });

  test('restricts access to the audio element', function(assert) {
    let foo = { debug: function() {} };
    let bar = { debug: function() {} };
    sharedAudioAccess.unlock();
    sharedAudioAccess.requestControl(foo);

    assert.ok(sharedAudioAccess.hasControl(foo), 'foo has access');
    assert.notOk(sharedAudioAccess.hasControl(bar), 'bar does not have access');
    sharedAudioAccess.releaseControl(foo);
    assert.notOk(sharedAudioAccess.hasControl(bar), 'bar does not have access until it requests it');
    sharedAudioAccess.requestControl(bar);
    assert.ok(sharedAudioAccess.hasControl(bar), 'bar now can have access');
  });

  test('only plays blank element when asked to', function(assert) {
    let playSpy = sinon.spy(audioElement, 'play');
    sharedAudioAccess.unlock();
    assert.equal(playSpy.callCount, 0, "play spy hasn't been called");
    audioElement.play.restore();
  });

  test('only plays blank element when asked to', function(assert) {
    let playSpy = sinon.spy(audioElement, 'play');
    sharedAudioAccess.unlock(true);

    assert.equal(playSpy.callCount, 1, "play spy was called");
    audioElement.play.restore();
  });
});
