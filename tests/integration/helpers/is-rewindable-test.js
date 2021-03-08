import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | is-rewindable', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/10/rewindable-test.mp3')
    await service.play(this.url)
    await render(hbs`{{#if (is-rewindable this.url)}}is-rewindable{{else}}is-not-rewindable{{/if}}`);
    assert.equal(service.isRewindable, true, "service says its rewindable");
    assert.equal(this.element.textContent.trim(), 'is-rewindable', "helper says its rewindable");

    this.set('url', '/good/stream/stream.mp3')
    assert.equal(this.element.textContent.trim(), 'is-not-rewindable', 'helper updated when url changed');
  });
});
