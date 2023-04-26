import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-loaded', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    this.set('url', '/good/10/loaded.mp3');
    await render(
      hbs`{{#if (sound-is-loaded this.url)}}sound-is-loaded{{else}}is-not-loaded{{/if}}`
    );
    assert.strictEqual(this.element.textContent.trim(), 'is-not-loaded');
    await service.load(this.url);
    await settled();
    assert.strictEqual(this.element.textContent.trim(), 'sound-is-loaded');
  });

  test('it renders with array', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    this.set('url', [
      '/good/10/loaded-array-1.mp3',
      '/good/10000/loaded-array-2.mp3',
    ]);
    await render(
      hbs`{{#if (sound-is-loaded this.url)}}sound-is-loaded{{else}}is-not-loaded{{/if}}`
    );
    assert.strictEqual(this.element.textContent.trim(), 'is-not-loaded');
    await service.load(this.url);
    await settled();
    assert.strictEqual(this.element.textContent.trim(), 'sound-is-loaded');
  });
});
