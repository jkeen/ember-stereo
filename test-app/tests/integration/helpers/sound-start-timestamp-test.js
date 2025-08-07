import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import HLSAudio from 'ember-stereo/stereo-connections/hls';
import sinon from 'sinon';
module('Integration | Helper | sound-start-timestamp', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test('it renders nothing if not loaded', async function (assert) {
    this.url = '/good/10/position.mp3';
    await render(hbs`{{sound-start-timestamp this.url}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('it renders start time if sound is not loaded', async function (assert) {
    this.url = '/good/10/position.mp3';
    this.set('startsAt', new Date('2023-10-01T00:00:00Z'));

    await render(
      hbs`{{sound-start-timestamp this.url startsAt=this.startsAt}}`
    );

    let expectedDate = new Date('2023-10-01T00:00:00Z');
    assert.strictEqual(
      this.element.textContent.trim(),
      expectedDate.toString()
    );
  });

  test('it returns the correct timestamp when startsAt is provided', async function (assert) {
    this.url = '/good/10000/position.mp3';
    this.set('startsAt', new Date('2023-10-01T00:00:00Z'));

    await render(
      hbs`{{sound-start-timestamp this.url startsAt=this.startsAt}}`
    );

    let expectedDate = this.startsAt;
    assert.strictEqual(
      this.element.textContent.trim(),
      expectedDate.toString()
    );
  });

  test('it returns undefined when neither currentTime nor startsAt is provided', async function (assert) {
    this.set('position', 144000);

    await render(hbs`{{sound-start-timestamp position=this.position}}`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('it returns the correct timestamp when startTime is provided', async function (assert) {
    let time = new Date('2023-10-02T00:00:00Z');

    this.sound = new HLSAudio({
      url: '/good/5000/position.mp3',
      timeout: false,
    });
    sinon.stub(this.sound, 'isLoaded').get(() => true);

    sinon.stub(this.sound, 'startTime').get(() => time);
    await render(hbs`{{sound-start-timestamp this.sound}}`);

    assert.strictEqual(this.element.textContent.trim(), time.toString());
  });
});
