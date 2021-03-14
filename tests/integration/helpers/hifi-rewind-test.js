import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hifi-rewind', function(hooks) {
  setupRenderingTest(hooks);

  test('it rewinds', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{name: 'DummyConnection'}]);
    this.url = '/good/10000/silence.mp3';
    let {sound} = await service.load(this.url);
    sound.position = 6000;
    assert.equal(sound.position, 6000, 'position is 6000');
    await render(
      hbs`<button type="button" {{on 'click' (hifi-rewind this.url)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 1000, 'position is 1000');
  });

  test('it rewinds custom increment', async function (assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{name: 'DummyConnection'}]);
    this.url = '/good/10000/silence.mp3';
    let {sound} = await service.load(this.url);
    sound.position = 6000;
    assert.equal(sound.position, 6000, 'position is 6000');
    await render(
      hbs`<button type="button" {{on 'click' (hifi-rewind this.url increment=1500)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 4500, 'position is 4500');
  });


});
