import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { triggerEvent } from '@ember/test-helpers';
import sinon from 'sinon';
import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import NativeAudio from 'ember-stereo/stereo-connections/native-audio';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import {
  setupStereoTest,
} from 'ember-stereo/test-support/stereo-setup';
const goodUrl = "/good/1000/good.aac";
const badUrl = "/bad/404-error/there-aint-nothing-here.aac";

module('Unit | Connection | Native Audio', function (hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks)
  setupStereoTest(hooks)

  var sharedAudioAccess;

  hooks.beforeEach(function () {
    sharedAudioAccess = new SharedAudioAccess()
    sharedAudioAccess.unlock();

    // sandbox = sinon.createSandbox({
    //   useFakeServer: sinon.fakeServerWithClock
    // });
    // sandbox.server.respondWith(goodUrl, function (xhr) {
    //   xhr.respond(200, {}, []);
    // });

    // sandbox.server.respondWith(badUrl, function (xhr) {
    //   xhr.respond(404, {}, []);
    // });
  });

  hooks.afterEach(function () {
    // sandbox.restore();
  });

  test("If we 404, we give up", function (assert) {
    let done = assert.async();
    sharedAudioAccess.unlock();

    let sound = new NativeAudio({ url: badUrl, timeout: false, sharedAudioAccess });

    assert.expect(1);
    sound.one('audio-load-error', function () {
      assert.ok(true, "should have triggered audio load error");
      done();
    });
  });

  test("If passed a shared audio element on initialize, use it instead of creating one", async function (assert) {
    let testFlag = "hey, it's me";

    let sharedAudioAccess = (new SharedAudioAccess).unlock();
    sharedAudioAccess.audioElement.testFlag = testFlag;

    let sound = new NativeAudio({
      url: goodUrl, sharedAudioAccess, timeout: false
    })

    await sound.play();
    assert.equal(sound.audioElement.testFlag, testFlag, "should have used passed audio element");
  });

  test("If not passed a shared audio element on initialize, use our internal one", async function (assert) {
    let sound = new NativeAudio({
      url: "/good/10000/silence.mp3", timeout: false, volume: 0
    })
    await sound.play();

    assert.equal(sound.internalElement, sound.audioElement, "internal was used");
  });

  test("If it's a stream, we stop on pause", async function (assert) {
    this.owner.lookup('service:stereo').useSharedAudioAccess = true
    let sharedAudioAccess = (new SharedAudioAccess).unlock();

    let sound = new NativeAudio({
      url: '/good/stream/good.aac', timeout: false, sharedAudioAccess
    });

    sound.duration = Infinity;

    let stopSpy = sinon.spy(sound, 'stop');
    let loadSpy = sinon.spy(sound.sharedAudioAccess.requestControl(sound), 'load');

    await sound.play();
    assert.equalUrls(sound.audioElement.src, '/good/stream/good.aac', "audio src attribute is set");

    sound.pause();

    assert.equal(sound.audioElement.src, null, "audio src attribute is not set");
    assert.equal(loadSpy.callCount, 2, "load was called");
    assert.equal(stopSpy.callCount, 1, "stop was called");
  });

  test("Don't fire audio-played events on position changes", async function (assert) {
    let sound = new NativeAudio({
      url: '/assets/silence.mp3', timeout: false
    })

    let count = 0;
    sound.one('audio-played', function () {
      count++
    });
    sound._setPosition(1000);

    sound.one('audio-played', function () {
      count++
    });
    sound._setPosition(2000);

    sound.one('audio-played', function () {
      count++
    });
    sound._setPosition(3000);

    assert.equal(count, 0, 'should not increase');
  });

  test("stopping an audio stream still sends the pause event", async function (assert) {
    let sharedAudioAccess = (new SharedAudioAccess).unlock();

    let sound = new NativeAudio({
      url: '/good/stream/stream.mp3', timeout: false, duration: Infinity, sharedAudioAccess
    });

    assert.expect(2);

    sound.one('audio-paused', function () {
      assert.ok("pause event was fired");
    });

    await sound.play();
    assert.equal(sound.audioElement.src.split('/').pop(), 'stream.mp3', "audio src attribute is set");

    sound.stop();
  });

  test("can play an mp3 twice in a row using a shared audio element", function (assert) {
    assert.expect(5)
    let sharedAudioAccess = (new SharedAudioAccess).unlock();

    let sound = new NativeAudio({
      url: goodUrl, timeout: false, sharedAudioAccess
    });

    sound.one('audio-ended', () => assert.ok('ended was called'));
    sound.play();

    assert.equal(sound.audioElement.src, goodUrl, "audio src attribute is set");
    assert.equal(sound.audioElement, sharedAudioAccess.audioElement, "internal audio tag is shared audio tag");

    sound.position = 100000;
    sound.play();

    assert.equal(sound.audioElement.src, goodUrl, "audio src attribute is set");
    assert.equal(sound.audioElement, sharedAudioAccess.audioElement, "internal audio tag is shared audio tag");
  });

  test("can play an mp3 twice in a row using internal element", function (assert) {
    assert.expect(3)

    let sound = new NativeAudio({
      url: goodUrl, timeout: false
    });
    sound.one('audio-ended', () => assert.ok('ended was called'));
    sound.play();
    sound.position = 100000;

    assert.equal(sound.audioElement.src, goodUrl, "audio src attribute is set");

    sound.play();

    assert.equal(sound.audioElement.src, goodUrl, "audio src attribute is set");
  });

  test('switching sounds with a shared audio element saves the current state', function (assert) {
    let url1 = '/good/12000/silence.mp3';
    let url2 = '/good/12000/silence2.mp3';

    let sound1 = new NativeAudio({ url: url1, timeout: false, sharedAudioAccess });
    let sound2 = new NativeAudio({ url: url2, timeout: false, sharedAudioAccess });

    sinon.stub(sound1, 'debug');
    sinon.stub(sound2, 'debug');

    sound1.position = 2000;
    sound1.play(); // sound 1 has control

    sound2.position = 10000; // sound 2 should not affect sound 1

    assert.equal(sound1._currentPosition(), 2000, "sound 1 should have kept its position");

    sound2.play(); // sound 2 has control

    assert.equal(sound2._currentPosition(), 10000, "sound 2 should have kept its position");
  });

  test('switching sounds with internal elements keep current state', function (assert) {
    this.owner.lookup('service:stereo').useSharedAudioAccess = false

    let url1 = '/assets/silence.mp3';
    let url2 = '/assets/silence2.mp3';

    let sound1 = new NativeAudio({ url: url1, timeout: false });
    let sound2 = new NativeAudio({ url: url2, timeout: false });

    sinon.stub(sound1, 'debug');
    sinon.stub(sound2, 'debug');

    sound1.position = 2000;
    sound1.play(); // sound 1 has control

    sound2.position = 10000; // sound 2 should not affect sound 1

    assert.equal(sound1._currentPosition(), 2000, "sound 1 should have kept its position");

    sound2.play(); // sound 2 has control

    assert.equal(sound2._currentPosition(), 10000, "sound 2 should have kept its position");
  });

  test('on setup the sound has control of the shared audio element', function (assert) {
    let url1 = '/assets/silence.mp3';
    let sharedAudioAccess = (new SharedAudioAccess).unlock();

    let sound = new NativeAudio({ url: url1, timeout: false, sharedAudioAccess });
    sinon.stub(sound, 'debug');

    assert.equal(sound.audioElement, sharedAudioAccess.audioElement, "sound should have control on setup");
  });

  test('on play the sound gains control of the shared audio element', function (assert) {
    let url1 = '/assets/silence.mp3';
    let sharedAudioAccess = (new SharedAudioAccess).unlock();

    let sound = new NativeAudio({ url: url1, timeout: false, sharedAudioAccess });
    sinon.stub(sound, 'debug');

    sound.play();
    assert.equal(sound.audioElement, sharedAudioAccess.audioElement, "sound should have control on setup");
  });

  test('sound does not have control of the shared audio element when another is playing', function (assert) {
    let sound1 = new NativeAudio({ url: "/assets/silence.mp3", timeout: false, sharedAudioAccess });
    let sound2 = new NativeAudio({ url: "/assets/silence2.mp3", timeout: false, sharedAudioAccess });

    sinon.stub(sound1, 'debug');
    sinon.stub(sound2, 'debug');

    sound1.play();
    sound2.play();

    assert.notEqual(sound1.audioElement, sharedAudioAccess.audioElement, "sound should have control while another sound is playing");
  });

  test('switching sounds with a shared audio element sends pause event on first sound', async function (assert) {
    assert.expect(1);
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/5000/silence.mp3';
    let url2 = '/good/5000/silence2.mp3';

    let { sound: sound1 } = await stereo.load(url1, { sharedAudioAccess, useConnections: ['NativeAudio'] });
    let { sound: sound2 } = await stereo.load(url2, { sharedAudioAccess, useConnections: ['NativeAudio'] });

    sound1.one('audio-paused', () => {
      assert.ok("audio 1 pause event should have been fired");
    })

    await sound1.play(); // sound 1 has control
    await sound2.play(); // sound 2 has control
  });
});
