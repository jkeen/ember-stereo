import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-playing', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    this.set('url', '/good/2500/playing.mp3');
    await render(
      hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`,
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-playing',
      'helper reports not playing',
    );
    await service.play(this.url);

    assert.true(service.isPlaying, 'service reports playing');
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-playing',
      'helper reports playing',
    );
  });

  test('it renders with url array', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    this.set('url', [
      '/good/2500/playing-array.mp3',
      '/good/2523/playing-array-w.mp3',
    ]);
    await render(
      hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`,
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-playing',
      'helper reports not playing',
    );
    await service.play(this.url);
    assert.true(service.isPlaying, 'service reports playing');
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-playing',
      'helper reports playing',
    );
  });

  test('it renders correct status if sound changes', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    await render(
      hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`,
    );

    this.set('url', '/good/10/playing.mp3');
    await service.load(this.url);
    assert.strictEqual(this.element.textContent.trim(), 'is-not-playing');

    await service.play(this.url);

    assert.strictEqual(this.element.textContent.trim(), 'sound-is-playing');
    this.set('url2', '/good/5/second-playing.mp3');
    await service.play(this.url2);
    assert.true(service.isPlaying);
    assert.strictEqual(this.element.textContent.trim(), 'is-not-playing');
  });

  test('a helper rendered before load keeps tracking through a connection swap', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);

    this.set('url', '/good/2500/swap-tracking.mp3');
    await render(
      hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`,
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-playing',
      'the helper rendered against a url nothing has loaded yet',
    );

    await service.play(this.url);
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-playing',
      'the helper picked up the load+play that happened elsewhere',
    );

    let sound = service.findSound(this.url);
    let outgoing = sound.value;
    await sound.swap('NativeAudio');
    await settled();

    assert.notStrictEqual(sound.value, outgoing, 'the backend changed');
    assert.true(sound.isPlaying, 'playback carried across the swap');
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-playing',
      'the pre-load helper still tracks the Sound on its new backend',
    );
  });
});
