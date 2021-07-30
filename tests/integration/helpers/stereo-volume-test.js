import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | stereo-volume', function(hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{ name: 'DummyConnection' }]);
    service.volume = 73;
    await render(hbs`{{stereo-volume}}`);
    assert.equal(this.element.textContent.trim(), service.volume, 'stereo volume reports service volume');
  });
});
