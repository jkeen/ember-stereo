import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | toggle-play-sound', function(hooks) {
  setupRenderingTest(hooks);

  test('it can toggle play as an action', async function(assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/1000/silence.mp3';
    assert.false(service.isPlaying, 'not playing');
    await render (hbs`<button type="button" {{on 'click' (toggle-play-sound this.url)}}>toggle</button>`);
    await click('button');
    assert.true(service.isPlaying, 'is playing');
    await click('button');
    assert.false(service.isPlaying, 'is not playing');
  });
});
