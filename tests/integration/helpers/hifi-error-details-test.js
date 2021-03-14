import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hifi-error-details', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders error of errored sound', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{name: 'DummyConnection'}]);
    this.url = '/bad/10/silence.mp3';
    try {
      await service.load(this.url);
    }
    catch(e) {
      // TODO: should this really be an error thrown? 
    }
    await render(hbs`{{hifi-error-details this.url}}`);

    assert.equal(this.element.textContent.trim(), 'failed to load');
  });

});
