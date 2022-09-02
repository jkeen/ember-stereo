import { module, test } from 'qunit';
import SoundCache from 'ember-stereo/-private/utils/sound-cache';

class Sound {
  constructor(options) {
    this.url = options.url;
  }
}

module('Unit | Utility | sound-cache', function () {
  test('sounds can be retrieved by url from cache', function (assert) {
    assert.expect(3);
    let soundCache = new SoundCache();

    let sound1 = new Sound({ url: '/test/1' });
    let sound2 = new Sound({ url: '/test/2' });
    let sound3 = new Sound({ url: '/test/3' });

    soundCache.cache(sound1);
    soundCache.cache(sound2);
    soundCache.cache(sound3);

    assert.deepEqual(soundCache.find('/test/1'), sound1);
    assert.deepEqual(soundCache.find('/test/2'), sound2);
    assert.deepEqual(soundCache.find('/test/3'), sound3);
  });

  test('sounds can be retrieved by full url from cache', function (assert) {
    let soundCache = new SoundCache();

    let sound1 = new Sound({ url: '/test/1' });
    soundCache.cache(sound1);

    let a = document.createElement('a');
    a.href = '/test/1';

    assert.deepEqual(soundCache.find(a.href), sound1);
  });

  test('sounds can be retrieved by full url from cache ignoring query attributes', function (assert) {
    let soundCache = new SoundCache();

    let sound1 = new Sound({ url: '/test/1?access_key=1251251251892561' });
    soundCache.cache(sound1);

    let a = document.createElement('a');
    a.href = '/test/1?access_key=99999';

    assert.deepEqual(soundCache.find(a.href), sound1);
  });
});
