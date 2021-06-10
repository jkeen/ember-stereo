import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { set } from '@ember/object';

module('Integration | Helper | sound-position', function(hooks) {
  setupRenderingTest(hooks);
  test('it renders position of sound if loaded', async function(assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await service.load(this.url);
    await render(hbs`{{sound-position this.url}}`);

    assert.equal(this.element.textContent.trim(), '0');
  });

  test('it renders formatted position of sound if loaded', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await service.load(this.url);
    await render(hbs`{{sound-position this.url format='time'}}`);
    assert.equal(this.element.textContent.trim(), '00:00');

    await render(hbs`{{sound-position this.url format='percentage'}}`);
    assert.equal(this.element.textContent.trim(), '0');

    await render(hbs`{{sound-position this.url format='percent'}}`);
    assert.equal(this.element.textContent.trim(), '0');
  });
  test('it renders nothing if not loaded', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await render(hbs`{{sound-position this.url}}`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('if changing input it updates underlying sound', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);

    this.url = '/good/10000/silence.mp3'
    this.url2 = '/good/20000/silence.mp3'

    await service.load(this.url)
    let { sound }  = await service.load(this.url2)
    sound.position = 5000

    assert.equal(sound.position, 5000);

    await render(hbs`{{sound-position this.url format='time'}}`);
    assert.equal(this.element.textContent.trim(), '00:00');

    set(this, 'url', this.url2)
    // await render(hbs`{{sound-position this.url format='time'}}`);
    assert.equal(this.element.textContent.trim(), '00:05');
  });
});
