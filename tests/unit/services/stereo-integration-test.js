// import { registerWaiter } from '@ember/test';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'

module('Unit | Service | stereo integration test.js', function (hooks) {
  setupTest(hooks);
  setupStereoTest(hooks)

  test('it activates local connections', function (assert) {
    const service = this.owner.lookup('service:stereo')
    service.loadConnections([{ name: 'LocalDummyConnection', config: { 'testOption': 'dummy' } }])

    assert.deepEqual(service.connectionLoader.names, ['LocalDummyConnection'], 'it activated the LocalDummyConnection');
    assert.equal(service.connectionLoader.get('LocalDummyConnection').config.testOption, 'dummy', 'it passes config options to the LocalDummyConnection');
  });

  test('playing good url works', async function (assert) {
    let service = this.owner.lookup('service:audio')

    let { sound } = await service.playGood()
    assert.ok(sound);
  });

  test('playing a blank url fails', async function (assert) {
    assert.expect(1)

    let service = this.owner.lookup('service:audio')
    let failures, results;

    try {
      await service.playBlank();
    } catch (r) {
      results = r;
      failures = results.failures;
      assert.notOk(failures, "should not be failures");
    }
  });

  test('it sets fixed duration correctly', async function (assert) {
    let stereo = this.owner.lookup('service:stereo');

    let { sound } = await stereo.load('/good/2500/test')
    assert.equal(sound.duration, 2500);
  });

  test('it sets stream duration correctly', async function (assert) {
    let stereo = this.owner.lookup('service:stereo');
    stereo.loadConnections([{ name: 'DummyConnection' }]);

    let { sound } = await stereo.load('/good/stream/test')
    assert.equal(sound.duration, Infinity, "duration should be infinity");
    assert.true(sound.isStream, "should be stream");
  });

  test('it can not rewind before 0', async function (assert) {
    assert.expect(1)
    let done = assert.async();
    let stereo = this.owner.lookup('service:stereo');

    stereo.one('audio-will-rewind', ({ newPosition }) => {
      assert.equal(newPosition, 0, "sound should be at the start");
      done();
    });

    await stereo.play('/good/10000/test')
    stereo.rewind(5000);
  });

  test('it can not fast forward past duration', async function (assert) {
    assert.expect(2)

    let service = this.owner.lookup('service:audio');
    let stereo = service.get('stereo');

    await stereo.play('/good/1000/test')
    stereo.fastForward(995);
    assert.equal(stereo.position, 995, "sound should be at 995");
    stereo.fastForward(200);
    assert.equal(stereo.position, 0, "sound should be back at the beginning");
  });

  test('it sends an audio-ended event when the sound ends', async function (assert) {
    assert.expect(1)
    let done = assert.async()

    let stereo = this.owner.lookup('service:stereo');

    stereo.one('audio-ended', ({ sound }) => {
      assert.equal(sound.position, 0, "sound should return to start");
      done();
    });
    await stereo.play('/good/2000/test')
  });
});
