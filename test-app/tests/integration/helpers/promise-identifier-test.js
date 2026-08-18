import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | promise identifiers', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('a helper watching a promise sees the sound played through its url', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let url = '/good/2000/helper-promise.mp3';
    this.set('promise', Promise.resolve({ url }));

    await render(
      hbs`{{#if (sound-is-playing this.promise)}}playing{{else}}not-playing{{/if}}`,
    );
    assert.dom().hasText('not-playing', 'nothing is playing yet');

    let { sound } = await service.play(url);
    await settled();

    assert.dom().hasText('playing', 'the helper followed the collapse');

    sound.stop();
  });
});
