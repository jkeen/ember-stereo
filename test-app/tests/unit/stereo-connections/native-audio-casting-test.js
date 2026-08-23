import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { timeout } from 'ember-concurrency';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import NativeAudioCasting from 'ember-stereo/stereo-connections/native-audio-casting';

// Unlike the shared FakeMediaElement, this one never auto-advances currentTime.
class FakeCastAudioElement {
  _src = '';
  readyState = 1; // HAVE_METADATA
  duration = 100; // seconds
  volume = 1;
  paused = true;
  _currentTime = 0;
  _listeners = {};

  get currentTime() {
    return this._currentTime;
  }
  set currentTime(value) {
    this._currentTime = value;
  }

  get src() {
    return this._src;
  }
  set src(value) {
    this._src = value;
  }

  addEventListener(name, handler) {
    (this._listeners[name] ||= []).push(handler);
  }
  removeEventListener(name, handler) {
    this._listeners[name] = (this._listeners[name] || []).filter(
      (existing) => existing !== handler,
    );
  }
  dispatch(name) {
    (this._listeners[name] || []).forEach((handler) =>
      handler({ target: this }),
    );
  }
  listenerCount(name) {
    return (this._listeners[name] || []).length;
  }

  setAttribute(name, value) {
    this[name] = value;
  }
  getAttribute(name) {
    return this[name];
  }
  removeAttribute(name) {
    delete this[name];
  }

