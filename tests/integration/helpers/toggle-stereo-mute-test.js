import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | toggle-mute', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it toggles mute', async function (assert) {
    let service = this.owner.lookup('service:stereo');

    service.volume = 73;
    await render(
      hbs`<button type="button" {{on 'click' (toggle-stereo-mute)}}>mute</button>`
    );
    await click('button');
    assert.equal(service.volume, 0, 'volume is 0');

    await click('button');
    assert.equal(service.volume, 73, 'volume is 73');
  });
});
