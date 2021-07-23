import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | autoplay-allowed', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    await render(hbs`{{#if (autoplay-allowed)}}Autoplay Allowed{{/if}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
