import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | stereo-volume', function (hooks) {
  setupRenderingTest(hooks);


  test('it renders', async function (assert) {
    await render(hbs`<div {{stereo-volume}}></div>`);

    assert.ok(true);
  });
});
