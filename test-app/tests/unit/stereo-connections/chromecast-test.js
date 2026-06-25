import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import Chromecast from 'ember-stereo/stereo-connections/chromecast';
import SharedCastAccess from 'ember-stereo/-private/utils/shared-cast-access';

// Minimal fakes for the Cast SDK shapes SharedCastAccess + ChromecastSound touch.
class FakeRemotePlayer {
  isPaused = true;
  currentTime = 0;
  duration = 0;
  volumeLevel = 1;
  playerState = 'IDLE';
  mediaInfo = null;
}

class FakeController {
  constructor(player) {
    this.player = player;
    this._listeners = {};
    this.seekCount = 0;
  }
  addEventListener(name, handler) {
    (this._listeners[name] ||= []).push(handler);
  }
  removeEventListener(name, handler) {
    this._listeners[name] = (this._listeners[name] || []).filter((h) => h !== handler);
  }
  dispatch(name) {
    (this._listeners[name] || []).forEach((h) => h());
  }
  listenerCount(name) {
    return (this._listeners[name] || []).length;
  }
  playOrPause() {
    this.player.isPaused = !this.player.isPaused;
    this.dispatch('IS_PAUSED_CHANGED');
  }
  seek() {
    this.seekCount += 1;
  }
  setVolumeLevel() {}
}

class FakeSession {
  constructor() {
    this.loadRequest = null;
    this.device = { friendlyName: 'Living Room TV' };
  }
  loadMedia(request) {
    this.loadRequest = request;
    return Promise.resolve();
  }
  getCastDevice() {
    return this.device;
  }
}

function installFakeCastSdk() {
  window.cast = {
    framework: {
      RemotePlayer: FakeRemotePlayer,
      RemotePlayerController: FakeController,
      RemotePlayerEventType: {
        IS_PAUSED_CHANGED: 'IS_PAUSED_CHANGED',
        PLAYER_STATE_CHANGED: 'PLAYER_STATE_CHANGED',
        DURATION_CHANGED: 'DURATION_CHANGED',
      },
    },
  };
  window.chrome = window.chrome || {};
  window.chrome.cast = {
    media: {
      MediaInfo: class {
        constructor(contentId, contentType) {
          this.contentId = contentId;
          this.contentType = contentType;
        }
      },
      GenericMediaMetadata: class {},
      LoadRequest: class {
        constructor(media) {
          this.media = media;
          this.autoplay = true;
        }
      },
      PlayerState: { IDLE: 'IDLE', PLAYING: 'PLAYING', PAUSED: 'PAUSED', BUFFERING: 'BUFFERING' },
    },
  };
}

// One shared session access (the analogue of the AirPlay outlet element),
// attached to a session — exactly how the service wires it on SESSION_STARTED.
function buildAccess() {
  let session = new FakeSession();
  let access = new SharedCastAccess();
  access.attach(session, window.cast.framework);
  return { session, access };
}

let built = [];
function build(access, options = {}, url = 'http://example.com/stream.m3u8') {
  let connection = new Chromecast({
    url,
    connectionName: 'Chromecast',
    connectionKey: 'Chromecast',
    timeout: false,
    options: { castAccess: access, ...options },
  });
  built.push(connection);
  return connection;
}

// Capture the events a function relays on a connection, without the side effects
// of a real audio-played (which would start a position-poll loop that never
// settles in the unit env).
function capture(connection, fn) {
  let events = [];
  let original = connection.trigger;
  connection.trigger = (event) => events.push(event);
  try {
    fn();
  } finally {
    connection.trigger = original;
  }
  return events;
}

