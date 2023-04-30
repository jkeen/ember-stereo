import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | stereo-volume', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.volume = 73;
    await render(hbs`{{stereo-volume}}`);
    assert.strictEqual(
      this.element.textContent.trim(),
      service.volume.toString(),
      'stereo volume reports service volume'
    );
  });
});
