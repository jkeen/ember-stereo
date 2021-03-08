import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | is-loaded', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/10/silence.mp3')
    await render(hbs`{{#if (is-loaded this.url)}}is-loaded{{else}}is-not-loaded{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loaded');
    await service.load(this.url);
    assert.equal(this.element.textContent.trim(), 'is-loaded');
  });

});
