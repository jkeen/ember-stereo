import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Helper | is-loading', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders loading status', async function(assert) {
    let done = assert.async();
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    let Connection = service._connections['DummyConnection']
    this.set('url', '/good/10/silence.mp3')
    let sound = new Connection({url: this.url})

    const setTimeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: sound })
      }, 300);
    });

    sinon.stub(service, '_findFirstPlayableSound').returns(setTimeoutPromise)
    await render(hbs`{{#if (is-loading this.url)}}is-loading{{else}}is-not-loading{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loading');

    service.load(this.url).then(async (sound) => {
      await waitUntil(() => {
        return this.element.textContent.trim() == 'is-not-loading'
      }, { timeout: 2000 });
      assert.equal(this.element.textContent.trim(), 'is-not-loading');
      done();
    });
    await waitUntil(() => {
      return this.element.textContent.trim() == 'is-loading'
    }, { timeout: 2000 });
    assert.equal(this.element.textContent.trim(), 'is-loading');
  });
});
