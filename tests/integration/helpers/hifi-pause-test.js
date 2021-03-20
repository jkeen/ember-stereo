import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hifi-pause', function(hooks) {
  setupRenderingTest(hooks);

  test('it can pause as an action', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/1000/silence.mp3';
    await service.play(this.url);
    assert.equal(service.isPlaying, true, 'playing');
    await render (hbs`<button type="button" {{on 'click' (hifi-pause this.url)}}>stop</button>`);
    await click('button');
    assert.equal(service.isPlaying, false, 'is not playing');
  });
});
