import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import NativeAudio from 'ember-stereo/stereo-connections/native-audio';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';
const goodUrl = '/good/1000/good.aac';
const badUrl = '/bad/404-error/there-aint-nothing-here.aac';

module('Unit | Connection | Native Audio', function (hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks);
  setupStereoTest(hooks);

  var sharedAudioAccess, stereo;

  hooks.beforeEach(function () {
    sharedAudioAccess = new SharedAudioAccess();
    sharedAudioAccess.unlock();

    stereo = this.owner.lookup('service:stereo');
    stereo.loadConnections(['NativeAudio']);
  });

  test('If we 404, we give up', function (assert) {
    let done = assert.async();
    sharedAudioAccess.unlock();

    let sound = new NativeAudio({
      url: badUrl,
      timeout: false,
      sharedAudioAccess,
    });

    assert.expect(1);
    sound.one('audio-load-error', function () {
      assert.ok(true, 'should have triggered audio load error');
      done();
    });
  });

  test('If passed a shared audio element on initialize, use it instead of creating one', async function (assert) {
    let testFlag = "hey, it's me";

    let sharedAudioAccess = new SharedAudioAccess().unlock();
    sharedAudioAccess.audioElement.testFlag = testFlag;

    let sound = new NativeAudio({
      url: goodUrl,
      sharedAudioAccess,
      timeout: false,
    });

    await sound.play();
    assert.strictEqual(
      sound.audioElement.testFlag,
      testFlag,
      'should have used passed audio element'
    );
  });

  test('If not passed a shared audio element on initialize, use our internal one', async function (assert) {
    let sound = new NativeAudio({
      url: '/good/1000/shared.mp3',
      timeout: false,
      volume: 0,
    });
    await sound.play();

    assert.strictEqual(
      sound.internalElement,
      sound.audioElement,
      'internal was used'
    );
  });

  test("If it's a stream, we stop on pause", async function (assert) {
    stereo.useSharedAudioAccess = true;

    let sharedAudioAccess = new SharedAudioAccess().unlock();

    let { sound } = await stereo.load(
      '/good/stream/stream.aac',
      sharedAudioAccess
    );

    let stopSpy = sinon.spy(sound, 'stop');
    let loadSpy = sinon.spy(
      sound.sharedAudioAccess.requestControl(sound),
      'load'
    );

    assert.strictEqual(sound.duration, Infinity, 'sound is stream');
    assert.true(sound.isStream, 'sound is stream');

    await sound.play();
    assert.equalUrls(
      sound.audioElement.src,
      '/good/stream/stream.aac',
      'audio src attribute is set'
    );

    sound.pause();

    assert.strictEqual(
      sound.audioElement.src,
      null,
      'audio src attribute is not set'
    );
    assert.ok(loadSpy.callCount > 0, 'load was called');
    assert.strictEqual(stopSpy.callCount, 1, 'stop was called');
  });

  test("Don't fire audio-played events on position changes", async function (assert) {
    let { sound } = await stereo.load('/good/1000/position-changes.mp3');

    let count = 0;
    sound.one('audio-played', function () {
      count++;
    });
    sound._setPosition(1000);

    sound.one('audio-played', function () {
      count++;
    });
    sound._setPosition(2000);

    sound.one('audio-played', function () {
      count++;
    });
    sound._setPosition(3000);

    assert.strictEqual(count, 0, 'should not increase');
  });

  test('stopping an audio stream still sends the pause event', async function (assert) {
    stereo.useSharedAudioAccess = true;
    let { sound } = await stereo.load('/good/stream/stream.mp3');

    assert.expect(2);

    sound.one('audio-paused', function () {
      assert.ok('pause event was fired');
    });

    await sound.play();
    assert.equalUrls(
      sound.audioElement.src,
      '/good/stream/stream.mp3',
      'audio src attribute is set'
    );

    sound.stop();
  });

  test('can play an mp3 twice in a row using a shared audio element', async function (assert) {
    assert.expect(6);

    stereo.useSharedAudioAccess = true;
    let goodUrl = '/good/1000/shared-good.aac';

    let { sound } = await stereo.load(goodUrl);

    sound.one('audio-ended', () => assert.ok('ended was called'));
    await sound.play();

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set'
    );
    assert.strictEqual(
      sound.audioElement,
      stereo.sharedAudioAccess.audioElement,
      'internal audio tag is shared audio tag'
    );

    sound.fastForward(2000);

    assert.strictEqual(sound.position, 0, 'position is zero again');

    await sound.play();

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set'
    );
    assert.strictEqual(
      sound.audioElement,
      stereo.sharedAudioAccess.audioElement,
      'internal audio tag is shared audio tag'
    );
  });

  test('can play an mp3 twice in a row using internal element', async function (assert) {
    assert.expect(3);

    stereo.useSharedAudioAccess = false;
    let { sound } = await stereo.load('/good/1000/good.aac');

    sound.one('audio-ended', () => assert.ok('ended was called'));
    await sound.play();
    sound.position = 100000;

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set'
    );

    await sound.play();

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set'
    );
  });

  test('switching sounds with a shared audio element saves the current state', async function (assert) {
    this.owner.lookup('service:stereo').useSharedAudioAccess = false;

    let url1 = '/good/1000/silence.mp3';
    let url2 = '/good/2000/silence2.mp3';
    let { sound: sound1 } = await stereo.load(url1);
    let { sound: sound2 } = await stereo.load(url2);

    sinon.stub(sound1, 'debug');
    sinon.stub(sound2, 'debug');

    sound1.position = 200;
    await sound1.play(); // sound 1 has control

    sound2.position = 500; // sound 2 should not affect sound 1

    assert.strictEqual(
      sound1._currentPosition(),
      200,
      'sound 1 should have kept its position'
    );

    await sound2.play(); // sound 2 has control

    assert.strictEqual(
      sound2._currentPosition(),
      500,
      'sound 2 should have kept its position'
    );

    sound1.pause();
    sound2.pause();
  });

  test('switching sounds with internal elements keep current state', function (assert) {
    this.owner.lookup('service:stereo').useSharedAudioAccess = false;

    let url1 = '/good/100/switch.mp3';
    let url2 = '/good/200/switch2.mp3';

    let sound1 = new NativeAudio({ url: url1, timeout: false });
    let sound2 = new NativeAudio({ url: url2, timeout: false });

    sinon.stub(sound1, 'debug');
    sinon.stub(sound2, 'debug');

    sound1.position = 10;
    sound1.play(); // sound 1 has control

    sound2.position = 100; // sound 2 should not affect sound 1

    assert.strictEqual(
      sound1._currentPosition(),
      10,
      'sound 1 should have kept its position'
    );

    sound2.play(); // sound 2 has control

    assert.strictEqual(
      sound2._currentPosition(),
      100,
      'sound 2 should have kept its position'
    );
  });

  test('on setup the sound has control of the shared audio element', function (assert) {
    let url1 = '/good/100/control.mp3';
    let sharedAudioAccess = new SharedAudioAccess().unlock();

    let sound = new NativeAudio({
      url: url1,
      timeout: false,
      sharedAudioAccess,
    });
    sinon.stub(sound, 'debug');

    assert.strictEqual(
      sound.audioElement,
      sharedAudioAccess.audioElement,
      'sound should have control on setup'
    );
  });

  test('on play the sound gains control of the shared audio element', function (assert) {
    let url1 = '/good/100/control.mp3';
    let sharedAudioAccess = new SharedAudioAccess().unlock();

    let sound = new NativeAudio({
      url: url1,
      timeout: false,
      sharedAudioAccess,
    });
    sinon.stub(sound, 'debug');

    sound.play();
    assert.strictEqual(
      sound.audioElement,
      sharedAudioAccess.audioElement,
      'sound should have control on setup'
    );
  });

  test('sound does not have control of the shared audio element when another is playing', async function (assert) {
    stereo.useSharedAudioAccess = true;

    let url1 = '/good/1000/control-3.mp3';
    let url2 = '/good/2000/control-4.mp3';
    let { sound: sound1 } = await stereo.load(url1);
    let { sound: sound2 } = await stereo.load(url2);

    sinon.stub(sound1, 'debug');
    sinon.stub(sound2, 'debug');

    sound1.play();
    sound2.play();

    assert.notEqual(
      sound1.audioElement,
      stereo.sharedAudioAccess.audioElement,
      'sound should have control while another sound is playing'
    );
  });

  test('switching sounds with a shared audio element sends pause event on first sound', async function (assert) {
    assert.expect(1);
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/5000/silence.mp3';
    let url2 = '/good/5000/silence2.mp3';

    let { sound: sound1 } = await stereo.load(url1, {
      sharedAudioAccess,
      useConnections: ['NativeAudio'],
    });
    let { sound: sound2 } = await stereo.load(url2, {
      sharedAudioAccess,
      useConnections: ['NativeAudio'],
    });

    sound1.one('audio-paused', () => {
      assert.ok('audio 1 pause event should have been fired');
    });

    await sound1.play(); // sound 1 has control
    await sound2.play(); // sound 2 has control
  });

  test('automatically retries upon CORS failure', async function (assert) {
    assert.expect(4);
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/5000/silence.mp3';

    let { sound: sound1 } = await stereo.load(url1, {
      silenceErrors: true,
      useConnections: ['NativeAudio'],
    });

    assert.strictEqual(sound1.retryCount, 0);
    assert.strictEqual(
      sound1.audioElement.getAttribute('crossorigin'),
      'anonymous',
      'first try should be anonymous'
    );

    let { failures } = await stereo.load('/bad/http-301/silence.mp3', {
      useConnections: ['NativeAudio'],
      silenceErrors: true,
    });

    let erroredSound = failures[0].erroredSound;
    assert.strictEqual(erroredSound.retryCount, 1);
    assert.strictEqual(
      erroredSound.audioElement.getAttribute('crossorigin'),
      null,
      'second try should be null'
    );
  });

  test('does not support xhr options', async function (assert) {
    assert.expect(2);
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/5000/silence.mp3';

    let { failures } = await stereo.load(url1, {
      silenceErrors: true,
      useConnections: ['NativeAudio'],
      xhr: {
        withCredentials: true,
      },
    });

    let erroredSound = failures[0]?.erroredSound;
    assert.strictEqual(erroredSound.retryCount, 0);
    assert.strictEqual(
      erroredSound.error,
      'xhr options are not supported in NativeAudio'
    );
  });
});
