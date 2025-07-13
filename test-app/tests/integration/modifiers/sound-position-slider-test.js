/* stylelint-disable */
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

  test('change callbacks work', async function (assert) {
    this.url1 = '/good/10000/one.mp3';
    this.url2 = '/good/10000/two.mp3';
    this.url3 = '/good/10000/three.mp3';

    this.bluePosition = null;
    this.greenPosition = null;
    this.redPosition = null;

    this.onBlueChange = (position) => {
      this.bluePosition = position;
    };

    this.onGreenChange = (position) => {
      this.greenPosition = position;
    };

    this.onRedChange = (position) => {
      this.redPosition = position;
    };

    let service = this.owner.lookup('service:stereo');
    let { sound: sound1 } = await service.load(this.url1);
    let { sound: sound2 } = await service.load(this.url2);
    let { sound: sound3 } = await service.load(this.url3);
    await render(
      hbs`
        <div style="color:#FFF; background-color: blue; width: 1000px; height:200px" data-url='{{this.url1}}' {{sound-position-slider this.url1 onChangePosition=this.onBlueChange}}>
          {{sound-position this.url1}}
        </div>
        {{this.bluePosition}}
        <div style="color:#FFF; background-color: green; width: 1000px; height:200px" data-url='{{this.url2}}' {{sound-position-slider this.url2 onChangePosition=this.onGreenChange}}>
          {{sound-position this.url2}}
        </div>
        {{this.greenPosition}}
        <div style="color:#FFF; background-color: red; width: 1000px; height:200px" data-url='{{this.url3}}' {{sound-position-slider this.url3 onChangePosition=this.onRedChange}}>
          {{sound-position this.url3}}
        </div>
        {{this.redPosition}}
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

    assert.strictEqual(this.bluePosition, 5000);
    assert.strictEqual(this.greenPosition, 2000);
    assert.strictEqual(this.redPosition, 9500);

    assert.ok(true);
  });

  test('change callbacks work with manual data', async function (assert) {
    assert.expect(13);

    this.id1 = 'blue';
    this.id2 = 'green';
    this.id3 = 'red';

    this.bluePosition = 100;
    this.greenPosition = 100;
    this.redPosition = 100;
    this.duration = 10000;

    this.onBlueChange = (position) => {
      assert.ok(true, 'blue changed');
      this.bluePosition = position;
    };

    this.onGreenChange = (position) => {
      assert.ok(true, 'green changed');
      this.greenPosition = position;
    };

    this.onRedChange = (position) => {
      assert.ok(true, 'red changed');
      this.redPosition = position;
    };

    await render(
      hbs`
        <div style="color:#FFF; background-color: blue; width: 1000px; height:200px" data-id='{{this.id1}}' {{sound-position-slider position=this.bluePosition duration=this.duration onChangePosition=this.onBlueChange}}>
          {{sound-position position=this.bluePosition}}
        </div>
        <div style="color:#FFF; background-color: green; width: 1000px; height:200px" data-id='{{this.id2}}' {{sound-position-slider position=this.greenPosition duration=this.duration onChangePosition=this.onGreenChange}}>
          {{sound-position position=this.greenPosition}}
        </div>
        <div style="color:#FFF; background-color: red; width: 1000px; height:200px" data-id='{{this.id3}}' {{sound-position-slider position=this.redPosition duration=this.duration onChangePosition=this.onRedChange}}>
          {{sound-position position=this.redPosition}}
        </div>
      `
    );

    assert.dom('[data-sound-position-slider]').exists({ count: 3 });
    assert.dom(`[data-id='${this.id1}']`).containsText('100');
    assert.dom(`[data-id='${this.id2}']`).containsText('100');
    assert.dom(`[data-id='${this.id3}']`).containsText('100');

    let targetPercent = (id, pct) => {
      let dimensions = this.element
        .querySelector(`[data-id='${id}']`)
        .getBoundingClientRect();
      return dimensions.left + dimensions.width * (pct / 100);
    };

    await click(`[data-id='${this.id1}']`, {
      clientX: targetPercent(this.id1, 50),
      clientY: 100,
    });
    await click(`[data-id='${this.id2}']`, {
      clientX: targetPercent(this.id1, 20),
      clientY: 100,
    });
    await click(`[data-id='${this.id3}']`, {
      clientX: targetPercent(this.id1, 95),
      clientY: 100,
    });

    assert.strictEqual(this.bluePosition, 5000, 'blue position correct');
    assert.strictEqual(this.greenPosition, 2000, 'green position correct');
    assert.strictEqual(this.redPosition, 9500, 'red position correct');
  });
});
