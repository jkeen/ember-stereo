import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | pause-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it can pause as an action', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/1000/pause.mp3';
    await service.play(this.url);
    assert.true(service.isPlaying, 'playing');
    await render(
      hbs`<button type="button" {{on 'click' (pause-sound this.url)}}>stop</button>`,
    );
    await click('button');
    assert.false(service.isPlaying, 'is not playing');
  });

  test('re-rendering with a different identifier pauses the new sound', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    let firstUrl = '/good/1000/first.mp3';
    let secondUrl = '/good/1000/second.mp3';

    await service.load(firstUrl);
    this.target = service.findSound(firstUrl).connection;

    await render(
      hbs`<button type="button" {{on 'click' (pause-sound this.target)}}>pause</button>`,
    );

    await service.play(secondUrl);
    assert.true(service.isPlaying, 'the second sound is playing');

    this.set('target', secondUrl);
    await click('button');

    assert.false(service.isPlaying, 'the second sound was paused, not the first');
  });
});
