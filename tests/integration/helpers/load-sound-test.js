import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | load-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it can load as an action', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    this.url = '/good/1000/silence.mp3';
    assert.equal(service.currentSound, undefined, 'not loaded');
    await render(hbs`<button type="button" {{on 'click' (load-sound this.url)}}>load</button>`);
    await click('button');
    await render(hbs`{{#if (sound-is-loaded this.url)}}sound-is-loaded{{else}}is-not-loaded{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'sound-is-loaded');
  });
});
