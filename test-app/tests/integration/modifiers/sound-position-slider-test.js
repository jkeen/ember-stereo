import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Integration | Modifier | sound-position-slider', function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);

  test('it renders', async function (assert) {
    this.url1 = '/good/10000/one.mp3';
    this.url2 = '/good/10000/two.mp3';
    this.url3 = '/good/10000/three.mp3';

    let service = this.owner.lookup('service:stereo');
    let { sound: sound1 } = await service.load(this.url1);
    let { sound: sound2 } = await service.load(this.url2);
    let { sound: sound3 } = await service.load(this.url3);
    await render(
      hbs`
        <div style="color:#FFF; background-color: blue; width: 1000px; height:200px" data-url='{{this.url1}}' {{sound-position-slider this.url1}}>{{sound-position this.url1}}</div>
        <div style="color:#FFF; background-color: green; width: 1000px; height:200px" data-url='{{this.url2}}' {{sound-position-slider this.url2}}>{{sound-position this.url2}}</div>
        <div style="color:#FFF; background-color: red; width: 1000px; height:200px" data-url='{{this.url3}}' {{sound-position-slider this.url3}}>{{sound-position this.url3}}</div>
        `
    );

    assert.dom('[data-sound-position-slider]').exists({ count: 3 });

    let targetPercent = (url, pct) => {
      let dimensions = this.element
        .querySelector(`[data-url='${url}']`)
        .getBoundingClientRect();
      return dimensions.left + dimensions.width * (pct / 100);
    };

    await click(`[data-url='${this.url1}']`, {
      clientX: targetPercent(this.url1, 50),
      clientY: 100,
    });
    await click(`[data-url='${this.url2}']`, {
      clientX: targetPercent(this.url1, 20),
      clientY: 100,
    });
    await click(`[data-url='${this.url3}']`, {
      clientX: targetPercent(this.url1, 95),
      clientY: 100,
    });

    assert.strictEqual(sound1.position, 5000);
    assert.strictEqual(sound2.position, 2000);
    assert.strictEqual(sound3.position, 9500);

    assert.ok(true);
  });
});
