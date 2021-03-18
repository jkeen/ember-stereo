import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hifi-error-details', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders error of errored sound', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{name: 'DummyConnection'}]);
    this.url = '/bad/codec-error/silence.mp3';
    await service.load(this.url);
    await render(hbs`{{hifi-error-details this.url}}`);
    assert.equal(this.element.textContent.trim(), 'codec-error');
  });

});