  load() {}
  play() {
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
}

function buildAccess() {
  let access = new SharedAudioAccess();
  access.audioElement = new FakeCastAudioElement();
  return access;
}

// A playing connection's updatePositionTask keeps the runloop busy and hangs the next test.
let builtConnections = [];

function buildConnection(
  access,
  options = {},
  url = 'http://example.com/stream.aac',
) {
  let connection = new NativeAudioCasting({
    url,
    connectionName: 'NativeAudioCasting',
    connectionKey: 'NativeAudioCasting',
    timeout: false,
    sharedAudioAccess: access,
    options,
  });
  builtConnections.push(connection);
  return connection;
}

module('Unit | Connection | NativeAudioCasting', function (hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks);

  hooks.afterEach(function () {
    builtConnections.forEach((connection) => {
      connection.pause();
      connection.updatePositionTask?.cancelAll?.();
      connection.teardown();
    });
    builtConnections = [];
  });

  test('is force-injectable: canPlay is always true (gated by the service, not mime)', function (assert) {
    assert.true(NativeAudioCasting.canPlay('http://example.com/whatever.m3u8'));
  });

  test('drives the shared cast audio element and becomes ready on canplay', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);

    assert.strictEqual(
      connection.audioElement,
      access.audioElement,
      'plays through the shared route element, not an internal clone',
    );
    assert.strictEqual(
      access.audioElement.src,
      'http://example.com/stream.aac',
      'set the element src to the cast url',
    );

    assert.false(connection.isReady, 'not ready before the element reports it');
    access.audioElement.dispatch('canplay');
    assert.true(connection.isReady, 'ready once the element can play');
  });

  test('pause and stop never drop src (that would kill the route)', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);
    let element = access.audioElement;

    connection.pause();
    assert.true(element.paused, 'element paused');
    assert.strictEqual(
      element.src,
      'http://example.com/stream.aac',
      'src kept on pause',
    );

    connection.stop();
    assert.strictEqual(
      element.src,
      'http://example.com/stream.aac',
      'src kept on stop',
    );
  });

  test("does not fake playing — the element's real playing event drives it", function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);
    let played = false;
    connection.on('audio-played', () => (played = true));

    connection.play();
    assert.false(
      played,
      'play() does not optimistically mark playing (that masked the device buffer)',
    );

    access.audioElement.dispatch('playing');
    assert.true(played, 'the element playing event drives audio-played');
  });

  test('shows a loading state while the element waits for data (buffering)', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);

    access.audioElement.dispatch('canplay'); // ready/loaded clears initial load
    assert.false(connection.isLoading, 'not loading once ready');

    access.audioElement.dispatch('waiting');
    assert.true(connection.isLoading, 'waiting → loading (buffering)');

    access.audioElement.dispatch('playing');
    assert.false(connection.isLoading, 'playing clears loading');
  });

  test('giving up the element clears a loading state it can no longer clear itself', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);

    access.audioElement.dispatch('canplay');
    access.audioElement.dispatch('waiting');
    assert.true(connection.isLoading, 'buffering when the handoff arrives');

    connection.releaseControl();

    assert.false(
      connection.isLoading,
      'a spinner that outlives the handoff never stops, since audio-loaded only reaches the owner',
    );
  });

  test('seeking to the live edge while casting takes the device with it', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);
    let element = access.audioElement;

    element.webkitCurrentPlaybackTargetIsWireless = true;
    element.paused = false;
    element.seekable = { length: 1, end: () => 120 };

    let ops = [];
    let elementPause = element.pause.bind(element);
    let elementPlay = element.play.bind(element);
    element.pause = () => {
      ops.push('pause');
      elementPause();
    };
    element.play = () => {
      ops.push('play');
      return elementPlay();
    };

    connection._seekToLiveEdge(element);

    assert.deepEqual(
      ops,
      ['pause', 'play'],
      'a bare currentTime write moves only the local clock, leaving the device on silence',
    );
    assert.strictEqual(
      element.currentTime,
      120,
      'and it lands on the live edge',
    );
  });

  test('seeking a paused routed element still reaches the device', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);
    let element = access.audioElement;

    // load() leaves the element paused, which is where the swap hands it over.
    element.webkitCurrentPlaybackTargetIsWireless = true;
    element.paused = true;
    element.seekable = { length: 1, end: () => 120 };

    connection._seekToLiveEdge(element);

    assert.strictEqual(
      element.currentTime,
      0,
      'a seek written while paused never reaches the device, and a freshly loaded stream is already live',
    );
  });

  test('ignores a spurious ended that is not near the media end', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);
    let ended = 0;
    connection.on('audio-ended', () => (ended += 1));

    access.audioElement._currentTime = 10; // far from duration (100)
    access.audioElement.dispatch('ended');
    assert.strictEqual(ended, 0, 'bogus post-seek ended ignored');

    access.audioElement._currentTime = 99.9; // at the end
    access.audioElement.dispatch('ended');
    assert.strictEqual(ended, 1, 'a genuine end is honored');
  });

  test('dead-reckons position while the element clock is frozen but playing', async function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);

    connection.play();
    access.audioElement.dispatch('playing'); // the device actually started → isPlaying
    let element = access.audioElement;
    element._currentTime = 5; // 5000ms, and then frozen (no auto-tick)

    let first = connection._currentPosition();
    await timeout(80);
    let later = connection._currentPosition();

    assert.ok(
      later > first,
      'position advanced via wall-clock despite a frozen element clock',
    );
  });

  test('the source-change hold is renewed after the src change lands', function (assert) {
    let calls = [];
    let access = buildAccess();
    access.audioElement.load = () => calls.push('load');

    buildConnection(access, { onSourceChange: () => calls.push('hold') });

    assert.ok(calls.includes('hold'), 'held the source-change window');
    assert.strictEqual(
      calls[calls.length - 1],
      'hold',
      'a hold taken only before the src change expires while Safari is still rebuilding the route, which reads as a disconnect',
    );
  });

  test('teardown unregisters listeners but keeps the route element', function (assert) {
    let access = buildAccess();
    let connection = buildConnection(access);
    let element = access.audioElement;

    assert.ok(
      element.listenerCount('canplay') > 0,
      'registered element listeners',
    );

    connection.teardown();

    assert.strictEqual(
      element.listenerCount('canplay'),
      0,
      'removed its listeners',
    );
    assert.strictEqual(
      element.src,
      'http://example.com/stream.aac',
      'left the route element intact (never destroyed)',
    );
  });
});
