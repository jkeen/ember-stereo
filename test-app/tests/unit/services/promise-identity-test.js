import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Unit | Service | promise identifiers', function (hooks) {
  setupTest(hooks);
  setupStereoTest(hooks);

  test('a string, a url object and a promise for one url are one Sound', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let url = '/good/2000/one-url-three-ways.mp3';
    let promise = Promise.resolve({ url });

    let fromString = service.findSound(url);
    let fromObject = service.findSound({ url });

    assert.strictEqual(fromString, fromObject, 'string and object agree');

    await service.load(promise);
    await settled();

    assert.strictEqual(
      service.findSound(promise),
      fromString,
      'the promise collapses onto the Sound that owns the url',
    );
    assert.strictEqual(service.sounds.length, 1, 'one loaded sound, not two');
  });

  test('playing through a promise identifier shows as playing on its url', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let url = '/good/2000/promise-play.mp3';
    let promise = Promise.resolve({ url });

    let watcher = service.findSound(url);
    await service.play(promise);
    await settled();

    assert.true(
      watcher.isPlaying,
      'the url side sees the promise side playing',
    );
    assert.strictEqual(
      service.currentSound,
      watcher,
      'and it is the current sound',
    );

    watcher.stop();
  });

  test('a promise for a url nothing else has claimed keeps its own Sound', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let url = '/good/2000/promise-only.mp3';
    let promise = Promise.resolve({ url });

    let { sound } = await service.load(promise);
    await settled();

    assert.strictEqual(
      service.findSound(url),
      sound,
      'looking it up by url afterwards finds the same Sound',
    );
    assert.strictEqual(service.sounds.length, 1, 'one loaded sound');
  });
});
