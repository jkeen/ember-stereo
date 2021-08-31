import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-fastforwardable', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo')

    this.set('url', '/good/10/fastforwardable-test.mp3')
    await service.play(this.url)
    await render(hbs`{{#if (sound-is-fastforwardable this.url)}}sound-is-fastforwardable{{else}}is-not-fastforwardable{{/if}}`);
    assert.true(service.isFastForwardable, "service says its fastforwardable");
    assert.equal(this.element.textContent.trim(), 'sound-is-fastforwardable', "helper says its fastforwardable");

    this.set('url', '/good/stream/stream.mp3')
    assert.equal(this.element.textContent.trim(), 'is-not-fastforwardable', 'helper updated when url changed');
  });
});
