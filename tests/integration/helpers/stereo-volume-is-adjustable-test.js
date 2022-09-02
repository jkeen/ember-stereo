import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | stereo-volume-is-adjustable', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test('it renders correctly', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.isMobileDevice = false;
    await render(
      hbs`{{#if (stereo-volume-is-adjustable)}}Adjustable{{else}}Not Adjustable{{/if}}`
    );
    assert.equal(
      this.element.textContent.trim(),
      'Adjustable',
      'stereo volume reports service volume adjustable'
    );

    service.isMobileDevice = true;
    await render(
      hbs`{{#if (stereo-volume-is-adjustable)}}Adjustable{{else}}Not Adjustable{{/if}}`
    );
    assert.equal(
      this.element.textContent.trim(),
      'Not Adjustable',
      'stereo volume reports service volume not adjustable'
    );
  });
});
