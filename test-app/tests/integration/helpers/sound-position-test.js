import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { set } from '@ember/object';

module('Integration | Helper | sound-position', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test('it renders position of sound if loaded', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/10/position.mp3';
    await service.load(this.url);
    await render(hbs`{{sound-position this.url}}`);

    assert.strictEqual(this.element.textContent.trim(), '0');
  });

  test('it renders formatted position of sound if loaded', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/10/position.mp3';
    await service.load(this.url);
    await render(hbs`{{sound-position this.url format='time'}}`);
    assert.strictEqual(this.element.textContent.trim(), '00:00');

    await render(hbs`{{sound-position this.url format='percentage'}}`);
    assert.strictEqual(this.element.textContent.trim(), '0');

    await render(hbs`{{sound-position this.url format='percent'}}`);
    assert.strictEqual(this.element.textContent.trim(), '0');
  });
  test('it renders nothing if not loaded', async function (assert) {
    this.url = '/good/10/position.mp3';
    await render(hbs`{{sound-position this.url}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('if changing input it updates underlying sound', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    this.url = '/good/10000/position-changing.mp3';
    this.url2 = '/good/6000/position-changing-2.mp3';

    await service.load(this.url);
    let { sound } = await service.load(this.url2);
    sound.position = 5000;

    assert.strictEqual(sound.position, 5000);

    await render(hbs`{{sound-position this.url format='time'}}`);
    assert.strictEqual(this.element.textContent.trim(), '00:00');

    set(this, 'url', this.url2);
    await render(hbs`{{sound-position this.url format='time'}}`);
    assert.strictEqual(this.element.textContent.trim(), '00:05');
  });

  test('it renders dummy data if given data', async function (assert) {
    this.url = '/good/10/position.mp3';
    await render(hbs`{{sound-position position=5000 duration=10000}}`);
    assert.strictEqual(this.element.textContent.trim(), '5000');

    await render(
      hbs`{{sound-position position=5000 duration=10000 format='time'}}`
    );
    assert.strictEqual(this.element.textContent.trim(), '00:05');

    await render(
      hbs`{{sound-position position=5000 duration=10000 format='percentage'}}`
    );
    assert.strictEqual(this.element.textContent.trim(), '50');

    await render(
      hbs`{{sound-position position=0 duration=10000 format='percent'}}`
    );
    assert.strictEqual(this.element.textContent.trim(), '0');
  });
});
