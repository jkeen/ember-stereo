import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';

import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | numeric-duration', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    this.set('inputValue', '100000');

    await render(hbs`{{numeric-duration this.inputValue}}`);

    assert.dom(this.element).hasText('01:40');
  });
});
