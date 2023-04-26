import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Unit | Utility | shared audio element', function (hooks) {
  let sharedAudioAccess, sandbox;
  setupTest(hooks);

  setupStereoTest(hooks);
  hooks.beforeEach(function () {
    sharedAudioAccess = new SharedAudioAccess();
    sandbox = sinon.createSandbox();
  });
  hooks.afterEach(function () {
    sandbox.restore();
  });

  test('it works', function (assert) {
    let result = sharedAudioAccess.unlock();
    assert.ok(result);
  });

  test('restricts access to the audio element', function (assert) {
    let foo = { debug: function () {} };
    let bar = { debug: function () {} };
    sharedAudioAccess.unlock();
    sharedAudioAccess.requestControl(foo);

    assert.ok(sharedAudioAccess.hasControl(foo), 'foo has access');
    assert.notOk(sharedAudioAccess.hasControl(bar), 'bar does not have access');
    sharedAudioAccess.releaseControl(foo);
    assert.notOk(
      sharedAudioAccess.hasControl(bar),
      'bar does not have access until it requests it'
    );
    sharedAudioAccess.requestControl(bar);
    assert.ok(sharedAudioAccess.hasControl(bar), 'bar now can have access');
  });

  test('only plays blank element when asked to', async function (assert) {
    let playSpy = sinon.spy();
    sandbox.stub(SharedAudioAccess, 'createElement').callsFake(() => {
      return {
        play: playSpy,
      };
    });

    await sharedAudioAccess.unlock();
    assert.strictEqual(playSpy.callCount, 0, "play spy hasn't been called");
  });

  test('only plays blank element when asked to while unlocking', async function (assert) {
    let playSpy = sinon.spy();
    sandbox.stub(SharedAudioAccess, 'createElement').callsFake(() => {
      return {
        play: playSpy,
      };
    });

    await sharedAudioAccess.unlock(true);

    assert.strictEqual(playSpy.callCount, 1, 'play spy was called');
  });
});
