import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import { render, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-loading', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders loading status', async function (assert) {
    assert.expect(3);
    let service = this.owner.lookup('service:stereo');
    this.set('url', '/good/3/silence.mp3');

    await render(
      hbs`{{#if (sound-is-loading this.url)}}sound-is-loading{{else}}is-not-loading{{/if}}`
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports not loading'
    );

    service.load(this.url);
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading';
    });
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-loading',
      'helper reports loading when loading'
    );

    await waitUntil(
      () => {
        return this.element.textContent.trim() == 'is-not-loading';
      },
      { timeout: 5000 }
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports loading'
    );
  });

  test('it renders loading status when url is a function', async function (assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:stereo');

    this.set('url', '/good/3/loading.mp3');
    this.set(
      'urlPromise',
      new Promise((resolve) => setTimeout(() => resolve([this.url]), 300))
    );
    this.set('urlFunction', () => this.url);

    await render(
      hbs`{{#if (sound-is-loading this.urlFunction)}}sound-is-loading{{else}}is-not-loading{{/if}}`
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports not loading'
    );

    service.load(this.urlFunction);
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading';
    });

    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-loading',
      'helper reports loading'
    );

    await waitUntil(
      () => {
        return this.element.textContent.trim() == 'is-not-loading';
      },
      { timeout: 5000 }
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports not loading when finished'
    );
  });

  test('it renders loading status when url is a promise', async function (assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:stereo');

    this.set('url', '/good/3/loading-promise.mp3');
    this.set(
      'urlPromise',
      new Promise((resolve) => setTimeout(() => resolve(this.url), 100))
    );
    this.set('urlFunction', () => this.url);

    await render(
      hbs`{{#if (sound-is-loading this.urlPromise)}}sound-is-loading{{else}}is-not-loading{{/if}}`
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports not loading'
    );

    service.load(this.urlPromise);
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading';
    });
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-loading',
      'helper reports not loading when finished'
    );

    await waitUntil(
      () => {
        return this.element.textContent.trim() == 'is-not-loading';
      },
      { timeout: 5000 }
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports loading'
    );
  });

  test('it renders system loading status', async function (assert) {
    assert.expect(3);

    let done = assert.async();
    let service = this.owner.lookup('service:stereo');
    this.set('url', '/good/3/loading-system.mp3');

    await render(
      hbs`{{#if (sound-is-loading this.url)}}sound-is-loading{{else}}is-not-loading{{/if}}`
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports not loading'
    );

    service.load(this.url).then(async () => {
      await waitUntil(
        () => {
          return this.element.textContent.trim() == 'is-not-loading';
        },
        { timeout: 5000 }
      );
      assert.strictEqual(
        this.element.textContent.trim(),
        'is-not-loading',
        'helper reports loading'
      );
      done();
    });
    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading';
    });
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-loading',
      'helper reports not loading when finished'
    );
  });

  test('it renders loading status when url is an array', async function (assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:stereo');

    this.set('url', [
      '/good/200/loading-array.mp3',
      '/good/1000/loading-arry-2.mp3',
    ]);

    await render(
      hbs`{{#if (sound-is-loading this.url)}}sound-is-loading{{else}}is-not-loading{{/if}}`
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports not loading'
    );

    service.load(this.url[0]);

    await waitUntil(() => {
      return this.element.textContent.trim() == 'sound-is-loading';
    });
    assert.strictEqual(
      this.element.textContent.trim(),
      'sound-is-loading',
      'helper reports not loading when finished'
    );

    // done loading
    await waitUntil(
      () => {
        return this.element.textContent.trim() == 'is-not-loading';
      },
      { timeout: 500 }
    );
    assert.strictEqual(
      this.element.textContent.trim(),
      'is-not-loading',
      'helper reports not loading'
    );
  });
});
