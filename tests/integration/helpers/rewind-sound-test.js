import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | rewind-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it rewinds', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/10000/rewind.mp3';
    let { sound } = await service.load(this.url);
    sound.position = 6000;
    assert.equal(sound.position, 6000, 'position is 6000');
    await render(
      hbs`<button type="button" {{on 'click' (rewind-sound this.url)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 0, 'position is 0');
  });

  test('it rewinds custom increment', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/10000/rewind-custom.mp3';
    let { sound } = await service.load(this.url);
    sound.position = 6000;
    assert.equal(sound.position, 6000, 'position is 6000');
    await render(
      hbs`<button type="button" {{on 'click' (rewind-sound this.url increment=1500)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 4500, 'position is 4500');
  });


});
