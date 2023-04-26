import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-rewindable', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    this.set('url', '/good/10/rewindable-test.mp3');
    await service.play(this.url);
    await render(
      hbs`{{#if (sound-is-rewindable this.url)}}sound-is-rewindable{{else}}is-not-rewindable{{/if}}`
    );
    assert.true(service.isRewindable, 'service says its rewindable');
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-rewindable',
      'helper says its rewindable'
    );

    this.set('url', '/good/stream/stream.mp3');
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-rewindable',
      'helper updated when url changed'
    );
  });
});
