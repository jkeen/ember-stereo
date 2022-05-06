import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';

module('Integration | Helper | current-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  setupCustomAssertions(hooks);

  test('it loads', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/500/silence.mp3';
    await service.play(this.url);
    service.pause();

    await render(hbs`{{get (current-sound) 'url'}}`);
    assert.equalUrls(
      this.element.textContent.trim(),
      this.url,
      'returns current sound'
    );
  });
});
