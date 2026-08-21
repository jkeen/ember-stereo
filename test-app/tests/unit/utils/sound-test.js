import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import sinon from 'sinon';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import NativeAudio from 'ember-stereo/stereo-connections/native-audio';

function installChromecastDriver(service) {
  service.cast.audioElement._element = {
    getAttribute: () => null,
    setAttribute: () => {},
    load: () => {},
    remote: { watchAvailability: () => {}, cancelWatchAvailability: () => {} },
  };
  service.cast._driver = undefined;
  return service.cast.activeDriver;
}

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
      'the same Sound instance is returned for the same identifier',
    );
  });

  test('url and urls are strings before a connection resolves, whatever shape the identifier is', function (assert) {
    const service = this.owner.lookup('service:stereo');

    let fromArray = service.findSound([
      '/good/1000/first.mp3',
      '/good/1000/second.mp3',
    ]);
    assert.strictEqual(
      fromArray.url,
      '/good/1000/first.mp3',
      'an array identifier reports its first url, not the array',
    );
    assert.deepEqual(
      fromArray.urls,
      ['/good/1000/first.mp3', '/good/1000/second.mp3'],
      'urls lists every url the sound answers to',
    );

    let fromObject = service.findSound({ url: '/good/1000/object.mp3' });
    assert.strictEqual(
      fromObject.url,
      '/good/1000/object.mp3',
      'a url object reports its url string',
    );

    let fromPromise = service.findSound(
      Promise.resolve('/good/1000/promised.mp3'),
    );
    assert.strictEqual(
      fromPromise.url,
      undefined,
      'a promise identifier has no url until it resolves',
    );
    assert.deepEqual(
      fromPromise.urls,
      [],
      'and contributes nothing to urls until then',
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
    assert.ok(sound.connection, 'the Sound has a backing connection');
    assert.equalUrls(sound.url, url, 'the Sound keeps its url identity');
  });

  test('metadata set on the Sound reaches the connections it builds', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/metadata-first.mp3';

    let sound = service.findSound(url);
    sound.metadata = { title: 'Episode 1' };

    let buildSpy = sandbox.spy(service, '_buildStrategies');
    await sound.load();

    assert.strictEqual(
      buildSpy.firstCall.args[1].metadata.title,
      'Episode 1',
      'a connection is constructed with the metadata, not handed it afterwards',
    );
    assert.strictEqual(
      sound.connection.metadata.title,
      'Episode 1',
      'and the resolved connection carries it',
    );
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
      'pausing the connection relays an audio-paused event on the Sound',
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

    let connection = sound.connection;
    sound.connection = null;

    connection.trigger('audio-paused', { sound: connection });
    await settled();

    assert.strictEqual(
      relayedPauses,
      0,
      'events from a detached connection are not relayed by the Sound',
    );
  });

  test('while casting, re-loading a resolved feed with a device URL rebuilds the cast connection instead of returning the stale cached value', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    let cached = sound.connection;

    service.isCasting = true;
    installChromecastDriver(service);
    let rebuilt = { connectionKey: 'Chromecast' };
    let buildStub = sandbox
      .stub(service.cast, 'buildCastConnection')
      .returns(rebuilt);
    sandbox.stub(sound, 'swap').resolves(rebuilt);

    let result = await sound.load({
      castUrl: 'https://public.example/stream.aac',
    });

    assert.ok(buildStub.calledOnce, 'a fresh cast connection is built');
    assert.strictEqual(
      result,
      rebuilt,
      'returns the rebuilt cast connection, not the cached value',
    );
    assert.notStrictEqual(
      result,
      cached,
      'did not short-circuit to the stale cached connection',
    );
  });

  test('swap emits a catch-up audio-played when the incoming connection is already playing (so a watcher is never stranded)', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/5000/silence.mp3';

    await service.play(url);
    await settled();
    let sound = service.findSound(url);

    let incoming = sound.strategies[0].createConnection();
    incoming.isPlaying = true;
    incoming.play = function () {
      this.isPlaying = true;
    };

    let played = 0;
    sound.on('audio-played', () => (played += 1));

    await sound.swap(incoming);
    await settled();

    assert.ok(
      played >= 1,
      'the Sound relays an audio-played for the already-playing connection',
    );
  });

  test('play/togglePause on a sound stuck on the wrong connection (a dead cast connection after disconnect) re-resolves instead of poking it', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    sandbox.stub(sound, '_castStateMatches').returns(false);
    let loadStub = sandbox.stub(sound, 'load').resolves();
    let connectionPlay = sandbox.spy(sound.connection, 'play');
    let connectionToggle = sandbox.spy(sound.connection, 'togglePause');

    sound.play();
    sound.togglePause();

    assert.strictEqual(
      loadStub.callCount,
      2,
      're-resolves on both play and togglePause',
    );
    assert.ok(
      connectionPlay.notCalled,
      'does not poke the dead connection on play',
    );
    assert.ok(
      connectionToggle.notCalled,
      'does not poke the dead connection on togglePause',
    );
  });

  test('re-loading a resolved sound while casting with a DEAD session resolves LOCAL, not a doomed cast connection', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    service.isCasting = true;
    let driver = installChromecastDriver(service);
    driver.sdkSession = true;

    sandbox.stub(sound, '_castStateMatches').returns(false); // connection is wrong for the cast state
    let buildCast = sandbox.stub(service.cast, 'buildCastConnection');
    let localSound = { id: 'local' };
    sandbox.stub(service.cast, 'buildLocalConnection').returns(localSound);
    sandbox.stub(sound, 'swap').resolves(localSound);

    let result = await sound.load({
      castUrl: 'https://public.example/archive.m3u8',
    });

    assert.ok(
      buildCast.notCalled,
      'does NOT build a cast connection when the session is dead',
    );
    assert.strictEqual(
      result,
      localSound,
      'resolves to a local connection instead',
    );
  });

  test('re-loading a resolved sound while casting with a LIVE session resolves to the device', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    service.isCasting = true;
    let driver = installChromecastDriver(service);
    driver.sdkSession = true;
    driver.sdk._session = {}; // a live session

    sandbox.stub(sound, '_castStateMatches').returns(false);
    let castSound = { id: 'cast' };
    let buildCast = sandbox
      .stub(service.cast, 'buildCastConnection')
      .returns(castSound);
    sandbox.stub(sound, 'swap').resolves(castSound);

    let result = await sound.load({
      castUrl: 'https://public.example/archive.m3u8',
    });

    assert.ok(
      buildCast.calledOnce,
      'builds a cast connection when the session is live',
    );
    assert.strictEqual(result, castSound, 'resolves to the device');
  });

  test('a cast connection left over after disengage is the wrong connection while not casting (self-heals to local on next play)', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    service.isCasting = false; // disengaged

    for (let key of ['NativeAudioCasting', 'Chromecast']) {
      sound.connection.connectionKey = key;
      assert.true(
        service.cast.isCastConnection(sound.connection),
        `${key} is recognized as a cast connection`,
      );
      assert.false(
        sound._castStateMatches(),
        `${key} connection while not casting is the wrong one → re-resolves local`,
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
    let outgoing = sound.connection;

    let incoming = sound.strategies[0].createConnection();
    await sound.swap(incoming);
    await settled();

    assert.strictEqual(
      sound.connection,
      incoming,
      'the Sound points at the swap target',
    );
    assert.notStrictEqual(
      sound.connection,
      outgoing,
      'no longer the original connection',
    );
    assert.true(outgoing.isDestroyed, 'the outgoing connection was detached');
  });

  test('a failed swap records the error and re-resolves instead of stranding the Sound', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    let errorEvents = [];
    sound.on('audio-load-error', (info) => errorEvents.push(info));

    let incoming = new NativeAudio({
      url: '/bad/404-error/nothing-here.mp3',
      connectionKey: 'NativeAudio',
      connectionName: 'Native Audio',
      timeout: false,
    });

    let result = await sound.swap(incoming);
    await settled();

    assert.strictEqual(result, null, 'the failed swap resolves null');
    assert.ok(
      sound.connection,
      'the Sound re-resolved a working connection instead of being stranded',
    );
    assert.false(
      sound.connection.isErrored,
      'the restored connection is healthy',
    );
    assert.strictEqual(errorEvents.length, 1, 'the failure was surfaced');
    assert.ok(sound.errors.length > 0, 'the failure is recorded on the sound');
    assert.true(
      service.sounds.includes(sound),
      'the Sound stays in the loaded list through the failed swap',
    );
  });

  test('removeSound tears down a playing sound but resets the entity in place', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/2500/remove-me.mp3';

    await service.play(url);
    let sound = service.findSound(url);
    let connection = sound.connection;
    assert.true(sound.isPlaying, 'the sound is playing');

    service.removeSound(url);
    await settled();

    assert.true(connection.isDestroyed, 'the backing connection was torn down');
    assert.strictEqual(sound.connection, null, 'the entity has no connection');
    assert.true(sound.isPending, 'the entity is back to pending');
    assert.false(service.sounds.includes(sound), 'gone from the loaded list');
    assert.strictEqual(
      service.findSound(url),
      sound,
      'identity survives removal — findSound returns the same entity',
    );
  });

  test('removeSound tears down a sound whose connection resolved to a different url than the identifier', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/2500/casting-original.mp3';
    let castUrl = '/good/2500/casting-variant.mp3';

    await service.play(url);
    let sound = service.findSound(url);
    sound.castUrl = castUrl;

    await sound.swap(
      new NativeAudio({
        url: castUrl,
        connectionKey: 'NativeAudio',
        connectionName: 'Native Audio',
        timeout: false,
      }),
    );
    await settled();

    assert.strictEqual(
      sound.url,
      castUrl,
      'the resolved url has diverged from the identifier',
    );

    service.removeSound(url);
    await settled();

    assert.strictEqual(
      sound.connection,
      null,
      'removing by the original identifier still tears down the connection',
    );
    assert.false(service.sounds.includes(sound), 'gone from the loaded list');
  });

  test('removeSound tears down a sound addressed by its diverged url', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/2500/remove-by-resolved.mp3';

    await service.play(url);
    let sound = service.findSound(url);

    service.removeSound(sound.connection.url);
    await settled();

    assert.strictEqual(sound.connection, null, 'the connection is torn down');
    assert.false(service.sounds.includes(sound), 'gone from the loaded list');
  });

  test('removing a sound mid-load cancels the load instead of resurrecting it', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/2500/remove-mid-load.mp3';

    let sound = service.findSound(url);
    let loadPromise = sound.load().catch(() => {});
    service.removeSound(url);
    await loadPromise;
    await settled();

    assert.strictEqual(sound.connection, null, 'no connection resurrected');
    assert.true(sound.isPending, 'the entity is pending');
    assert.false(
      service.sounds.includes(sound),
      'the canceled load did not re-add the sound to the loaded list',
    );
  });

  test('swap accepts a connection key and builds the target from its own strategies', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    let outgoing = sound.connection;

    let engaged = await sound.swap('NativeAudio', { timeout: 5000 });
    await settled();

    assert.strictEqual(sound.connection, engaged, 'the Sound engaged the swap');
    assert.strictEqual(
      engaged.timeout,
      5000,
      'connection overrides reach the key-built connection',
    );
    assert.notStrictEqual(
      sound.connection,
      outgoing,
      'on a freshly-built connection',
    );
    assert.strictEqual(sound.connection.connectionKey, 'NativeAudio');

    await assert.rejects(
      sound.swap('Bogus'),
      /no eligible 'Bogus' connection/,
      'an unknown key rejects instead of tearing anything down',
    );
  });

  test('swap carries over the playback position', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/5000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    sound.connection.position = 1500;
    let expectedPosition = sound.connection.position;

    let incoming = sound.strategies[0].createConnection();
    await sound.swap(incoming);
    await settled();

    assert.strictEqual(
      Math.floor(sound.connection.position),
      Math.floor(expectedPosition),
      'the new connection resumes at the handoff position',
    );
  });

  test('after a swap, only the swapped-in connection relays events', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);
    let outgoing = sound.connection;

    let incoming = sound.strategies[0].createConnection();
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
      'the outgoing connection is silenced; only the swapped-in one relays',
    );
  });

  test('a later swap supersedes one still in flight (latest-wins)', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let url = '/good/1000/silence.mp3';

    await service.load(url);
    let sound = service.findSound(url);

    let first = sound.strategies[0].createConnection();
    let second = sound.strategies[0].createConnection();

    sound.swap(first); // not awaited — superseded before it can engage
    await sound.swap(second);
    await settled();

    assert.strictEqual(sound.connection, second, 'the latest swap wins');
    assert.true(first.isDestroyed, 'the superseded target was torn down');
  });
});
