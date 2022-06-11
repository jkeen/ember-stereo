import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
import Sound from 'ember-stereo/models/sound';

module('Unit | Models | sound test', function (hooks) {
  setupTest(hooks);
  setupStereoTest(hooks);

  hooks.beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  hooks.afterEach(function () {
    sandbox.restore();
  });

  test('instantiating two sounds with the same identifier should return the same object', function (assert) {
    let loadCount = 0;
    let testUrl = 'https://ember-stereo.com/test-sound.aac';
    let loadPromise = new Promise((resolve, reject) => {
      loadCount = loadCount + 1;
      return testUrl;
    })

    let s1 = new Sound(loadPromise);
    let s2 = new Sound(loadPromise);

    assert.strictEqual(s1.url, testUrl);
    assert.strictEqual(s2.url, testUrl);
    assert.strictEqual(loadCount, 1, 'promise should have only run once');
  });
});
