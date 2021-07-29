import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-loading', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders loading status', async function(assert) {
    let done = assert.async();
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{name: 'DummyConnection'}]);
    this.set('url', '/good/3/silence.mp3')

    await render(hbs`{{#if (sound-is-loading this.url)}}sound-is-loading{{else}}is-not-loading{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports not loading');

    service.load(this.url).then(async () => {
      await waitUntil(() => {
        return this.element.textContent.trim() == 'is-not-loading'
      }, { timeout: 5000 });
      assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports loading');
      done();
    });
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading'
    });
    assert.equal(this.element.textContent.trim(), 'sound-is-loading', 'helper reports not loading when finished');
  });

  test('it renders loading status when url is a function', async function(assert) {
    let done = assert.async();
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/3/silence.mp3')
    this.set('urlPromise', new Promise((resolve) => setTimeout(() => resolve([this.url]), 300)))
    this.set('urlFunction', () => this.url)

    await render(hbs`{{#if (sound-is-loading this.urlFunction)}}sound-is-loading{{else}}is-not-loading{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports not loading');

    service.load(this.urlFunction).then(async () => {
      // done loading
      await waitUntil(() => {
        return this.element.textContent.trim() == 'is-not-loading'
      }, { timeout: 5000 });
      assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports loading');
      done();
    });
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading'
    });
    assert.equal(this.element.textContent.trim(), 'sound-is-loading', 'helper reports not loading when finished');
  });

  test('it renders loading status when url is a promise', async function(assert) {
    let done = assert.async();
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/3/silence.mp3')
    this.set('urlPromise', new Promise((resolve) => setTimeout(() => resolve(this.url), 100)))
    this.set('urlFunction', () => this.url)

    await render(hbs`{{#if (sound-is-loading this.urlPromise)}}sound-is-loading{{else}}is-not-loading{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports not loading');

    service.load(this.urlPromise).then(async () => {
      await waitUntil(() => {
        return this.element.textContent.trim() == 'is-not-loading'
      }, { timeout: 5000 });
      assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports loading');
      done();
    });
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading'
    });
    assert.equal(this.element.textContent.trim(), 'sound-is-loading', 'helper reports not loading when finished');
  });

  test('it renders system loading status', async function (assert) {
    let done = assert.async();
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.set('url', '/good/3/silence.mp3')

    await render(hbs`{{#if (sound-is-loading this.url)}}sound-is-loading{{else}}is-not-loading{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports not loading');

    service.load(this.url).then(async () => {
      await waitUntil(() => {
        return this.element.textContent.trim() == 'is-not-loading'
      }, { timeout: 5000 });
      assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports loading');
      done();
    });
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading'
    });
    assert.equal(this.element.textContent.trim(), 'sound-is-loading', 'helper reports not loading when finished');
  });

  test('it renders loading status when url is an array', async function (assert) {
    let done = assert.async();
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{ name: 'DummyConnection' }]);

    this.set('url', ['/good/3/silence.mp3', '/good/5000/silent.mp3'])

    await render(hbs`{{#if (sound-is-loading this.url)}}sound-is-loading{{else}}is-not-loading{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports not loading');

    service.load('/good/3/silence.mp3').then(async () => {
      // done loading
      await waitUntil(() => {
        return this.element.textContent.trim() == 'is-not-loading'
      }, { timeout: 5000 });
      assert.equal(this.element.textContent.trim(), 'is-not-loading', 'helper reports loading');
      done();
    });
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading'
    });
    assert.equal(this.element.textContent.trim(), 'sound-is-loading', 'helper reports not loading when finished');
  });
});
