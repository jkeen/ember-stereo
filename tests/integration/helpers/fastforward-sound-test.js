import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';

module('Integration | Helper | fastforward-sound', function(hooks) {
  setupRenderingTest(hooks);

  test('it fast forwards', async function(assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections ([{name: 'DummyConnection'}]);
    this.url = '/good/10000/silence.mp3';
    let { sound } = await service.load(this.url);
    assert.equal(sound.position, 0, 'position is zero')
    await render (hbs`<button type="button" {{on 'click' (fastforward-sound this.url)}}>fast forward</button>`);
    await click('button');
    assert.equal (sound.position, 5000, 'position is 5000');
  });

  test('it fast forwards in custom increment', async function(assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{name: 'DummyConnection'}]);
    this.url = '/good/10000/silence.mp3';
    let {sound} = await service.load(this.url);
    assert.equal(sound.position, 0, 'position is zero');
    await render(
      hbs`<button type="button" {{on 'click'(fastforward-sound this.url increment=1500)}}>fast forward</button>`
    );
    await click('button');
    assert.equal(sound.position, 1500, 'position is 1500');
  });
});
