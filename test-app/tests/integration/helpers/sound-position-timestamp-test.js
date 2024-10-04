import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { add } from 'date-fns';

module('Integration | Helper | sound-position-timestamp', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test('it renders nothing if not loaded', async function (assert) {
    this.url = '/good/10/position.mp3';
    await render(hbs`{{sound-position-timestamp this.url}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('it returns the correct timestamp when startsAt is provided', async function (assert) {
    this.set('position', 144000);
    this.set('startsAt', new Date('2023-10-01T00:00:00Z'));

    await render(
      hbs`{{sound-position-timestamp position=this.position startsAt=this.startsAt}}`
    );

    let expectedDate = add(new Date('2023-10-01T00:00:00Z'), { seconds: 144 });
    assert.strictEqual(
      this.element.textContent.trim(),
      expectedDate.toString()
    );
  });

  test('it returns undefined when neither currentTime nor startsAt is provided', async function (assert) {
    this.set('position', 144000);

    await render(hbs`{{sound-position-timestamp position=this.position}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });
});
