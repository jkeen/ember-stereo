import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | fastforward-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it fast forwards', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/16000/ff.mp3';
    let { sound } = await service.load(this.url);
    assert.equal(sound.position, 0, 'position is zero');
    await render(
      hbs`<button type="button" {{on 'click' (fastforward-sound this.url)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 15000, 'position is 15000');
    sound.stop();
  });

  test('it fast forwards in custom increment', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/2000/ff-custom.mp3';
    let { sound } = await service.load(this.url);
    assert.equal(sound.position, 0, 'position is zero');
    await render(
      hbs`<button type="button" {{on 'click'(fastforward-sound this.url increment=1500)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 1500, 'position is 1500');
    sound.stop();
  });
});
