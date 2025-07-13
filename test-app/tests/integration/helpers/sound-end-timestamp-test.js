import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { add } from 'date-fns';
import HLSAudio from 'ember-stereo/stereo-connections/hls';
import sinon from 'sinon';

module('Integration | Helper | sound-end-timestamp', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test('it renders nothing if not loaded', async function (assert) {
    this.url = '/good/10/position.mp3';
    await render(hbs`{{sound-end-timestamp this.url}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('it renders fallback end time if sound is not loaded', async function (assert) {
    this.url = '/good/10/position.mp3';
    this.set('endsAt', new Date('2023-10-01T00:00:00Z'));

    await render(hbs`{{sound-end-timestamp this.url endsAt=this.endsAt}}`);

    let expectedDate = new Date('2023-10-01T00:00:00Z');
    assert.strictEqual(
      this.element.textContent.trim(),
      expectedDate.toString()
    );
  });

  test('it returns undefined when neither currentTime nor startsAt is provided', async function (assert) {
    this.set('position', 144000);

    await render(hbs`{{sound-end-timestamp position=this.position}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('it returns the correct timestamp when endTime is provided', async function (assert) {
    let time = new Date('2023-10-02T00:00:00Z');

    this.sound = new HLSAudio({
      url: '/good/5000/position.mp3',
      timeout: false,
    });
    sinon.stub(this.sound, 'isLoaded').get(() => true);

    sinon.stub(this.sound, 'endTime').get(() => time);
    await render(hbs`{{sound-end-timestamp this.sound}}`);

    assert.strictEqual(this.element.textContent.trim(), time.toString());
  });
});
