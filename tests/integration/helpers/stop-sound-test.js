import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | stop-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it can stop as an action', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/1000/stop.mp3';
    await service.play(this.url);
    assert.true(service.isPlaying, 'playing');
    await render(hbs`<button type="button" {{on 'click' (stop-sound this.url)}}>stop</button>`);
    await click('button');
    assert.false(service.isPlaying, 'is not playing');
  });
});
