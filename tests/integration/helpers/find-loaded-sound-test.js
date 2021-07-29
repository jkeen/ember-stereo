import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';

module('Integration | Helper | find-loaded-sound', function (hooks) {
  setupRenderingTest(hooks);
  setupCustomAssertions(hooks)

  test('it loads', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10000/silence.mp3';
    await service.play(this.url);
    service.pause();

    await render(hbs`{{get (find-loaded-sound this.url) 'url'}}`);
    assert.equalUrls(this.element.textContent.trim(), this.url, 'returns loaded sound');
  });

});
