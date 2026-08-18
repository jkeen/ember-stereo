import { module, test, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import { waitUntil } from '@ember/test-helpers';
import sinon from 'sinon';
import SharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';
import NativeAudio, {
  durationGrowsWithTheClock,
} from 'ember-stereo/stereo-connections/native-audio';
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
      'should have used passed audio element',
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
      'internal was used',
    );
  });

  test("If it's a stream and the app asked for no grace period, we stop on pause", async function (assert) {
    stereo.useSharedAudioAccess = true;

    let sharedAudioAccess = new SharedAudioAccess().unlock();

    let { connection: sound } = await stereo.load('/good/stream/stream.aac', {
      sharedAudioAccess,
    });

    let stopSpy = sinon.spy(sound, 'stop');
    let loadSpy = sinon.spy(
      sound.sharedAudioAccess.requestControl(sound),
      'load',
    );

    assert.strictEqual(
      sound.streamPauseGraceMs,
      0,
      'holding a paused stream open is opt-in',
    );

    await sound.play();
    sound.pause();

    assert.strictEqual(
      sound.audioElement.src,
      null,
      'audio src attribute is not set',
    );
    assert.ok(loadSpy.callCount > 0, 'load was called');
    assert.strictEqual(stopSpy.callCount, 1, 'stop was called');
  });

  test('A stream given a grace period holds its connection open on pause, then stops', async function (assert) {
    stereo.useSharedAudioAccess = true;

    let sharedAudioAccess = new SharedAudioAccess().unlock();

    let { connection: sound } = await stereo.load('/good/stream/stream.aac', {
      sharedAudioAccess,
      streamPauseGraceMs: 10,
    });

    let stopSpy = sinon.spy(sound, 'stop');
    let loadSpy = sinon.spy(
      sound.sharedAudioAccess.requestControl(sound),
      'load',
    );

    assert.strictEqual(sound.duration, Infinity, 'sound is stream');
    assert.true(sound.isStream, 'sound is stream');

    await sound.play();
    assert.equalUrls(
      sound.audioElement.src,
      '/good/stream/stream.aac',
      'audio src attribute is set',
    );

    sound.pause();

    assert.strictEqual(stopSpy.callCount, 0, 'stop was not called immediately');
    assert.equalUrls(
      sound.audioElement.src,
      '/good/stream/stream.aac',
      'audio src attribute is still set',
    );

    await waitUntil(() => stopSpy.callCount === 1);

    assert.strictEqual(
      sound.audioElement.src,
      null,
      'audio src attribute is not set once the grace period expires',
    );
    assert.ok(loadSpy.callCount > 0, 'load was called');
  });

  test('Replaying a stream inside the grace period rejoins it instead of reconnecting', async function (assert) {
    stereo.useSharedAudioAccess = true;

    let sharedAudioAccess = new SharedAudioAccess().unlock();

    let { connection: sound } = await stereo.load('/good/stream/stream.aac', {
      sharedAudioAccess,
      streamPauseGraceMs: 10000,
    });

    await sound.play();
    let loadSpy = sinon.spy(
      sound.sharedAudioAccess.requestControl(sound),
      'load',
    );

    sound.pause();
    await sound.play();

    assert.strictEqual(
      loadSpy.callCount,
      0,
      'the element was not reloaded — the open connection was reused',
    );
    assert.equalUrls(
      sound.audioElement.src,
      '/good/stream/stream.aac',
      'audio src attribute is still set',
    );
  });

  test("Don't fire audio-played events on position changes", async function (assert) {
    let { connection: sound } = await stereo.load(
      '/good/1000/position-changes.mp3',
    );

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
    let { connection: sound } = await stereo.load('/good/stream/stream.mp3');

    sound.one('audio-paused', function () {
      assert.ok('pause event was fired');
    });

    await sound.play();
    assert.equalUrls(
      sound.audioElement.src,
      '/good/stream/stream.mp3',
      'audio src attribute is set',
    );

    sound.stop();
  });

  test('can play an mp3 twice in a row using a shared audio element', async function (assert) {
    stereo.useSharedAudioAccess = true;
    let goodUrl = '/good/1000/shared-good.aac';

    let { connection: sound } = await stereo.load(goodUrl);

    sound.one('audio-ended', () => assert.ok('ended was called'));
    await sound.play();

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set',
    );
    assert.strictEqual(
      sound.audioElement,
      stereo.sharedAudioAccess.audioElement,
      'internal audio tag is shared audio tag',
    );

    sound.fastForward(2000);

    assert.strictEqual(sound.position, 0, 'position is zero again');

    await sound.play();

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set',
    );
    assert.strictEqual(
      sound.audioElement,
      stereo.sharedAudioAccess.audioElement,
      'internal audio tag is shared audio tag',
    );
  });

  test('can play an mp3 twice in a row using internal element', async function (assert) {
    stereo.useSharedAudioAccess = false;
    let { connection: sound } = await stereo.load('/good/1000/good.aac');

    sound.one('audio-ended', () => assert.ok('ended was called'));
    await sound.play();
    sound.position = 100000;

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set',
    );

    await sound.play();

    assert.equalUrls(
      sound.audioElement.src,
      goodUrl,
      'audio src attribute is set',
    );
  });

  test('switching sounds with a shared audio element saves the current state', async function (assert) {
    this.owner.lookup('service:stereo').useSharedAudioAccess = false;

    let url1 = '/good/1000/silence.mp3';
    let url2 = '/good/2000/silence2.mp3';
    let { connection: sound1 } = await stereo.load(url1);
    let { connection: sound2 } = await stereo.load(url2);

    sound1.position = 200;
    sound1.play(); // sound 1 has control

    sound2.position = 500; // sound 2 should not affect sound 1

    assert.ok(
      sound1._currentPosition() >= 200,
      'sound 1 should have kept its position',
    );

    sound2.play(); // sound 2 has control

    assert.ok(
      sound2._currentPosition() >= 500,
      'sound 2 should have kept its position',
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

    sound1.position = 10;
    sound1.play(); // sound 1 has control

    sound2.position = 100; // sound 2 should not affect sound 1

    assert.strictEqual(
      sound1._currentPosition(),
      10,
      'sound 1 should have kept its position',
    );

    sound2.play(); // sound 2 has control

    assert.ok(
      sound2._currentPosition() >= 100,
      'sound 2 should have kept its position',
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
      'sound should have control on setup',
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
      'sound should have control on setup',
    );
  });

  test('sound does not have control of the shared audio element when another is playing', async function (assert) {
    stereo.useSharedAudioAccess = true;

    let url1 = '/good/1000/control-3.mp3';
    let url2 = '/good/2000/control-4.mp3';
    let { connection: sound1 } = await stereo.load(url1);
    let { connection: sound2 } = await stereo.load(url2);

    sinon.stub(sound1, 'debug');
    sinon.stub(sound2, 'debug');

    sound1.play();
    sound2.play();

    assert.notEqual(
      sound1.audioElement,
      stereo.sharedAudioAccess.audioElement,
      'sound should have control while another sound is playing',
    );
  });

  test('switching sounds with a shared audio element sends pause event on first sound', async function (assert) {
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/5000/silence.mp3';
    let url2 = '/good/5000/silence2.mp3';

    let { connection: sound1 } = await stereo.load(url1, {
      sharedAudioAccess,
      useConnections: ['NativeAudio'],
    });
    let { connection: sound2 } = await stereo.load(url2, {
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
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/5000/silence.mp3';

    let { connection: sound1 } = await stereo.load(url1, {
      silenceErrors: true,
      useConnections: ['NativeAudio'],
    });

    assert.strictEqual(sound1.retryCount, 0);
    assert.strictEqual(
      sound1.audioElement.getAttribute('crossorigin'),
      'anonymous',
      'first try should be anonymous',
    );

    let { failures } = await stereo.load('/bad/http-301/silence.mp3', {
      useConnections: ['NativeAudio'],
      silenceErrors: true,
    });

    let erroredConnection = failures[0].erroredConnection;
    assert.strictEqual(erroredConnection.retryCount, 1);
    assert.strictEqual(
      erroredConnection.audioElement.getAttribute('crossorigin'),
      null,
      'second try should be null',
    );
  });

  skip('it ignores xhr options', async function () {
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/5000/silence.mp3';

    await stereo.load(url1, {
      silenceErrors: true,
      useConnections: ['NativeAudio'],
      xhr: {
        withCredentials: true,
      },
    });
  });

  test('audio-position-changed events get fired', async function (assert) {
    let stereo = this.owner.lookup('service:stereo');
    let url1 = '/good/2000/silence.mp3';

    let events = [];

    let { connection: sound1 } = await stereo.load(url1, {
      useConnections: ['NativeAudio'],
    });
    sound1.on('audio-position-changed', ({ sound }) => events.push(sound));
    await sound1.play();

    assert.ok(events.length > 50, 'position changed events were fired');
  });

  module(
    'telling a live stream from a recording still being written',
    function () {
      function soundReporting(sharedAudioAccess, { duration, start, end }) {
        let sound = new NativeAudio({
          url: goodUrl,
          timeout: false,
          sharedAudioAccess,
        });

        Object.defineProperty(sound, 'audioElement', {
          get: () => ({
            duration,
            seekable: { length: 1, start: () => start, end: () => end },
          }),
        });

        return sound;
      }

      test('a live stream reporting [0, Infinity] is endless and unseekable', function (assert) {
        let sound = soundReporting(sharedAudioAccess, {
          duration: Infinity,
          start: 0,
          end: Infinity,
        });

        assert.strictEqual(sound._audioDuration(), Infinity, 'duration is ∞');

        sound.duration = sound._audioDuration();
        assert.true(sound.isStream, 'so the sound is a stream');
        assert.notOk(
          sound.isSeekable,
          'an endless range is not a seekable window',
        );
      });

      test('a live stream reporting a growing finite duration is endless and unseekable', function (assert) {
        let sound = soundReporting(sharedAudioAccess, {
          duration: 208.43,
          start: 0,
          end: 206.83,
        });
        Object.defineProperty(sound, 'probablyAStream', { get: () => true });

        assert.strictEqual(
          sound._audioDuration(),
          Infinity,
          'a growing duration is not a recorded length',
        );

        sound.duration = sound._audioDuration();
        assert.true(sound.isStream, 'so the sound is a stream');
        assert.notOk(
          sound.isSeekable,
          'and its buffer is not a seekable window',
        );
        assert.notOk(sound.isRewindable, 'not rewindable');
        assert.notOk(sound.isFastForwardable, 'not fast forwardable');
      });

      test('a recording still being written keeps its measured length and stays seekable', function (assert) {
        let sound = soundReporting(sharedAudioAccess, {
          duration: Infinity,
          start: 0,
          end: 120,
        });

        assert.strictEqual(
          sound._audioDuration(),
          120000,
          'the seekable range is the recorded length',
        );
        assert.ok(sound.isSeekable, 'and it can be seeked within');
      });

      test('an ordinary finite sound is unaffected', function (assert) {
        let sound = soundReporting(sharedAudioAccess, {
          duration: 60,
          start: 0,
          end: 60,
        });

        assert.strictEqual(
          sound._audioDuration(),
          60000,
          'duration is measured',
        );

        sound.duration = sound._audioDuration();
        assert.notOk(sound.isStream, 'not a stream');
        assert.ok(sound.isSeekable, 'and seekable as usual');
      });

      test('a declared seekability settles it outright', function (assert) {
        let live = soundReporting(sharedAudioAccess, {
          duration: Infinity,
          start: 0,
          end: Infinity,
        });
        live.options = { seekable: true };
        live.duration = Infinity;

        assert.true(live.isStream, 'still endless');
        assert.true(live.isSeekable, 'but the app says it can be seeked');
        assert.true(live.isRewindable, 'rewindable too');
        assert.true(live.isFastForwardable, 'and fast forwardable');

        let recording = soundReporting(sharedAudioAccess, {
          duration: 60,
          start: 0,
          end: 60,
        });
        recording.options = { seekable: false };
        recording.duration = 60000;

        assert.false(
          recording.isSeekable,
          'and a finite sound can be declared unseekable',
        );
      });
    },
  );

  module('reading duration growth', function () {
    // Live audio arrives as fast as it happens, so its duration gains about as much time as the window.
    test('a source growing smoothly with the clock reads as a stream', function (assert) {
      assert.true(
        durationGrowsWithTheClock([
          1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000,
        ]),
        'Chrome moves the duration every sample',
      );
    });

    test('a source growing in steps reads as a stream too', function (assert) {
      // Firefox holds the duration still and then jumps a whole second. The
      // average is realtime even though no single sample looks like it.
      assert.true(
        durationGrowsWithTheClock([
          1000, 1000, 1000, 2000, 2000, 2000, 3000, 3000, 3000,
        ]),
        'stepwise growth averages out to the clock',
      );
    });

    test('a stable duration does not', function (assert) {
      assert.false(
        durationGrowsWithTheClock([
          60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000,
        ]),
        'an ordinary file measured once',
      );
    });

    test('a single refinement of a VBR estimate does not', function (assert) {
      assert.false(
        durationGrowsWithTheClock([
          180000, 180000, 213000, 213000, 213000, 213000, 213000, 213000,
          213000,
        ]),
        'one step is a correction, not audio arriving',
      );
    });

    test('growth faster than the clock does not', function (assert) {
      assert.false(
        durationGrowsWithTheClock([
          0, 30000, 60000, 90000, 120000, 150000, 180000, 210000, 240000,
        ]),
        'a progressive download outruns realtime',
      );
    });

    test('too few measurements do not', function (assert) {
      assert.false(
        durationGrowsWithTheClock([1000, 1250, 1500]),
        'growth must be sustained before it counts',
      );
      assert.false(
        durationGrowsWithTheClock([1000, 1250, NaN, 1750, 2000]),
        'and a gap leaves too little measured',
      );
      assert.false(durationGrowsWithTheClock([]), 'nothing measured yet');
    });
  });
});
