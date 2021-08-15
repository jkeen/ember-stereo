import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

var baseSound;

module('Unit | Connection | base', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    baseSound = new (this.owner.factoryFor('ember-stereo@stereo-connection:base', {
      setup() {},
      _currentPosition() {},
      timeout: false,
    }).class)
  });
  test("isPlaying gets set when an 'audio-played' event is fired", function(assert) {
    assert.false(baseSound.isPlaying, "is playing should be false to start");
    baseSound.trigger("audio-played");
    assert.true(baseSound.isPlaying, "is playing should be true after firing event");
  });
  test("isPlaying gets set to false when an 'audio-paused' event is fired", function(assert) {
    baseSound.isPlaying = true;

    assert.true(baseSound.isPlaying, "is playing should be true to start");
    baseSound.trigger("audio-paused");
    assert.false(baseSound.isPlaying, "is playing should be false after firing event");
  });
  test("isPlaying gets set to false when an 'audio-ended' event is fired", function(assert) {
    baseSound.isPlaying = true;

    assert.true(baseSound.isPlaying, "is playing should be true to start");
    baseSound.trigger("audio-ended", { sound: baseSound });
    assert.false(baseSound.isPlaying, "is playing should be false after firing event");
  });
  test("base sound will eagerly accept unknown mime types", function(assert) {
    let unknownMimeType = "http://www.example.come/audio";
    assert.true(baseSound.constructor.canPlay(unknownMimeType), "defaults to true if the mime type cannot be determined");
  });
  test("hasPlayed gets set after a sound has played", function(assert) {
    baseSound.hasPlayed = false;

    baseSound.trigger("audio-played");
    assert.true(baseSound.isPlaying, "isPlaying should be true after firing play event");
    assert.true(baseSound.hasPlayed, "hasPlayed should be true after firing play event");

    baseSound.trigger("audio-paused");
    assert.false(baseSound.isPlaying, "isPlaying should be false after firing pause event");
    assert.true(baseSound.hasPlayed, "hasPlayed should still be true after firing pause event");
  });
  test("error property gets set when audio-load-error is fired", function(assert) {
    assert.equal(baseSound.error, null, "error should be null to start");
    assert.false(baseSound.isErrored, "isErrored should be false to start");

    baseSound.trigger('audio-load-error', { error: "big time error message"});
    assert.equal(baseSound.error, "big time error message", "error should be set");
    assert.true(baseSound.isErrored, "isErrored should be true if errored");
  });
});
