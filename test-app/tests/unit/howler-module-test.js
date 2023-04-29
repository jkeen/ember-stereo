import { module, test } from 'qunit';
import { Howl, Howler } from '.../../../../node_modules/howler/dist/howler.js';

module('howler as an ES6 module', function () {
  test('it works', function (assert) {
    assert.ok(Howl, 'howl exists');
    assert.ok(Howler, 'howler exists');
  });
});
