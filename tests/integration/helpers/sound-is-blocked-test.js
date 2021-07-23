import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-blocked', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{ name: 'DummyConnection' }]);

    this.set('url', '/good/10/silence.mp3')
    await render(hbs`{{#if (sound-is-blocked this.url)}}needs input{{/if}}`);
    assert.equal(this.element.textContent.trim(), '', 'does not need user input');
    await service.play(this.url);

    service.findLoaded(this.url).isBlocked = true
    await render(hbs`{{#if (sound-is-blocked this.url)}}needs input{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'needs input', 'needs user input');
  });
});
