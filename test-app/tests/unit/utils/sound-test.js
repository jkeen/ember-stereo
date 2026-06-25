import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Unit | Utility | sound', function (hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks);
  setupStereoTest(hooks);

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
