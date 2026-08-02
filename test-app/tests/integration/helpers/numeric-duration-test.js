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

  test('it renders a numeric duration too', async function (assert) {
    this.set('inputValue', 100000);

    await render(hbs`{{numeric-duration this.inputValue}}`);

    assert.dom(this.element).hasText('01:40');
  });

  test('an endless sound renders as ∞', async function (assert) {
    this.set('inputValue', Infinity);

    await render(hbs`{{numeric-duration this.inputValue}}`);

    assert.dom(this.element).hasText('∞');
  });

  test('a sound with nothing measured yet renders as unknown', async function (assert) {
    // A media element that hasn't established a timeline reports NaN, which
    // used to format as "NaN:NaN".
    this.set('inputValue', NaN);

    await render(hbs`{{numeric-duration this.inputValue}}`);

    assert.dom(this.element).hasText('--:--');
  });
});
