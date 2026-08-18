import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-errored', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    this.set('url', '/bad/10/silence.mp3');
    await render(
      hbs`{{#if (sound-is-errored this.url)}}sound-is-errored{{else}}is-not-errored{{/if}}`,
    );

    let service = this.owner.lookup('service:stereo');

    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-errored',
      'helper reports no error',
    );
    await service.load(this.url, { silenceErrors: true });
    await render(
      hbs`{{#if (sound-is-errored this.url)}}sound-is-errored{{else}}is-not-errored{{/if}}`,
    );

    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-errored',
      'helper reports error',
    );
  });

  test('one errored sound does not report every other url as errored', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    await service.load('/bad/10/broken.mp3', { silenceErrors: true });

    this.set('url', '/good/1000/fine.mp3');
    await render(
      hbs`{{#if (sound-is-errored this.url)}}sound-is-errored{{else}}is-not-errored{{/if}}`,
    );

    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-errored',
      'a healthy url is unaffected by another sound failing',
    );
  });
});
