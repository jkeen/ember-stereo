import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Integration | Modifier | sound-position-progress', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders position of one sound', async function (assert) {
    this.url1 = '/good/10000/one.mp3';
    this.url2 = '/good/10000/two.mp3';

    await render(
      hbs`
        <div data-url='{{this.url1}}' {{sound-position-progress this.url1}}>one</div>
        <div data-url='{{this.url2}}' {{sound-position-progress this.url2}}>two</div>
        `
    );

    let service = this.owner.lookup('service:stereo');
    let { sound: sound1 } = await service.load(this.url1);
    let { sound: sound2 } = await service.load(this.url2);

    assert.dom('[data-sound-position-progress]').exists({ count: 2 });

    assert.dom(`[data-url='${this.url1}']`).hasStyle({ width: '0px' });
    assert.dom(`[data-url='${this.url2}']`).hasStyle({ width: '0px' });

    sound1.position = 2000;

    await settled();

    assert
      .dom(`[data-url='${this.url1}']`)
      .hasAttribute('style', 'width: 20%; pointer-events: none;');
    assert
      .dom(`[data-url='${this.url2}']`)
      .hasAttribute('style', 'width: 0%; pointer-events: none;');

    sound2.position = 8000;

    await settled();

    assert
      .dom(`[data-url='${this.url1}']`)
      .hasAttribute('style', 'width: 20%; pointer-events: none;');
    assert
      .dom(`[data-url='${this.url2}']`)
      .hasAttribute('style', 'width: 80%; pointer-events: none;');
  });
});
