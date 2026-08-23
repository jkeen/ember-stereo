import { module, test } from 'qunit';
import SoundIdentityMap from 'ember-stereo/-private/utils/sound-identity-map';

class Sound {
  constructor(options) {
    this.url = options.url;
  }
}

module('Unit | Utility | sound-identity-map', function () {
  test('sounds can be retrieved by url from cache', function (assert) {
    let identityMap = new SoundIdentityMap();

    let sound1 = new Sound({ url: '/test/1' });
    let sound2 = new Sound({ url: '/test/2' });
    let sound3 = new Sound({ url: '/test/3' });

    identityMap.store('/test/1', sound1);
    identityMap.store('/test/2', sound2);
    identityMap.store('/test/3', sound3);

    assert.deepEqual(identityMap.find('/test/1'), sound1);
    assert.deepEqual(identityMap.find('/test/2'), sound2);
    assert.deepEqual(identityMap.find('/test/3'), sound3);
  });

  test('sounds can be retrieved by full url from cache', function (assert) {
    let identityMap = new SoundIdentityMap();

    let sound1 = new Sound({ url: '/test/1' });
    identityMap.store('/test/1', sound1);

    let a = document.createElement('a');
    a.href = '/test/1';

    assert.deepEqual(identityMap.find(a.href), sound1);
  });

  test('sounds can be retrieved by full url from cache ignoring query attributes', function (assert) {
    let identityMap = new SoundIdentityMap();

    let sound1 = new Sound({ url: '/test/1?access_key=1251251251892561' });
    identityMap.store(sound1.url, sound1);

    let a = document.createElement('a');
    a.href = '/test/1?access_key=99999';

    assert.deepEqual(identityMap.find(a.href), sound1);
  });

  test('a promise identifier is its own cache key', function (assert) {
    let identityMap = new SoundIdentityMap();

    let promise = Promise.resolve('/test/1');
    let sound = new Sound({ url: '/test/1' });

    identityMap.store(promise, sound);

    assert.true(identityMap.has(promise));
    assert.deepEqual(identityMap.find(promise), sound);
    assert.notOk(identityMap.find('/test/1'));
  });
});
