import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-loaded', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo')

    this.set('url', '/good/10/silence.mp3')
    await render(hbs`{{#if (sound-is-loaded this.url)}}sound-is-loaded{{else}}is-not-loaded{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loaded');
    await service.load(this.url);
    await settled();
    assert.equal(this.element.textContent.trim(), 'sound-is-loaded');
  });

  test('it renders with array', async function (assert) {
    let service = this.owner.lookup('service:stereo')

    this.set('url', ['/good/10/silence.mp3', '/good/10000/silent.mp3'])
    await render(hbs`{{#if (sound-is-loaded this.url)}}sound-is-loaded{{else}}is-not-loaded{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loaded');
    await service.load(this.url);
    await settled();
    assert.equal(this.element.textContent.trim(), 'sound-is-loaded');
  });

});
