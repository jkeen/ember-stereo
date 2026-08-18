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
      'bar does not have access until it requests it',
    );
    sharedAudioAccess.requestControl(bar);
    assert.ok(sharedAudioAccess.hasControl(bar), 'bar now can have access');
  });

  function stubElement(sandbox, playSpy) {
    let attributes = {};
    let element = {
      play: playSpy,
      getAttribute: (name) => attributes[name] ?? null,
      setAttribute: (name, value) => (attributes[name] = value),
    };
    sandbox.stub(SharedAudioAccess, 'createElement').returns(element);
    return element;
  }

  test('only plays blank element when asked to', async function (assert) {
    let playSpy = sinon.spy(() => Promise.resolve());
    stubElement(sandbox, playSpy);

    await sharedAudioAccess.unlock();
    assert.strictEqual(playSpy.callCount, 0, "play spy hasn't been called");
  });

  test('only plays blank element when asked to while unlocking', async function (assert) {
    let playSpy = sinon.spy(() => Promise.resolve());
    let element = stubElement(sandbox, playSpy);

    await sharedAudioAccess.unlock(true);

    assert.strictEqual(playSpy.callCount, 1, 'play spy was called');
    assert.ok(
      element.getAttribute('src'),
      'a source-less element cannot play, so it gets silence to play',
    );
  });

  test('the element is only unlocked once', async function (assert) {
    let playSpy = sinon.spy(() => Promise.resolve());
    stubElement(sandbox, playSpy);

    await sharedAudioAccess.unlock(true);
    await sharedAudioAccess.unlock(true);

    assert.strictEqual(playSpy.callCount, 1, 'the second unlock is a no-op');
  });

  test('a real source is never replaced with silence', async function (assert) {
    let playSpy = sinon.spy(() => Promise.resolve());
    let element = stubElement(sandbox, playSpy);
    sharedAudioAccess.unlock();
    element.setAttribute('src', '/good/1000/already-loaded.mp3');

    await sharedAudioAccess.unlock(true);

    assert.strictEqual(
      element.getAttribute('src'),
      '/good/1000/already-loaded.mp3',
      'the loaded sound keeps its source',
    );
  });
});
