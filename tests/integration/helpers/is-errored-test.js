import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | is-errored', function(hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/bad/10/silence.mp3')
    await render(hbs`{{#if (is-errored this.url)}}is-errored{{else}}is-not-errored{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-errored', 'helper reports no error');
    await service.load(this.url);
    assert.equal(this.element.textContent.trim(), 'is-errored', 'helper reports error');
  });
});
