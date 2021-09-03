import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-playing', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo')

    this.set('url', '/good/2500/playing.mp3')
    await render(hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-playing', 'helper reports not playing');
    await service.play(this.url)

    assert.true(service.isPlaying, 'service reports playing');
    assert.equal(this.element.textContent.trim(), 'sound-is-playing', 'helper reports playing');
  });

  test('it renders with url array', async function (assert) {
    let service = this.owner.lookup('service:stereo')

    this.set('url', ['/good/2500/playing-array.mp3', '/good/2523/playing-array-w.mp3'])
    await render(hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-playing', 'helper reports not playing');
    await service.play(this.url)
    assert.true(service.isPlaying, 'service reports playing');
    assert.equal(this.element.textContent.trim(), 'sound-is-playing', 'helper reports playing');
  });

  test('it renders correct status if sound changes', async function (assert) {
    let service = this.owner.lookup('service:stereo')
    await render(hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`);

    this.set('url', '/good/10/playing.mp3')
    await service.load(this.url)
    assert.equal(this.element.textContent.trim(), 'is-not-playing');

    await service.play(this.url)

    assert.equal(this.element.textContent.trim(), 'sound-is-playing');
    this.set('url2', '/good/5/second-playing.mp3')
    await service.play(this.url2);
    assert.true(service.isPlaying);
    assert.equal(this.element.textContent.trim(), 'is-not-playing');
  });
});
