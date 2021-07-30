import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render  } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-playing', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/25/silence.mp3')
    await render(hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-playing', 'helper reports not playing');
    await service.play(this.url)
    assert.equal(service.isPlaying, true, 'service reports playing');
    assert.equal(this.element.textContent.trim(), 'sound-is-playing', 'helper reports playing');
  });

  test('it renders with url array', async function (assert) {
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{ name: 'DummyConnection' }]);

    this.set('url', ['/good/25/silence.mp3', '/good/2523/silence.mp3'])
    await render(hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-playing', 'helper reports not playing');
    await service.play(this.url)
    assert.equal(service.isPlaying, true, 'service reports playing');
    assert.equal(this.element.textContent.trim(), 'sound-is-playing', 'helper reports playing');
  });

  test('it renders correct status if sound changes', async function(assert) {
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{name: 'DummyConnection'}]);
    await render(hbs`{{#if (sound-is-playing this.url)}}sound-is-playing{{else}}is-not-playing{{/if}}`);

    this.set('url', '/good/10/silence.mp3')
    await service.load(this.url)
    assert.equal(this.element.textContent.trim(), 'is-not-playing');

    await service.play(this.url)

    assert.equal(this.element.textContent.trim(), 'sound-is-playing');
    this.set('url2', '/good/5/second-silence.mp3')
    await service.play(this.url2);
    assert.equal(service.isPlaying, true);
    assert.equal(this.element.textContent.trim(), 'is-not-playing');
  });
});
