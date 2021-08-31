import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | autoplay-allowed', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {

    await render(hbs`{{#if (autoplay-allowed)}}Autoplay Allowed{{/if}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});

module('Integration | Helper | autoplay-allowed (stubbed)', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks)
  test('it renders', async function (assert) {

    await render(hbs`{{#if (autoplay-allowed)}}Autoplay Allowed{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'Autoplay Allowed');
  });
});
