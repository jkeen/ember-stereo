import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | play-sound', function(hooks) {
  setupRenderingTest(hooks);

  test('it can play as an action', async function(assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/1000/silence.mp3';
    assert.equal(service.isPlaying, false, 'not playing');
    await render (hbs`<button type="button" {{on 'click' (play-sound this.url)}}>play</button>`);
    await click('button');

    assert.equal(service.isPlaying, true, 'is playing');
  });

  test('it handles errors when play as an action', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/bad/1000/nope-sound.mp3';
    assert.equal(service.isPlaying, false, 'not playing');
    await render(hbs`<button type="button" {{on 'click' (play-sound this.url)}}>play</button>`);
    await click('button');

    assert.equal(service.isPlaying, false, 'is playing');
  });
});
