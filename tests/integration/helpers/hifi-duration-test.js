import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hifi-duration', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders duration of sound if loaded', async function (assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await service.load(this.url);
    await render(hbs`{{hifi-duration this.url}}`);

    assert.equal(this.element.textContent.trim(), '10');
  });

  test('it can load sound and render duration if requested', async function (assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await render(hbs`{{hifi-duration this.url load=true}}`);
    await settled();

    assert.equal(this.element.textContent.trim(), '10');
  });

  test('it renders nothing if not loaded', async function (assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await render(hbs`{{hifi-duration this.url format=true}}`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders infinity if stream', async function (assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/stream/silence.mp3';

    await service.load(this.url)
    await render(hbs`{{hifi-duration this.url}}`);
    assert.equal(this.element.textContent.trim(), '∞');
  });
});
