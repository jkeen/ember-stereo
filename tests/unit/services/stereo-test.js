import { next } from '@ember/runloop';
import { A } from '@ember/array';
import { module, test, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import { waitUntil, settled } from '@ember/test-helpers';
import sinon from 'sinon';
import hasEqualIdentifiers from 'ember-stereo/-private/utils/has-equal-identifiers';
import SoundCache from 'ember-stereo/-private/utils/sound-cache';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import {
  setupStereoTest,
  stubConnectionCreateWithSuccess,
  stubConnectionCreateWithFailure,
} from 'ember-stereo/test-support/stereo-setup';

let sandbox;

module('Unit | Service | stereo', function (hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks);
  setupStereoTest(hooks);
  hooks.beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  hooks.afterEach(function () {
    sandbox.restore();
  });

  test('it activates local connections', function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections([
        { name: 'NativeAudio', config: { testOption: 'dummy' } },
      ]);

    assert.ok(
      service.connectionLoader.get('NativeAudio'),
      'it activated the NativeAudio'
    );
    assert.equal(
      service.connectionLoader.get('NativeAudio').config.testOption,
      'dummy',
      'it passes config options to the NativeAudio'
    );
  });

  test('it returns a list of the available connections', function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['Howler', 'NativeAudio']);
    assert.deepEqual(service.connectionLoader.names, ['Howler', 'NativeAudio']);
  });

  test('#load tries the first connection that says it can handle the url', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'Howler' }, { name: 'NativeAudio' }]);

    let testUrl = '/good/1000/sound.mp3';

    let Howler = service.connectionLoader.get(`Howler`);
    let NativeAudio = service.connectionLoader.get(`NativeAudio`);

    let howlerSpy = sandbox.stub(Howler, 'canPlay').returns(false);
    let nativeSpy = sandbox.stub(NativeAudio, 'canPlay').returns(true);

    let { sound } = await service.load(testUrl);

    assert.ok(
      howlerSpy.callCount > 0,
      'howler canPlay should have been called'
    );
    assert.ok(
      nativeSpy.callCount > 0,
      'nativeSpy canPlay should have been called'
    );

    assert.equal(
      sound.connectionName,
      'Native Audio',
      'Native Audio connection should have been used'
    );
  });

  test('load stops trying urls after a sound loads and reports accurately', async function (assert) {
    let unusedUrl = '/good/1000/fourth-unused.mp3';
    let goodUrl = '/good/2000/third-url-good.mp3';
    let error1 = 'unknown-error';
    let error2 = 'codec-not-supported';
    let badUrl1 = `/bad/${error1}/first-url-bad.mp3`;
    let badUrl2 = `/bad/${error2}/second-url-bad.mp3`;
    let expectedUrl;
    let expectedFailures;

    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let { sound, failures } = await service.load([
      badUrl1,
      badUrl2,
      goodUrl,
      unusedUrl,
    ]);

    if (sound) {
      expectedUrl = sound.url;
      expectedFailures = failures;
    }

    assert.equalUrls(
      expectedUrl,
      goodUrl,
      'sound returned should have the successful url'
    );
    assert.equal(
      A(expectedFailures).mapBy('url').length,
      2,
      'should only have two failures'
    );
    assert.equal(
      expectedFailures[0].error,
      error1,
      `first url should have error: ${error1}`
    );
    assert.equal(
      expectedFailures[1].error,
      error2,
      `second url should have error: ${error2}`
    );
    assert.equalUrls(
      expectedFailures[0].url,
      badUrl1,
      `first bad url should be: ${badUrl1}`
    );
    assert.equalUrls(
      expectedFailures[1].url,
      badUrl2,
      `second bad url should be: ${badUrl2}`
    );
  });

  test('#load can take a promise that resolves urls', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);
    let goodUrl = '/good/1000/good.mp3';
    let urlPromise = new Promise((resolve) => {
      resolve([goodUrl]);
    });
    let expectedUrl;

    let { sound } = await service.load(urlPromise);
    if (sound) {
      expectedUrl = sound.url;
    }
    assert.equalUrls(
      expectedUrl,
      goodUrl,
      'sound returned should have the successful url'
    );
  });

  test('When a sound gets created it gets registered with OneAtATime', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let url = '/good/1000/test.mp3';

    let { sound } = await service.load(url);
    assert.deepEqual(
      service.get('oneAtATime.sounds.firstObject'),
      sound,
      'sound should be registered with one at a time'
    );
  });

  test('When a sound plays it gets set as the currentSound', async function (assert) {
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);
    let { sound: sound1 } = await service.load('/good/200/yes.mp3');
    let { sound: sound2 } = await service.load('/good/500/another-yes.mp3');

    assert.notOk(
      service.currentSound,
      'sound should not be set as current sound yet'
    );

    await sound1.play();
    assert.equal(
      service.currentSound?.url,
      sound1.url,
      'sound1 should be set as current sound'
    );

    await sound2.play();
    assert.equal(
      service.currentSound?.url,
      sound2.url,
      'sound2 should be set as current sound'
    );
    sound2.stop();
    sound1.stop();
  });

  test('Setting currentSound multiple times will not register duplicate events on the sound', async function (assert) {
    assert.expect(2);
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let { sound } = await service.load('/good/500/current-sound.mp3');
    var callCount = 0;
    await sound.play();
    service.on('audio-ended', () => {
      callCount = callCount + 1;
    });
    sound.trigger('audio-ended');

    await waitUntil(
      () => {
        return callCount == 1;
      },
      { timeout: 5000 }
    );

    assert.equal(callCount, 1, 'ended event should have been fired once');
    service.currentSound = sound;
    service.currentSound = sound;
    service.currentSound = sound;
    service.currentSound = sound;
    sound.trigger('audio-ended');
    await waitUntil(
      () => {
        return callCount == 2;
      },
      { timeout: 5000 }
    );

    assert.equal(callCount, 2, 'ended event should have been fired once');
  });

  test('The second time a url is requested it will be pulled from the cache', async function (assert) {
    assert.expect(5);
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let url = '/good/500/cache.mp3';
    let soundCache = service.soundCache;
    let findSpy = sandbox.spy(soundCache, 'find');
    let cacheSpy = sandbox.spy(soundCache, 'cache');
    assert.equal(findSpy.callCount, 0, 'cache should not have been checked');

    let { sound: sound1 } = await service.load(url);
    assert.equal(findSpy.callCount, 2, 'cache should have been checked');
    assert.equal(
      cacheSpy.callCount,
      1,
      'sound should be registered with sound cache'
    );
    sound1.identification = 'yo';

    let { sound: sound2 } = await service.load(url);
    assert.equal(
      sound2.identification,
      'yo',
      'should be the same sound in sound cache'
    );
    assert.equal(findSpy.callCount, 3, 'cache should have been checked');
  });

  test('The second time a url (with a mime type specified) is requested it will be pulled from the cache', async function (assert) {
    assert.expect(4);
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'NativeAudio' }]);

    let url = { url: '/good/1000/test.mp3', mimeType: 'audio/mp3' };

    let soundCache = service.soundCache;
    let findSpy = sandbox.spy(soundCache, 'find');
    let cacheSpy = sandbox.spy(soundCache, 'cache');

    let { sound } = await service.load(url);
    assert.equal(findSpy.callCount, 2, 'cache should have been checked');
    assert.equal(
      cacheSpy.callCount,
      1,
      'sound should be registered with sound cache'
    );
    sound.identification = 'yo';

    let { sound: sound2 } = await service.load(url);
    assert.equal(
      sound2.identification,
      'yo',
      'should be the same sound in sound cache'
    );
    assert.equal(findSpy.callCount, 3, 'cache should have been checked');
  });

  test('volume changes are set on the current sound', function (assert) {
    assert.expect(7);
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);

    let sound1 = new (service.connectionLoader.get('NativeAudio'))({
      url: '/good/1000/test.mp3',
    });
    let sound2 = new (service.connectionLoader.get('NativeAudio'))({
      url: '/good/1000/test2.mp3',
    });

    let spy1 = sandbox.spy(sound1, '_setVolume');
    let spy2 = sandbox.spy(sound2, '_setVolume');

    let defaultVolume = service.get('defaultVolume');

    assert.equal(
      service.get('volume'),
      service.get('defaultVolume'),
      'service should have default volume'
    );

    assert.equal(spy1.callCount, 0, 'volume should not be set');

    service.currentSound = sound1;

    assert.ok(
      spy1.withArgs(defaultVolume).calledOnce,
      'volume on sound 1 should be set to default volume'
    );

    service.currentSound = sound2;

    assert.ok(
      spy2.withArgs(defaultVolume).calledOnce,
      'volume on sound 2 should be set to default volume after current sound change'
    );

    service.set('volume', 55);

    assert.ok(
      spy2.withArgs(55).calledOnce,
      'volume on sound 2 should be set to new system volume'
    );

    service.currentSound = sound1;

    assert.ok(
      spy1.withArgs(55).calledOnce,
      'volume on sound 1 should be set to new system volume after current sound change'
    );

    sound1._setVolume(0);
    assert.equal(
      service.get('volume'),
      55,
      'setting sound volume individually should have no effect on system volume. Relationship is one way.'
    );
  });

  test('toggleMute returns sound to previous level', function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);

    assert.equal(
      service.get('volume'),
      service.defaultVolume,
      'service should have default volume'
    );
    service.set('volume', 75);
    assert.equal(service.get('volume'), 75, 'volume should be 75');
    service.toggleMute(); // muted
    assert.equal(service.get('volume'), 0, 'volume should be zero');
    assert.true(service.get('isMuted'), 'volume should be muted');
    service.toggleMute(); // unmuted
    assert.equal(
      service.get('volume'),
      75,
      'volume should be reset to previous level'
    );
  });

  test('consumer can specify the connection to use with a particular url', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['LocalDummyConnection', 'NativeAudio']);
    let nativeAudioSpy = stubConnectionCreateWithSuccess(
      service,
      'NativeAudio',
      sandbox
    );
    await service.load('/good/10000/test.mp3', {
      useConnections: ['NativeAudio'],
    });
    assert.equal(
      nativeAudioSpy.callCount,
      1,
      'Native connection should have been called'
    );
  });

  test('consumer can specify the order of connections to be used with some urls', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['LocalDummyConnection', 'NativeAudio']);
    let nativeAudioSpy = stubConnectionCreateWithFailure(
      service,
      'NativeAudio',
      sandbox
    );
    let localAudioSpy = stubConnectionCreateWithSuccess(
      service,
      'LocalDummyConnection',
      sandbox
    );

    await service.load('/good/1000/test.mp3', {
      silenceErrors: true,
      useConnections: ['NativeAudio', 'LocalDummyConnection'],
    });
    assert.equal(
      nativeAudioSpy.callCount,
      1,
      'Native connection should have been called'
    );
    assert.equal(
      localAudioSpy.callCount,
      1,
      'local connection should have been called'
    );
    assert.ok(
      nativeAudioSpy.calledBefore(localAudioSpy),
      'native audio should have been tried before local'
    );

    await service.play('/good/1000/test-2.mp3', {
      silenceErrors: true,
      useConnections: ['NativeAudio'],
    });
    assert.equal(
      nativeAudioSpy.callCount,
      2,
      'Native connection should have been called'
    );
  });

  test('consumer can specify a mime type for a url', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['LocalDummyConnection']);
    let fileObject = {
      url: '/test/sound-without-extension',
      mimeType: 'audio/mpeg',
    };

    let LocalDummyConnection = service.connectionLoader.get(
      'LocalDummyConnection'
    );

    let mimeTypeSpy = sandbox
      .stub(LocalDummyConnection, 'canPlayMimeType')
      .returns(true);
    let createSpy = sandbox
      .stub(LocalDummyConnection.prototype, 'setup')
      .callsFake(function () {
        next(() => this.trigger('audio-ready', { sound: this }));
      });
    await service.load(fileObject);

    assert.ok(
      mimeTypeSpy.callCount > 0,
      'local canPlayMimeType should have been called'
    );
    assert.ok(
      createSpy.callCount > 0,
      'A sound should have been created using the local dummy connection'
    );
  });

  test('if a mime type cannot be determined, try to play it anyway', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections([{ name: 'LocalDummyConnection' }]);
    let mysteryFile = '/test/sound-without-extension';

    let LocalDummyConnection = service.connectionLoader.get(
      'LocalDummyConnection'
    );

    let createSpy = sandbox
      .stub(LocalDummyConnection.prototype, 'setup')
      .callsFake(function () {
        next(() => this.trigger('audio-ready', { sound: this }));
      });

    await service.load(mysteryFile);
    assert.ok(createSpy.calledOnce, 'A sound should have been created');
  });

  test('you can specify alwaysUseSingleAudioElement in config to always use a single audio element', function (assert) {
    const service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'NativeAudio' }]);

    sinon.stub(service, 'systemStereoOptions').get(() => {
      return {
        alwaysUseSingleAudioElement: true,
        connections: [{ name: 'NativeAudio' }],
      };
    });

    assert.true(service.useSharedAudioAccess);
  });

  test('shared audio element should be passed if alwaysUseSingleAudioElement config option is specified', async function (assert) {
    let urls = ['/good/1000/1.mp3', '/good/1000/2.mp3', '/good/1000/3.mp3'];
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    sinon.stub(service, 'systemStereoOptions').get(() => {
      return {
        alwaysUseSingleAudioElement: true,
        connections: [{ name: 'NativeAudio' }],
      };
    });

    let strategyOrderSpy = sandbox.spy(service, '_buildStrategies');

    service.set('isMobileDevice', false);
    service.set('useSharedAudioAccess', true);

    await service.load(urls, { useConnections: ['NativeAudio'] });
    let strategies = strategyOrderSpy.getCall(0).returnValue;

    let sharedAudioAccesss = A(
      A(strategies).map((s) => s.sharedAudioAccess)
    ).compact();
    assert.equal(
      sharedAudioAccesss.length,
      strategies.length,
      'audio element should have been included with the strategies'
    );
  });

  test('individual native audio sounds keep track of their own state', async function (assert) {
    let connections = ['NativeAudio'];
    const service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: connections[0] }]);

    let s1url = '/good/250/silence.mp3';
    let s2url = '/good/500/silence2.mp3';

    let { sound: sound1 } = await service.load(s1url);
    let { sound: sound2 } = await service.load(s2url);
    sound1.position = 100;
    assert.equal(
      sound2._currentPosition(),
      0,
      'second sound should have its own position'
    );

    sound2.play();
    sound2.position = 125;

    assert.equal(
      Math.floor(sound1._currentPosition()),
      100,
      'first sound should still have its own position'
    );
    assert.equal(
      Math.floor(sound2._currentPosition()),
      125,
      'second sound should still have its own position'
    );

    sound1.play();
    assert.equal(
      Math.floor(sound1._currentPosition()),
      100,
      'first sound should still have its own position'
    );
    sound2.position = 300;
    sound2.play();
    assert.equal(
      Math.floor(sound2._currentPosition()),
      300,
      'second sound should still have its own position'
    );
  });

  test('sound can play on native audio using shared element one after the other', async function (assert) {
    assert.expect(4);
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/10/silence.mp3';
    let s2url = '/good/10/silence2.mp3';

    service.useSharedAudioAccess = true;
    service.isMobileDevice = true;

    let { sound: silence1 } = await service.play(s1url);
    let sharedAccess = silence1.sharedAudioAccess;
    assert.equal(
      sharedAccess.audioElement.id,
      silence1.audioElement.id,
      'sound should be using its shared element'
    );

    await silence1.play();

    silence1.one('audio-ended', async function () {
      assert.ok('audio ended event was fired');

      let { sound: silence2 } = await service.play(s2url);
      assert.equal(
        sharedAccess.audioElement.id,
        silence2.audioElement.id,
        'second sound should be using shared element'
      );
      assert.notEqual(
        sharedAccess.audioElement.id,
        silence1.audioElement.id,
        'second sound should be using shared element'
      );
    });
    silence1.position = 10 * 60 * 1000;

    await settled();
  });

  test('service has access to the current sound inside the play callback', async function (assert) {
    const service = this.owner.lookup('service:stereo');
    let s1url = '/good/10000/silence.mp3';

    let { sound } = await service.play(s1url);
    assert.equal(sound.position, service.get('position'));
  });

  test('sound events get relayed at the service level', async function (assert) {
    const service = this.owner.lookup('service:stereo');
    let s1url = '/good/1000/silence.mp3';
    let s2url = '/good/1000/silence2.mp3';

    let sound1PlayEventTriggered;
    let sound2PlayEventTriggered;
    let sound1PauseEventTriggered;
    let sound2PauseEventTriggered;

    service.on('audio-played', async ({ sound }) => {
      sound1PlayEventTriggered = await hasEqualIdentifiers(sound.url, s1url);
      sound2PlayEventTriggered = await hasEqualIdentifiers(sound.url, s2url);
    });

    service.on('audio-paused', async ({ sound }) => {
      sound1PauseEventTriggered = await hasEqualIdentifiers(sound.url, s1url);
      sound2PauseEventTriggered = await hasEqualIdentifiers(sound.url, s2url);
    });

    await service.play(s1url);
    await settled();
    assert.true(
      sound1PlayEventTriggered,
      'sound 1 play event should have been triggered'
    );

    let { sound } = await service.play(s2url);
    await settled();

    assert.true(
      sound1PauseEventTriggered,
      'sound 1 pause event should have been triggered'
    );
    assert.true(
      sound2PlayEventTriggered,
      'sound 2 play event should have been triggered'
    );
    sound.pause();
    assert.false(
      sound2PauseEventTriggered,
      'sound 2 pause event should not have been triggered'
    );
  });

  test('service triggers `current-sound-changed` event when sounds change', async function (assert) {
    assert.expect(4);

    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/1000/silence.mp3';
    let s2url = '/good/1000/silence2.mp3';

    service.one('current-sound-changed', ({ sound, previousSound }) => {
      assert.equal(
        previousSound,
        undefined,
        'there should not a previous sound'
      );
      assert.equalUrls(
        sound.url,
        s1url,
        'current sound should be the first sound'
      );
    });

    await service.play(s1url);

    service.one('current-sound-changed', ({ sound, previousSound }) => {
      assert.equalUrls(
        previousSound.url,
        s1url,
        'previous sound should be this sound'
      );
      assert.equalUrls(sound.url, s2url);
    });

    await service.play(s2url);
  });

  test('metadata can be sent with a play and load request and it will stay with the sound', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/1000/silence.mp3';
    let s2url = '/good/1000/silence2.mp3';

    let storyId = 12544;
    let { sound: sound1 } = await service.play(s1url, {
      metadata: {
        storyId: storyId,
      },
    });
    assert.equal(
      sound1.metadata.storyId,
      storyId,
      'storyId should be in metadata'
    );
    let { sound: sound2 } = await service.play(s2url);
    assert.equal(
      sound2.metadata.storyId,
      undefined,
      "metadata hasn't been set and shouldn't exist"
    );
    assert.equal(
      sound1.metadata.storyId,
      storyId,
      'storyId should be in saved sound'
    );
  });

  test('current-sound-interrupted event gets fired when a new `play` request happens while a sound is playing (independent elements)', async function (assert) {
    assert.expect(2);
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    service.useSharedAudioAccess = false;
    let s1url = '/good/3000/first-sound.mp3';
    let s2url = '/good/1000/second-sound.mp3';

    service.one('current-sound-changed', ({ sound }) => {
      assert.equalUrls(
        sound.url,
        s1url,
        'current sound should be reported as changed'
      );
    });

    service.one('current-sound-interrupted', ({ sound }) => {
      assert.equalUrls(
        sound.url,
        s1url,
        'current sound should be reported as interrupted'
      );
    });

    await service.play(s1url);

    await service.play(s2url);
  });

  test('current-sound-interrupted event gets fired when a new `play` request happens while a sound is playing (shared elements)', async function (assert) {
    assert.expect(2);
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    service.useSharedAudioAccess = true;
    let s1url = '/good/3000/first-sound.mp3';
    let s2url = '/good/1000/second-sound.mp3';

    service.one('current-sound-changed', ({ sound }) => {
      assert.equalUrls(
        sound.url,
        s1url,
        'current sound should be reported as changed'
      );
    });

    service.one('current-sound-interrupted', ({ sound }) => {
      assert.equalUrls(
        sound.url,
        s1url,
        'current sound should be reported as interrupted'
      );
    });

    await service.play(s1url);

    await service.play(s2url);
  });

  test('current-sound-interrupted event gets fired when another sound starts playing while one is already playing', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/3000/first-sound.mp3';
    let s2url = '/good/1000/second-sound.mp3';

    let result;
    service.on('current-sound-interrupted', ({ sound }) => {
      result = sound;
    });

    let { sound: sound1 } = await service.play(s1url);
    await service.play(s2url);

    assert.equal(
      result,
      sound1,
      'current sound should be the one that got interrupted'
    );
  });

  test('current-sound-interrupted event does not fire when position gets changed', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);

    let s1url = '/good/10000/silence.mp3';

    let callCount = 0;
    service.on('current-sound-interrupted', () => {
      callCount = callCount + 1;
    });

    let { sound } = await service.play(s1url);
    sound.position = 100;
    sound.position = 1500;
    assert.equal(callCount, 0, 'interrupt should not have been called');
  });

  test('new-load-request gets fired on new load and play requests', async function (assert) {
    assert.expect(4);
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);

    let s1url = '/good/1000/silence.mp3';
    let s2url = '/good/1000/silence2.mp3';

    let count = 0;
    let handler = (opts) => {
      let { urlsOrPromise, options } = opts;

      if (count == 0) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(urlsOrPromise, s1url, 'url should equal url passed in');
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(options.metadata.id, 1, 'metadata id should be equal');
      } else if (count === 1) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(urlsOrPromise, s2url, 'url should equal url passed in');
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(
          options.metadata.id,
          undefined,
          'metadata id should be undefined'
        );
        service.off('new-load-request', handler);
        // done();
      }
      count = count + 1;
    };

    service.on('new-load-request', handler);

    await service.play(s1url, { metadata: { id: 1 } });
    await service.load(s2url);
  });

  test('new-load-request gets fired on new load requests that are cached', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/1000/silence.mp3';

    assert.expect(4);

    let count = 0;
    service.on('new-load-request', ({ urlsOrPromise, options }) => {
      if (count == 0) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equalUrls(
          urlsOrPromise,
          s1url,
          'url should equal url passed in'
        );
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(options.metadata.id, 1, 'metadata id should be equale');
      } else if (count === 1) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equalUrls(
          urlsOrPromise,
          s1url,
          'url should equal url passed in'
        );
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(options.metadata.id, 2, 'metadata id should be 2');
      }
      count = count + 1;
    });

    await service.load(s1url, { metadata: { id: 1 } });
    await service.load(s1url, { metadata: { id: 2 } });
  });

  test('audio-position-will-change gets fired on position changes', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/15000/test';

    assert.expect(2);

    service.one(
      'audio-position-will-change',
      ({ currentPosition, newPosition }) => {
        assert.equal(currentPosition, 0, 'current position should be zero');
        assert.equal(newPosition, 5000, 'new position should be 5000');
      }
    );

    await service.play(s1url);
    service.set('position', 5000);
  });

  test('audio-will-rewind gets fired on rewind', async function (assert) {
    assert.expect(4);
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/15000/test2';
    let done = assert.async();
    let count = 0;

    service.on('audio-will-rewind', ({ currentPosition, newPosition }) => {
      if (count === 0) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(currentPosition, 5000, 'current position should be 5000');
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(newPosition, 4000, 'new position should be 4000');
        count = count + 1;
      } else if (count === 1) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(currentPosition, 4000, 'current position should be 4000');
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.equal(newPosition, 0, 'new position should be 0');
        done();
      }
    });

    await service.play(s1url, { position: 5000 });
    service.rewind(1000);

    service.rewind(6000);
  });

  test('audio-will-fast-forward gets fired on fast forward', async function (assert) {
    const service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);
    let s1url = '/good/15000/1.mp3';
    assert.expect(2);

    service.on(
      'audio-will-fast-forward',
      ({ currentPosition, newPosition }) => {
        assert.equal(currentPosition, 5000, 'current position should be 5000');
        assert.equal(newPosition, 6000, 'new position should be 6000');
      }
    );

    let { sound } = await service.play(s1url, { position: 5000 });
    service.fastForward(1000);
    sound.pause();
  });

  test("altering a sound's url during the pre-load event will not prevent the cache", async function (assert) {
    let url = '/good/1000/1.mp3';

    let soundCache = new SoundCache();
    let service = this.owner
      .lookup('service:stereo')
      .loadConnections(['NativeAudio']);

    service.soundCache = soundCache;

    let cacheSpy = sandbox.spy(soundCache, 'cache');
    let findSpy = sandbox.spy(soundCache, 'find');

    service.one('pre-load', (urls) => {
      urls.forEach((url) => {
        url.href = `${url.href}?foo=bar`;
      });
    });

    await service.play(url);
    service.pause();
    await service.play(url);
    assert.equalUrls(
      cacheSpy.firstCall.args[0].url,
      `${url}?foo=bar`,
      'cache lookup with expected value'
    );
    assert.equalUrls(
      findSpy.secondCall.args[0],
      [cacheSpy.firstCall.args[0].url],
      'lookup key is the same as the cached key'
    );
  });

  skip('currenly playing sound does not pause until load has succeeded', function () {});
});
