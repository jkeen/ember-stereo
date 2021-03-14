import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | hifi-load', function(hooks) {
  setupRenderingTest(hooks);

  test('it can load as an action', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/1000/silence.mp3';
    assert.equal(service.currentSound, undefined, 'not loaded');
    await render(hbs`<button type="button" {{on 'click' (hifi-load this.url)}}>load</button>`);
    await click('button');
    await render(hbs`{{#if (is-loaded this.url)}}is-loaded{{else}}is-not-loaded{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-loaded');
  });
});
