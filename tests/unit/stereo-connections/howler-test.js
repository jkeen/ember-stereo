import { A } from '@ember/array';
import { module, test, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import HowlerConnection from 'ember-stereo/stereo-connections/howler';
import {
  setupStereoTest,
} from 'ember-stereo/test-support/stereo-setup';


module('Unit | Connection | Howler', function (hooks) {
  setupTest(hooks);
  setupStereoTest(hooks)

  test("Howler should say it cannot play hls streams", function (assert) {
    let badUrls = A([
      "http://example.org/test.m3u8",
      "http://example.org/test.m3u8?query_params",
      "http://example.org/test.m3u8#could_happen?maybe"
    ]);

    let goodUrls = A([
      "http://example.org/test.mp3",
      "http://example.org/test.aac",
      "http://example.org/test.wav"
    ]);

    assert.expect(badUrls.length + goodUrls.length);

    badUrls.forEach(url => {
      assert.false(HowlerConnection.canPlay(url), `Should not play file with ${url}`);
    });

    goodUrls.forEach(url => {
      assert.true(HowlerConnection.canPlay(url), `Should be able to play file with ${url}`);
    });
  });

  test("Howler should report playability of file objects", function (assert) {
    let badFiles = A([
      { url: "http://example.org/test.m3u8", mimeType: "application/vnd.apple.mpegurl" },
    ]);

    let goodFiles = A([
      { url: "http://example.org/test.mp3", mimeType: "audio/mpeg" },
      { url: "http://example.org/test.aac", mimeType: "audio/aac" },
      { url: "http://example.org/test.wav", mimeType: "audio/wav" }
    ]);

    assert.expect(badFiles.length + goodFiles.length);

    badFiles.forEach(url => {
      assert.false(HowlerConnection.canPlay(url), `Should not play file with mime type ${url.mimeType}`);
    });

    goodFiles.forEach(url => {
      assert.true(HowlerConnection.canPlay(url), `Should be able to play file with ${url.mimeType}`);
    });
  });

  test("If we 404, we give up", function (assert) {
    assert.expect(1);
    let done = assert.async();
    let sound = new (this.owner.factoryFor('ember-stereo@stereo-connection:howler').class)({ url: '/bad/404/bad.mp3' })

    sound.on('audio-load-error', function () {
      assert.ok(true, "should have triggered audio load error");
      done();
    });
  });

  skip("Howler should fire audio-ended event when a file finishes", function (assert) {
    assert.expect(2);
    let done = assert.async();
    let url = "/good/500/test.mp3";
    let sound = new (this.owner.factoryFor('ember-stereo@stereo-connection:howler').class)({
      url: url,
      audioReady: function () {
        sound.set('position', 9 * 1000);
        sound.play();
      },
      audioEnded: function () {
        assert.ok('service fires audio-ended');
        assert.notOk(sound.isPlaying, 'isPlaying should be false');
        sound.off('audio-ended');
        done();
      }
    })

    sound.setup();
  });
});
