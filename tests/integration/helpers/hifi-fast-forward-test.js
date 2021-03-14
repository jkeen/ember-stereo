import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hifi-fast-forward', function(hooks) {
  setupRenderingTest(hooks);

  test('it fast forwards', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections ([{name: 'DummyConnection'}]);
    this.url = '/good/10000/silence.mp3';
    let { sound } = await service.load(this.url);
    assert.equal(sound.position, 0, 'position is zero')
    await render (hbs`<button type="button" {{on 'click' (hifi-fast-forward this.url)}}>fast forward</button>`);
    await click('button');
    assert.equal (sound.position, 5000, 'position is 5000');
  });

  test('it fast forwards in custom increment', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{name: 'DummyConnection'}]);
    this.url = '/good/10000/silence.mp3';
    let {sound} = await service.load(this.url);
    assert.equal(sound.position, 0, 'position is zero');
    await render(
      hbs`<button type="button" {{on 'click'(hifi-fast-forward this.url increment=1500)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 1500, 'position is 1500');
  });

});
