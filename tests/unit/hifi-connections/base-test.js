import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

var baseSound;

module('Unit | Connection | base', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    baseSound = new (this.owner.factoryFor('ember-hifi@hifi-connection:base', {
      setup() {},
      _currentPosition() {},
      timeout: false,
    }).class)
  });

  test("isPlaying gets set when an 'audio-played' event is fired", function(assert) {
    assert.equal(baseSound.isPlaying, false, "is playing should be false to start");
    baseSound.trigger("audio-played");
    assert.equal(baseSound.isPlaying, true, "is playing should be true after firing event");
  });

  test("isPlaying gets set to false when an 'audio-paused' event is fired", function(assert) {
    baseSound.isPlaying = true;

    assert.equal(baseSound.isPlaying, true, "is playing should be true to start");
    baseSound.trigger("audio-paused");
    assert.equal(baseSound.isPlaying, false, "is playing should be false after firing event");
  });

  test("isPlaying gets set to false when an 'audio-ended' event is fired", function(assert) {
    baseSound.isPlaying = true;

    assert.equal(baseSound.isPlaying, true, "is playing should be true to start");
    baseSound.trigger("audio-ended");
    assert.equal(baseSound.isPlaying, false, "is playing should be false after firing event");
  });

  test("base sound will eagerly accept unknown mime types", function(assert) {
    let unknownMimeType = "http://www.example.come/audio";
    assert.equal(baseSound.constructor.canPlay(unknownMimeType), true, "defaults to true if the mime type cannot be determined");
  });

  test("hasPlayed gets set after a sound has played", function(assert) {
    baseSound.hasPlayed = false;

    baseSound.trigger("audio-played");
    assert.equal(baseSound.isPlaying, true, "isPlaying should be true after firing play event");
    assert.equal(baseSound.hasPlayed, true, "hasPlayed should be true after firing play event");

    baseSound.trigger("audio-paused");
    assert.equal(baseSound.isPlaying, false, "isPlaying should be false after firing pause event");
    assert.equal(baseSound.hasPlayed, true, "hasPlayed should still be true after firing pause event");
  });

  test("error property gets set when audio-load-error is fired", function(assert) {
    assert.equal(baseSound.error, null, "error should be null to start");
    assert.equal(baseSound.isErrored, false, "isErrored should be false to start");

    baseSound.trigger('audio-load-error', "big time error message");
    assert.equal(baseSound.error, "big time error message", "error should be set");
    assert.equal(baseSound.isErrored, true, "isErrored should be true if errored");
  });
});
