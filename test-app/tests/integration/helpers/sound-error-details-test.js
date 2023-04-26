import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-error-details', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders error of errored sound', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/bad/codec-error/silence.mp3';
    await service.load(this.url, { silenceErrors: true });
    await render(hbs`{{sound-error-details this.url}}`);
    assert.strictEqual(this.element.textContent.trim(), 'codec-error');
  });
});