module('Unit | Connection | Chromecast', function (hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks);

  hooks.beforeEach(function () {
    this._cast = window.cast;
    this._chrome = window.chrome;
    installFakeCastSdk();
  });

  hooks.afterEach(function () {
    built.forEach((c) => c.teardown());
    built = [];
    window.cast = this._cast;
    window.chrome = this._chrome;
  });

  test('is force-injectable: canPlay always true', function (assert) {
    assert.true(Chromecast.canPlay('http://example.com/x.m3u8'));
  });

  test('loads media on the shared session and becomes ready when loadMedia resolves', async function (assert) {
    let { session, access } = buildAccess();
    let connection = build(access);

    assert.ok(session.loadRequest, 'called session.loadMedia');
    assert.strictEqual(
      session.loadRequest.media.contentId,
      'http://example.com/stream.m3u8',
      'loaded the cast url'
    );
    assert.true(session.loadRequest.autoplay, 'auto-plays on load (receiver starts; swap reconciles intent)');

    await settled();
    assert.true(connection.isReady, 'ready after loadMedia resolves');
  });

  test('takes ownership of the shared access; the previous sound is released and paused', function (assert) {
    let { access } = buildAccess();
    let a = build(access);
    assert.true(access.hasControl(a), 'first sound owns the session');

    // The release fires audio-paused on the prior owner (so its loop exits).
    let aPaused = capture(a, () => {
      let b = build(access);
      assert.true(access.hasControl(b), 'second sound takes ownership');
      assert.false(access.hasControl(a), 'first sound no longer owns it');
    });
    assert.deepEqual(aPaused, ['audio-paused'], 'the released sound is paused');
  });

  test('play/pause drive the shared controller, guarded by playerState', function (assert) {
    let { access } = buildAccess();
    let connection = build(access);
    let controller = access.controller;

    controller.player.playerState = 'PAUSED';
    connection.play();
    assert.false(controller.player.isPaused, 'play resumed from PAUSED');

    controller.player.playerState = 'IDLE';
    let pausedBefore = controller.player.isPaused;
    connection.play();
    assert.strictEqual(
      controller.player.isPaused,
      pausedBefore,
      'play during load (not PAUSED) is a no-op — lets autoplay proceed'
    );

    controller.player.playerState = 'PLAYING';
    connection.pause();
    assert.true(controller.player.isPaused, 'pause from PLAYING');
  });

  test('a sound that no longer owns the session does NOT drive the controller', function (assert) {
    let { access } = buildAccess();
    let a = build(access);
    build(access); // takes ownership from a

    access.player.playerState = 'PAUSED';
    let before = access.player.isPaused;
    a.play(); // a is released — must not touch the shared session
    assert.strictEqual(access.player.isPaused, before, 'released sound play() is a no-op');
  });

  test('seek sets remote currentTime and calls seek (when it owns the session)', function (assert) {
    let { access } = buildAccess();
    let connection = build(access);
    connection._setPosition(5000);
    assert.strictEqual(access.player.currentTime, 5, 'set remote currentTime (s)');
    assert.strictEqual(access.controller.seekCount, 1, 'issued a seek');
  });

  test('position reads the remote clock for seekable media', function (assert) {
    let { access } = buildAccess();
    let connection = build(access);
    access.player.duration = 100; // finite → not a stream
    access.player.currentTime = 12;
    assert.strictEqual(connection._currentPosition(), 12000);
  });

  test('only the owner relays player-state events (the shared access dispatches to it alone)', function (assert) {
    let { access } = buildAccess();
    let a = build(access);
    let b = build(access); // b owns; a released

    let aEvents = [];
    let bEvents = [];
    let aTrig = a.trigger;
    let bTrig = b.trigger;
    a.trigger = (event) => aEvents.push(event);
    b.trigger = (event) => bEvents.push(event);

    access.player.playerState = 'PLAYING';
    access.controller.dispatch('PLAYER_STATE_CHANGED');

    a.trigger = aTrig;
    b.trigger = bTrig;

    assert.deepEqual(aEvents, [], 'the released sound relays nothing');
    assert.deepEqual(bEvents, ['audio-played'], 'only the owner relays audio-played');
  });

  test('releaseControl pauses the sound locally so its dead-reckon loop exits', function (assert) {
    let { access } = buildAccess();
    let connection = build(access);

    let paused = 0;
    let original = connection.trigger;
    connection.trigger = (event, ...rest) => {
      if (event === 'audio-paused') paused += 1;
      return original.call(connection, event, ...rest);
    };

    connection.releaseControl();
    connection.trigger = original;

    assert.false(access.hasControl(connection), 'gave up ownership');
    assert.strictEqual(paused, 1, 'relayed a single audio-paused');
    assert.false(connection.isPlaying, 'no longer playing — position loop exits');
  });

  test('teardown gives up ownership without ending the session', function (assert) {
    let { session, access } = buildAccess();
    let connection = build(access);
    assert.true(access.hasControl(connection), 'owned before teardown');

    connection.teardown();
    assert.false(access.hasControl(connection), 'released on teardown');
    assert.notOk(session.ended, 'session not ended by teardown');
    assert.ok(access.controller, 'shared controller survives (session-owned)');
  });

  test('detach tears down the shared player/controller and removes its listeners', function (assert) {
    let { access } = buildAccess();
    build(access);
    let controller = access.controller;
    assert.ok(controller.listenerCount('PLAYER_STATE_CHANGED') > 0, 'registered while attached');

    access.detach();
    assert.strictEqual(controller.listenerCount('PLAYER_STATE_CHANGED'), 0, 'unregistered on detach');
    assert.strictEqual(access.player, null, 'player cleared');
    assert.strictEqual(access.owner, null, 'owner cleared');
  });
});
