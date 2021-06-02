import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

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
});
