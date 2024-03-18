import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-duration', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test('it renders duration of sound if loaded', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/10/duration.mp3';
    await service.load(this.url);
    await render(hbs`{{sound-duration this.url}}`);

    assert.strictEqual(this.element.textContent.trim(), '10');
  });

  test('it can load sound and render duration if requested', async function (assert) {
    this.url = '/good/10/duration-loaded.mp3';
    await render(hbs`{{sound-duration this.url load=true}}`);

    assert.strictEqual(this.element.textContent.trim(), '10');
  });

  test('it renders nothing if not loaded', async function (assert) {
    this.url = '/good/10/duration-not-loaded.mp3';
    await render(hbs`{{sound-duration this.url format=true}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });
  test('it renders placeholder if not loaded and formatted time', async function (assert) {
    this.url = '/good/10/duration-placeholder.mp3';
    await render(hbs`{{sound-duration this.url format='time'}}`);

    assert.strictEqual(this.element.textContent.trim(), '--:--');
  });

  test('it renders infinity if stream', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/stream/duration-stream.mp3';

    await service.load(this.url);
    await render(hbs`{{sound-duration this.url}}`);
    assert.strictEqual(this.element.textContent.trim(), 'Infinity');

    await render(hbs`{{sound-duration this.url format='time'}}`);
    assert.strictEqual(this.element.textContent.trim(), '∞');
  });

  test('if changing input it updates underlying sound', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections(['NativeAudio']);

    this.url = '/good/10000/duration-updating.mp3';
    this.url2 = '/good/20000/duration-updating-2.mp3';

    await service.load(this.url);
    await service.load(this.url2);

    await render(hbs`{{sound-duration this.url load=false format='time'}}`);
    assert.strictEqual(this.element.textContent.trim(), '00:10');

    this.url = this.url2;
    await render(hbs`{{sound-duration this.url load=false format='time'}}`);

    assert.strictEqual(this.element.textContent.trim(), '00:20');
  });
});
