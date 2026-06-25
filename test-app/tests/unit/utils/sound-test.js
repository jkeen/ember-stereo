import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import sinon from 'sinon';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Unit | Utility | sound', function (hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks);
  setupStereoTest(hooks);

  let sandbox;
  hooks.beforeEach(function () {
    sandbox = sinon.createSandbox();
  });
  hooks.afterEach(function () {
    sandbox.restore();
  });

  test('findSound returns an identity-stable Sound that is pending before it loads', function (assert) {
    const service = this.owner.lookup('service:stereo');
    let url = '/good/1000/silence.mp3';

    let sound = service.findSound(url);
    assert.ok(sound, 'a Sound is returned before anything is loaded');
    assert.true(sound.isPending, 'the Sound is pending with no connection yet');
    assert.false(sound.isResolved, 'the Sound is not yet resolved');
    assert.strictEqual(
      service.findSound(url),
      sound,
      'the same Sound instance is returned for the same identifier'
    );
  });

  test('a Sound resolves a connection on load and exposes its state', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    assert.true(sound.isResolved, 'the Sound resolved a connection');
    assert.false(sound.isPending, 'the Sound is no longer pending');
    assert.false(sound.isLoading, 'the Sound is no longer loading');
    assert.false(sound.isErrored, 'the Sound is not errored');
    assert.ok(sound.value, 'the Sound has a backing connection');
    assert.equalUrls(sound.url, url, 'the Sound keeps its url identity');
  });

  test('a Sound relays its connection events as its own', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.play(url);
    await settled();

    let sound = service.findSound(url);
    let relayedPauses = 0;
    sound.on('audio-paused', () => relayedPauses++);

    service.pause();
    await settled();

    assert.strictEqual(
      relayedPauses,
      1,
      'pausing the connection relays an audio-paused event on the Sound'
    );
  });

  test('detaching a connection unregisters its relays so its events no longer reach the Sound', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.play(url);
    await settled();

    let sound = service.findSound(url);
    let relayedPauses = 0;
    sound.on('audio-paused', () => relayedPauses++);

    let connection = sound.value;
    // Detach the connection from the Sound. With stored handler refs this
    // actually removes the relay listeners; the old re-`bind()` approach
    // never matched, so events kept leaking through.
    sound.value = null;

    connection.trigger('audio-paused', { sound: connection });
    await settled();

    assert.strictEqual(
      relayedPauses,
      0,
      'events from a detached connection are not relayed by the Sound'
    );
  });

  test('while casting, re-loading a resolved feed with a device URL rebuilds the cast connection instead of returning the stale cached value', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    let cached = sound.value;

    // Simulate an active cast session whose media has moved to another feed: a
    // feed switch must re-issue loadMedia (rebuild), not hand back the cached
    // connection — otherwise the shared session stays stuck on the prior feed.
    service.isCasting = true;
    let rebuilt = { connectionKey: 'Chromecast' };
    let buildStub = sandbox
      .stub(service, '_buildCastConnection')
      .returns(rebuilt);
    sandbox.stub(sound, 'swap').resolves(rebuilt);

    let result = await sound.load({
      castUrl: 'https://public.example/stream.aac',
    });

    assert.ok(buildStub.calledOnce, 'a fresh cast connection is built');
    assert.strictEqual(
      result,
      rebuilt,
      'returns the rebuilt cast connection, not the cached value'
    );
    assert.notStrictEqual(
      result,
      cached,
      'did not short-circuit to the stale cached connection'
    );
  });

  test('swap emits a catch-up audio-played when the incoming backend is already playing (so a watcher is never stranded)', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/5000/silence.mp3';

    await service.play(url);
    await settled();
    let sound = service.findSound(url);

    // Simulate a backend (e.g. a cast connection autoplaying on the device) that
    // is already playing by the time the swap engages it — its own audio-played
    // fired before this Sound's relays were registered.
    let incoming = sound.strategies[0].createSound();
    incoming.play = function () {
      this.isPlaying = true;
    };

    let played = 0;
    sound.on('audio-played', () => (played += 1));

    await sound.swap(incoming);
    await settled();

    assert.ok(
      played >= 1,
      'the Sound relays an audio-played for the already-playing backend'
    );
  });

  test('play/togglePause on a sound stuck on the wrong backend (a dead cast connection after disconnect) re-resolves instead of poking it', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    // Simulate the backing connection being on the wrong backend for the cast
    // state (e.g. a leftover Chromecast connection once the session ended).
    sandbox.stub(sound, '_castStateMatches').returns(false);
    let loadStub = sandbox.stub(sound, 'load').resolves();
    let connectionPlay = sandbox.spy(sound.value, 'play');
    let connectionToggle = sandbox.spy(sound.value, 'togglePause');

    sound.play();
    sound.togglePause();

    assert.strictEqual(loadStub.callCount, 2, 're-resolves on both play and togglePause');
    assert.ok(connectionPlay.notCalled, 'does not poke the dead connection on play');
    assert.ok(connectionToggle.notCalled, 'does not poke the dead connection on togglePause');
  });

  test('re-loading a resolved sound while casting with a DEAD session resolves LOCAL, not a doomed cast connection', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    // Casting is stuck true (a missed/partial disconnect) but the Chromecast
    // session is gone — _castAccess has no session.
    service.isCasting = true;
    service._activeCastBackend = 'chromecast';

    sandbox.stub(sound, '_castStateMatches').returns(false); // value on wrong backend
    let buildCast = sandbox.stub(service, '_buildCastConnection');
    let localSound = { id: 'local' };
    sandbox.stub(service, '_buildLocalConnection').returns(localSound);
    sandbox.stub(sound, 'swap').resolves(localSound);

    let result = await sound.load({
      castUrl: 'https://public.example/archive.m3u8',
    });

    assert.ok(
      buildCast.notCalled,
      'does NOT build a cast connection when the session is dead'
    );
    assert.strictEqual(result, localSound, 'resolves to a local connection instead');
  });

  test('re-loading a resolved sound while casting with a LIVE session resolves to the device', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    service.isCasting = true;
    service._activeCastBackend = 'chromecast';
    service._castAccess._session = {}; // a live session

    sandbox.stub(sound, '_castStateMatches').returns(false);
    let castSound = { id: 'cast' };
    let buildCast = sandbox
      .stub(service, '_buildCastConnection')
      .returns(castSound);
    sandbox.stub(sound, 'swap').resolves(castSound);

    let result = await sound.load({
      castUrl: 'https://public.example/archive.m3u8',
    });

    assert.ok(buildCast.calledOnce, 'builds a cast connection when the session is live');
    assert.strictEqual(result, castSound, 'resolves to the device');
  });

  test('a cast connection left over after disengage is the wrong backend while not casting (self-heals to local on next play)', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    service.isCasting = false; // disengaged

    // AirPlay disengage deliberately leaves the Sound on a NativeAudioCasting;
    // Chromecast can leave a stale Chromecast value. Either must read as "wrong
    // backend" while not casting so the next play/load re-resolves it to local.
    for (let key of ['NativeAudioCasting', 'Chromecast']) {
      sound.value.connectionKey = key;
      assert.true(
        service._isCastConnection(sound.value),
        `${key} is recognized as a cast connection`
      );
      assert.false(
        sound._castStateMatches(),
        `${key} value while not casting is the wrong backend → re-resolves local`
      );
    }
  });

  test('swap moves the Sound to a new connection and detaches the old one', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    let outgoing = sound.value;

    let incoming = sound.strategies[0].createSound();
    await sound.swap(incoming);
    await settled();

    assert.strictEqual(sound.value, incoming, 'the Sound points at the swap target');
    assert.notStrictEqual(sound.value, outgoing, 'no longer the original connection');
    assert.true(outgoing.isDestroyed, 'the outgoing connection was detached');
  });

  test('swap carries over the playback position', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/5000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    sound.value.position = 1500;
    let expectedPosition = sound.value.position;

    let incoming = sound.strategies[0].createSound();
    await sound.swap(incoming);
    await settled();

    assert.strictEqual(
      Math.floor(sound.value.position),
      Math.floor(expectedPosition),
      'the new connection resumes at the handoff position'
    );
  });

  test('after a swap, only the swapped-in connection relays events', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    let outgoing = sound.value;

    let incoming = sound.strategies[0].createSound();
    await sound.swap(incoming);
    await settled();

    let relayed = [];
    sound.on('audio-paused', () => relayed.push('paused'));

    outgoing.trigger('audio-paused', { sound: outgoing });
    incoming.trigger('audio-paused', { sound: incoming });
    await settled();

    assert.deepEqual(
      relayed,
      ['paused'],
      'the outgoing connection is silenced; only the swapped-in one relays'
    );
  });

  test('a later swap supersedes one still in flight (latest-wins)', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    let first = sound.strategies[0].createSound();
    let second = sound.strategies[0].createSound();

    sound.swap(first); // not awaited — superseded before it can engage
    await sound.swap(second);
    await settled();

    assert.strictEqual(sound.value, second, 'the latest swap wins');
    assert.true(first.isDestroyed, 'the superseded target was torn down');
  });
});
