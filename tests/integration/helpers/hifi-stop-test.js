import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hifi-stop', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders position of sound if loaded', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/1000/silence.mp3';
    assert.equal(service.isPlaying, false, 'not playing');
    await render(hbs`{{hifi-play this.url}}`);
    assert.equal(service.isPlaying, false, 'is playing');
  });
});
