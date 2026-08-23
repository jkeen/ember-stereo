import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

// Safari's route flag is read-only on a real element and absent in Chrome, so the cast element gets a stand-in.
class FakeCastAudioElement {
  webkitCurrentPlaybackTargetIsWireless = false;
  remote = null;
  paused = false;
  muted = true;
  readyState = 1;
  src = '';
  _listeners = {};

  getAttribute() {
    return null;
  }
  setAttribute() {}
  removeAttribute() {}
  load() {}
  play() {
    return Promise.resolve();
  }
  remove() {}

  addEventListener(name, handler) {
    (this._listeners[name] ||= []).push(handler);
  }
  removeEventListener(name, handler) {
    this._listeners[name] = (this._listeners[name] || []).filter(
      (existing) => existing !== handler,
    );
  }

  routeTo(isWireless) {
    this.webkitCurrentPlaybackTargetIsWireless = isWireless;
    (this._listeners['webkitcurrentplaybacktargetiswirelesschanged'] || [])
      .slice()
      .forEach((handler) => handler({ target: this }));
  }
}

function buildCoordinator(owner, { webkit = false, remote = null } = {}) {
  let cast = owner.lookup('service:stereo').cast;
  let element = new FakeCastAudioElement();
  if (webkit) {
    element.webkitShowPlaybackTargetPicker = () => {};
  }
  element.remote = remote;

  cast.activeDriver?.unwatch();
  cast.audioElement._createElement = () => element;
  cast.audioElement._element = null;
  cast._driver = undefined;
  cast.activeDriver?.watch();

  return { cast, element };
}

module('Unit | Utility | cast-coordinator', function (hooks) {
  setupTest(hooks);

  hooks.afterEach(function () {
    // The window runs for seconds, and a pending one would hang teardown.
    this.owner
      .lookup('service:stereo')
      .cast.ignoreTargetChangesTask.cancelAll();
  });

  test('the element reporting a lost target stops casting', async function (assert) {
    let { cast, element } = buildCoordinator(this.owner, { webkit: true });
    cast.isCasting = true;

    element.routeTo(false);
    await settled();

    assert.false(cast.isCasting, 'the user pulling the route stops casting');
  });

  test('the element reporting a target starts casting', async function (assert) {
    let { cast, element } = buildCoordinator(this.owner, { webkit: true });

    element.routeTo(true);
    await settled();

    assert.true(cast.isCasting, 'picking a device engages');
  });

  // Slow on purpose: it runs the whole window so the flap and the recovery both land inside it.
  test('a target that drops and rebuilds during a source change never reports a disconnect', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    let { cast, element } = buildCoordinator(this.owner, { webkit: true });
    cast.isCasting = true;

    let disconnects = 0;
    service.on('audio-cast-disconnected', () => (disconnects += 1));

    cast.ignoreTargetChanges();
    element.routeTo(false);
    cast.ignoreTargetChanges();
    element.routeTo(true);
    await settled();

    assert.strictEqual(
      disconnects,
      0,
      'Safari drops and rebuilds the route on every src change, and announcing that as a disconnect churns the app between local and device',
    );
    assert.true(cast.isCasting, 'and the cast is still up at the end');
  });

  test('a browser with no driver has no icon and no cast type', function (assert) {
    let { cast } = buildCoordinator(this.owner);

    assert.strictEqual(cast.activeDriver, null, 'no driver is selected');
    assert.strictEqual(
      cast.iconName,
      null,
      'claiming an icon with no way to cast puts an AirPlay glyph in front of Firefox users',
    );
    assert.strictEqual(cast.supportedCastType, null, 'and no cast type');
  });

  test('an AirPlay browser gets the AirPlay glyph without waiting for a device', function (assert) {
    let { cast } = buildCoordinator(this.owner, { webkit: true });

    assert.strictEqual(
      cast.iconName,
      'airplay',
      'WebKit calls receivers unavailable even when the picker can find them, so hiding the icon until it says otherwise hides it from people who can cast',
    );
  });

  test('a browser on the Remote Playback API is not given an AirPlay glyph', function (assert) {
    let { cast } = buildCoordinator(this.owner, {
      remote: {
        watchAvailability: () => {},
        cancelWatchAvailability: () => {},
      },
    });

    cast.activeDriver.remotePlaybackSeesDevices = true;

    assert.strictEqual(
      cast.iconName,
      'cast',
      'Chrome only has Remote Playback, and calling that AirPlay puts the wrong glyph in front of every Chrome user',
    );
  });

  test('what the browser supports is separate from what is reachable', function (assert) {
    let bare = buildCoordinator(this.owner);

    assert.strictEqual(
      bare.cast.supportedCastType,
      null,
      'the stand-in element has neither picker API',
    );
    assert.false(bare.cast.isAvailable, 'and nothing to cast to');

    let remote = buildCoordinator(this.owner, {
      remote: {
        watchAvailability: () => {},
        cancelWatchAvailability: () => {},
      },
    });

    assert.strictEqual(
      remote.cast.supportedCastType,
      'chromecast',
      'an element carrying Remote Playback supports Chromecast',
    );
    assert.false(
      remote.cast.isAvailable,
      'and Chrome answers honestly about what is on the network, so nothing is reachable until it says so',
    );
  });

  test('adopting the element state follows whatever it actually reports', async function (assert) {
    let { cast, element } = buildCoordinator(this.owner, { webkit: true });

    element.webkitCurrentPlaybackTargetIsWireless = true;
    cast._adoptElementState();
    await settled();

    assert.true(
      cast.isCasting,
      'a target that outlived our bookkeeping engages',
    );

    element.webkitCurrentPlaybackTargetIsWireless = false;
    cast._adoptElementState();
    await settled();

    assert.false(cast.isCasting, 'and a target that has gone disengages');
  });
});
