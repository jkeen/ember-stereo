import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | seek-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it seeks to seconds', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/9000/seek.mp3';
    let { sound } = await service.load(this.url);
    sound.position = 6000;
    assert.equal(sound.position, 6000, 'position is 6000');
    await render(
      hbs`<button type="button" {{on 'click' (seek-sound this.url position=2 unit='seconds')}}>seek</button>`
    );
    await click('button');
    assert.equal(sound.position, 2000, 'position is 15000');
    sound.stop();
  });

  test('it seeks to percentage', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/10000/seek-percent.mp3';
    let { sound } = await service.load(this.url);
    sound.position = 6000;
    assert.equal(sound.position, 6000, 'position is 6000');
    await render(
      hbs`<button type="button" {{on 'click' (seek-sound this.url position=0 unit='percentage')}}>seek</button>`
    );
    await click('button');
    assert.equal(sound.position, 0, 'position is 0');
    sound.stop();
  });
});
