import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
module('Integration | Helper | play-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it can play as an action', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/1000/toggle.mp3';
    assert.false(service.isPlaying, 'not playing');
    await render(hbs`<button type="button" {{on 'click' (play-sound this.url)}}>toggle</button>`);
    await click('button');
    assert.true(service.isPlaying, 'is playing');
  });

  test('it handles errors when play as an action', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/bad/http-500/nope-sound.mp3';
    assert.false(service.isPlaying, 'not playing');
    await render(
      hbs`<button type="button" {{on 'click' (play-sound this.url)}}>play</button>`
    );
    await click('button');

    assert.false(service.isPlaying, 'is playing');
  });
});
