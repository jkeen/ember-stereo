import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | is-fastforwardable', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/10/fastforwardable-test.mp3')
    await service.play(this.url)
    await render(hbs`{{#if (is-fastforwardable this.url)}}is-fastforwardable{{else}}is-not-fastforwardable{{/if}}`);
    assert.equal(service.isFastForwardable, true, "service says its fastforwardable");
    assert.equal(this.element.textContent.trim(), 'is-fastforwardable', "helper says its fastforwardable");

    this.set('url', '/good/stream/stream.mp3')
    assert.equal(this.element.textContent.trim(), 'is-not-fastforwardable', 'helper updated when url changed');
  });
});