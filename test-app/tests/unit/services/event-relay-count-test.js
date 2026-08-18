import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Unit | Service | stereo | event relay count', function (hooks) {
  setupTest(hooks);
  setupStereoTest(hooks);

  test('a played sound relays each event to the service exactly once', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let pauses = 0;
    service.on('audio-paused', () => pauses++);

    let { sound } = await service.play('/good/1000/relay-count.mp3');
    sound.pause();
    await settled();

    assert.strictEqual(pauses, 1, 'one pause event, relayed once');
  });
});
