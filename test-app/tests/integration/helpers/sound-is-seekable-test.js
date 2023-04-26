import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-seekable', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    this.set('url', '/good/10/seekable-test.mp3');
    await service.play(this.url);
    await render(
      hbs`{{#if (sound-is-seekable this.url)}}sound-is-seekable{{else}}is-not-seekable{{/if}}`
    );
    assert.true(service.isSeekable, 'service says its seekable');
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-seekable',
      'helper says its seekable'
    );

    this.set('url', '/good/stream/stream.mp3');
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-seekable',
      'helper updated when url changed'
    );
  });
});
