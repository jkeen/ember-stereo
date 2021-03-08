import { module, test } from 'qunit';

module('Unit | Utility | error-cache', function() {
  test("sounds can be retrieved by url from cache", function(assert) {
    assert.expect(3);
    let soundCache = new SoundCache()

    let sound1 = Sound.create({url: '/test/1'});
    let sound2 = Sound.create({url: '/test/2'});
    let sound3 = Sound.create({url: '/test/3'});

    service.cache(sound1);
    service.cache(sound2);
    service.cache(sound3);

    assert.deepEqual(service.find('/test/1'), sound1);
    assert.deepEqual(service.find('/test/2'), sound2);
    assert.deepEqual(service.find('/test/3'), sound3);
  });

});




