import { Promise as EmberPromise } from 'rsvp';
import { next, later } from '@ember/runloop';
import { A } from '@ember/array';
import { get } from '@ember/object';
import { module, test /*, skip */ } from 'qunit';
import { setupTest } from 'ember-qunit';
import { waitUntil, settled } from '@ember/test-helpers'
import sinon from 'sinon';
import urlToIdentifier from 'ember-stereo/-private/utils/url-to-identifier';
import SoundCache from 'ember-stereo/-private/utils/sound-cache';

import {
  stubConnectionCreateWithSuccess,
  stubConnectionCreateWithFailure
} from '../../helpers/ember-stereo-test-helpers';

let sandbox;

module('Unit | Service | stereo', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  hooks.afterEach(function() {
    let service = this.owner.lookup('service:stereo');
    service.destroy();
    sandbox.restore();
  })

  test('it activates local connections', function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections([{name: 'DummyConnection', config: {'testOption': 'dummy'}}])

    assert.ok(service._connections['DummyConnection'], 'it activated the DummyConnection');
    assert.equal(service._connections['DummyConnection'].config.testOption, 'dummy', 'it passes config options to the DummyConnection');
  });

  test('it returns a list of the available connections', function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['Howler', 'NativeAudio', 'DummyConnection'])
    assert.deepEqual(service.availableConnections, ["Howler", "NativeAudio", "DummyConnection"]);
  });

  test('#load tries the first connection that says it can handle the url', async function(assert) {
    let service = this.owner.lookup('service:stereo').loadConnections([{name: 'Howler'}, { name: 'NativeAudio' }, { name: 'DummyConnection' }]);

    let testUrl = "/good/1000/sound.mp3";

    let Howler                =  get(service, `_connections.Howler`);
    let NativeAudio           =  get(service, `_connections.NativeAudio`);
    let DummyConnection       =  get(service, `_connections.DummyConnection`);

    let howlerSpy             = sandbox.stub(Howler, 'canPlay').returns(false);
    let nativeSpy             = sandbox.stub(NativeAudio, 'canPlay').returns(false);
    let localSpy              = sandbox.stub(DummyConnection, 'canPlay').returns(true);

    let nativeCreateSpy       = sandbox.stub(NativeAudio, 'constructor').returns(sandbox.createStubInstance(NativeAudio));
    let howlerCreateSpy       = sandbox.stub(Howler, 'constructor').returns(sandbox.createStubInstance(Howler));
    let dummyCreateSpy        = sandbox.spy(DummyConnection.prototype, 'setup')

    await service.load(testUrl);

    assert.ok(howlerSpy.calledOnce, "howler canPlay should have been called");
    assert.ok(nativeSpy.calledOnce, "nativeSpy canPlay should have been called");
    assert.ok(localSpy.calledOnce, "local canPlay should have been called");

    assert.equal(howlerCreateSpy.callCount, 0, "Howler connection should not have been used");
    assert.equal(nativeCreateSpy.callCount, 0, "Native connection should not have been used");
    assert.equal(dummyCreateSpy.callCount, 1, "Dummy connection should have been used");
  });

  test('#load stops trying urls after a sound loads and reports accurately', async function(assert) {
    let goodUrl = "/good/10000/test-3.mp3";
    let unusedUrl = "/test/test-4.mp3";
    let error1 = 'unknown error';
    let error2 = 'codec not supported';
    let badUrl1 = `/bad/${error1}/test-1.mp3`;
    let badUrl2 = `/bad/${error2}/test-2.mp3`;
    let expectedUrl;
    let expectedFailures;

    let service = this.owner.lookup('service:stereo').loadConnections([{ name: 'DummyConnection' }]);

    let {sound, failures} = await service.load([badUrl1, badUrl2, goodUrl, unusedUrl]);
    if (sound) {
      expectedUrl = sound.url;
      expectedFailures = failures;
    }
    assert.equal(expectedUrl, goodUrl, "sound returned should have the successful url");
    assert.equal(A(expectedFailures).mapBy('url').length, 2, "should only have two failures");
    assert.equal(expectedFailures[0].error, error1, `first url should have error: ${error1}`);
    assert.equal(expectedFailures[1].error, error2, `second url should have error: ${error2}`);
    assert.equal(expectedFailures[0].url, badUrl1, `first bad url should be: ${badUrl1}`);
    assert.equal(expectedFailures[1].url, badUrl2, `second bad url should be: ${badUrl2}`);
  });

  test('#load can take a promise that resolves urls', async function(assert) {
    let service = this.owner.lookup('service:stereo').loadConnections([{ name: 'DummyConnection' }]);
    let goodUrl        = "good/10000/good.mp3";
    let urlPromise     = new EmberPromise(resolve => {
      later(() => resolve([goodUrl]), 800);
    });
    let expectedUrl;

    let { sound } = await service.load(urlPromise)
    if (sound) {
      expectedUrl = sound.url;
    }
    assert.equal(expectedUrl, goodUrl, "sound returned should have the successful url");
  });

  test('When a sound gets created it gets registered with OneAtATime', async function(assert) {
    let service = this.owner.lookup('service:stereo').loadConnections([{ name: 'DummyConnection' }]);

    let url = "/good/1000/test.mp3";

    let { sound } = await service.load(url);
    assert.deepEqual(service.get('oneAtATime.sounds.firstObject'), sound, "sound should be registered with one at a time");
  });

  test('When a sound plays it gets set as the currentSound', async function(assert) {
    let service = this.owner.lookup('service:stereo').loadConnections([{ name: 'DummyConnection' }]);
    let { sound: sound1 } = await service.load("/good/1000/yes.mp3");
    let { sound: sound2 } = await service.load("/good/2000/another-yes.mp3");

    assert.notOk(service.currentSound, "sound should not be set as current sound yet");

    await sound1.play();
    assert.equal(service.currentSound?.url, sound1.url, "sound1 should be set as current sound");

    await sound2.play();
    assert.equal(service.currentSound?.url, sound2.url, "sound2 should be set as current sound");
  });

  test('Calling setCurrentSound multiple times will not register duplicate events on the sound', async function(assert) {
    assert.expect(2);
    let service = this.owner.lookup('service:stereo').loadConnections([{ name: 'DummyConnection' }]);

    let { sound } = await service.load("/good/10000/yes.mp3");
    var callCount = 0;
    await sound.play();
    service.on('audio-ended', () => {
      callCount = callCount + 1;
    });
    sound.trigger('audio-ended');

    await waitUntil(() => {
      return callCount == 1
    }, { timeout: 5000 });

    assert.equal(callCount, 1, "ended event should have been fired once");
    service.setCurrentSound(sound);
    service.setCurrentSound(sound);
    service.setCurrentSound(sound);
    service.setCurrentSound(sound);
    sound.trigger('audio-ended');
    await waitUntil(() => {
      return callCount == 2
    }, { timeout: 5000 });

    assert.equal(callCount, 2, "ended event should have been fired once");
  });

  test('The second time a url is requested it will be pulled from the cache', async function(assert) {
    assert.expect(4);
    let service = this.owner.lookup('service:stereo').loadConnections([{ name: 'DummyConnection' }]);

    let url = "/good/10000/test.mp3";
    let soundCache = service.soundCache;
    let findSpy = sandbox.stub(soundCache, 'find');
    let cacheSpy = sandbox.stub(soundCache, 'cache');

    findSpy.onFirstCall().returns(false);

    let { sound: sound1 } = await service.load(url);
    assert.equal(findSpy.callCount, 1, "cache should have been checked");
    assert.equal(cacheSpy.callCount, 1, "sound should be registered with sound cache");
    sound1.identification = 'yo';
    findSpy.onSecondCall().returns(sound1);

    let { sound: sound2 } = await service.load(url);
    assert.equal(sound2.identification, 'yo', "should be the same sound in sound cache");
    assert.equal(findSpy.callCount, 2, "cache should have been checked");
  });

  test('The second time a url (with a mime type specified) is requested it will be pulled from the cache', async function(assert) {
    assert.expect(4);
    let service = this.owner.lookup('service:stereo').loadConnections([{ name: 'DummyConnection' }]);

    let url = {url: "/test/test.mp3", mimeType: "audio/mp3"};

    let soundCache = service.soundCache;
    let findSpy = sandbox.stub(soundCache, 'find');
    let cacheSpy = sandbox.stub(soundCache, 'cache');

    findSpy.onFirstCall().returns(false);

    let { sound } = await service.load(url);
    assert.equal(findSpy.callCount, 1, "cache should have been checked");
    assert.equal(cacheSpy.callCount, 1, "sound should be registered with sound cache");
    sound.identification = 'yo';
    findSpy.onSecondCall().returns(sound);

    let { sound: sound2 } = await service.load(url);
    assert.equal(sound2.identification, 'yo', "should be the same sound in sound cache");
    assert.equal(findSpy.callCount, 2, "cache should have been checked");
  });

  test('position gets polled regularly on the currentSound but not on the others', function(assert) {
    this.clock = sandbox.useFakeTimers();

    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])

    const INTERVAL = 500;

    let sound1 = new service._connections['DummyConnection'];
    let sound2 = new service._connections['DummyConnection'];

    let spy1 = sandbox.spy(sound1, '_currentPosition');
    let spy2 = sandbox.spy(sound2, '_currentPosition');

    assert.equal(spy1.callCount, 0, "sound 1 should not have been polled yet");
    assert.equal(spy2.callCount, 0, "sound 1 should not have been polled yet");
    service.set('pollInterval', INTERVAL);
    service.setCurrentSound(sound1);

    this.clock.tick(INTERVAL * 4);

    assert.equal(spy1.callCount, 4, "sound 1 should have been polled 4 times");
    assert.equal(spy2.callCount, 0, "sound 2 should not have been polled yet");
    service.setCurrentSound(sound2);

    this.clock.tick(INTERVAL * 2);

    assert.equal(spy1.callCount, 4, "sound 1 should not have been polled again");
    assert.equal(spy2.callCount, 2, "sound 2 should have been polled twice");

    this.clock.restore();
  });

  test('volume changes are set on the current sound', function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])


    let sound1 = new service._connections['DummyConnection'];
    let sound2 = new service._connections['DummyConnection'];

    let spy1 = sandbox.spy(sound1, '_setVolume');
    let spy2 = sandbox.spy(sound2, '_setVolume');

    let defaultVolume = service.get('defaultVolume');

    assert.equal(service.get('volume'), service.get('defaultVolume'), "service should have default volume");

    assert.equal(spy1.callCount, 0, "volume should not be set");

    service.setCurrentSound(sound1);

    assert.ok(spy1.withArgs(defaultVolume).calledOnce, "volume on sound 1 should be set to default volume");

    service.setCurrentSound(sound2);

    assert.ok(spy2.withArgs(defaultVolume).calledOnce, "volume on sound 2 should be set to default volume after current sound change");

    service.set('volume', 55);

    assert.ok(spy2.withArgs(55).calledOnce, "volume on sound 2 should be set to new system volume");

    service.setCurrentSound(sound1);

    assert.ok(spy1.withArgs(55).calledOnce, "volume on sound 1 should be set to new system volume after current sound change");

    sound1._setVolume(0);
    assert.equal(service.get('volume'), 55, "setting sound volume individually should have no effect on system volume. Relationship is one way.");
  });

  test('toggleMute returns sound to previous level', function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])

    assert.equal(service.get('volume'), service.defaultVolume, "service should have default volume");
    service.set('volume', 75);
    assert.equal(service.get('volume'), 75, "volume should be 75");
    service.toggleMute(); // muted
    assert.equal(service.get('volume'), 0, "volume should be zero");
    assert.equal(service.get('isMuted'), true, "volume should be muted");
    service.toggleMute(); // unmuted
    assert.equal(service.get('volume'), 75, "volume should be reset to previous level");
  });

  test("consumer can specify the connection to use with a particular url", async function(assert) {
    const service = this.owner.lookup('service:stereo');
    let nativeAudioSpy = stubConnectionCreateWithSuccess(service, "NativeAudio", sandbox);

    await service.load("/here/is/a/test/url/test.mp3", {useConnections: ['NativeAudio']});
    assert.equal(nativeAudioSpy.callCount, 1, "Native connection should have been called");
  });

  test("consumer can specify the order of connections to be used with some urls", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['LocalDummyConnection', 'NativeAudio'])
    let nativeAudioSpy    = stubConnectionCreateWithFailure(service, "NativeAudio", sandbox);
    let localAudioSpy     = stubConnectionCreateWithSuccess(service, "LocalDummyConnection", sandbox);

    await service.load("/first/test.mp3", {useConnections: ['NativeAudio', 'LocalDummyConnection']});
    assert.equal(nativeAudioSpy.callCount, 1, "Native connection should have been called");
    assert.equal(localAudioSpy.callCount, 1, "local connection should have been called");
    assert.ok(nativeAudioSpy.calledBefore(localAudioSpy), "native audio should have been tried before local");

    await service.play("/second/test.mp3", {useConnections: ['NativeAudio']});
    assert.equal(nativeAudioSpy.callCount, 2, "Native connection should have been called");
  });

  test("consumer can specify a mime type for a url", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['LocalDummyConnection'])
    let fileObject = {url: "/test/sound-without-extension", mimeType: "audio/mpeg"};

    let LocalDummyConnection = get(service, `_connections.LocalDummyConnection`);

    let mimeTypeSpy = sandbox.stub(LocalDummyConnection, 'canPlayMimeType').returns(true);
    let createSpy = sandbox.stub(LocalDummyConnection.prototype, 'setup').callsFake(function() {
      next(() => this.trigger('audio-ready', { sound: this }));
    });
    await service.load(fileObject);

    assert.ok(mimeTypeSpy.calledOnce, "local canPlayMimeType should have been called");
    assert.ok(createSpy.calledOnce, "A sound should have been created using the local dummy connection");
  });

  test("if a mime type cannot be determined, try to play it anyway", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections([{name: 'LocalDummyConnection'}])
    let mysteryFile = "/test/sound-without-extension";

    let LocalDummyConnection = get(service, `_connections.LocalDummyConnection`);

    let createSpy   = sandbox.stub(LocalDummyConnection.prototype, 'setup').callsFake(function() {
      next(() => this.trigger('audio-ready', { sound: this }));
    });

    await service.load(mysteryFile);
    assert.ok(createSpy.calledOnce, "A sound should have been created");
  });

  test("for desktop devices, try each url on each connection", async function(assert) {
    let urls = ["first-test-url.mp3", "second-test-url.mp3", "third-test-url.mp3"];
    const connections = ['LocalDummyConnection', 'Howler', 'NativeAudio'];
    const service = this.owner.lookup('service:stereo');
    service.loadConnections([{name: connections[0]}, { name: connections[1]}, {name: connections[2]}])
    service.set('isMobileDevice', false);

    let strategyMethodSpy = sandbox.spy(service, '_prepareStandardStrategies');
    let strategyOrderSpy  = sandbox.spy(service, '_prepareAllStrategies');

    stubConnectionCreateWithSuccess(service, "NativeAudio", sandbox);
    stubConnectionCreateWithSuccess(service, "LocalDummyConnection", sandbox);
    stubConnectionCreateWithSuccess(service, "Howler", sandbox);

    await service.load(urls)
    assert.equal(strategyMethodSpy.callCount, 1, "Standard strategy should have been used");
    assert.equal(strategyOrderSpy.callCount, 1, "Should have called internal find method with strategies");

    let correctOrder = [
      `${connections[0]}:${urls[0]}`,
      `${connections[1]}:${urls[0]}`,
      `${connections[2]}:${urls[0]}`,
      `${connections[0]}:${urls[1]}`,
      `${connections[1]}:${urls[1]}`,
      `${connections[2]}:${urls[1]}`,
      `${connections[0]}:${urls[2]}`,
      `${connections[1]}:${urls[2]}`,
      `${connections[2]}:${urls[2]}`,
    ];

    let strategies = strategyOrderSpy.getCall(0).returnValue;
    let actualOrder = [];
    strategies.forEach(strategy => {
      actualOrder.push(`${strategy.connectionKey}:${strategy.url}`);
    });

    assert.deepEqual(actualOrder, correctOrder, "Breadth-first strategy should have been used");
  });

  test("for mobile devices, try all the urls on the native audio connection first, and pass along an audio element", async function(assert) {
    let urls = ["first-test-url.mp3", "second-test-url.mp3", "third-test-url.mp3"];
    const connections = ['LocalDummyConnection', 'Howler', 'NativeAudio'];
    const service = this.owner.lookup('service:stereo');
    service.loadConnections([{name: connections[0]}, { name: connections[1]}, {name: connections[2]}])

    let strategyMethodSpy = sandbox.spy(service, '_prepareMobileStrategies');
    let strategyOrderSpy  = sandbox.spy(service, '_prepareAllStrategies');

    stubConnectionCreateWithSuccess(service, "NativeAudio", sandbox);
    stubConnectionCreateWithSuccess(service, "LocalDummyConnection", sandbox);
    stubConnectionCreateWithSuccess(service, "Howler", sandbox);

    service.set('isMobileDevice', true);

    await service.load(urls);
    assert.equal(strategyMethodSpy.callCount, 1, "Mobile strategy should have been used");
    assert.equal(strategyOrderSpy.callCount, 1, "Should have called internal find method with strategies");

    let correctOrder = [
      `${connections[2]}:${urls[0]}`,
      `${connections[2]}:${urls[1]}`,
      `${connections[2]}:${urls[2]}`,
      `${connections[0]}:${urls[0]}`,
      `${connections[1]}:${urls[0]}`,
      `${connections[0]}:${urls[1]}`,
      `${connections[1]}:${urls[1]}`,
      `${connections[0]}:${urls[2]}`,
      `${connections[1]}:${urls[2]}`,
    ];

    let actualOrder = [];
    let strategies = strategyOrderSpy.getCall(0).returnValue;
    strategies.forEach(strategy => {
      actualOrder.push(`${strategy.connectionKey}:${strategy.url}`);
    });

    assert.deepEqual(actualOrder, correctOrder, "Native audio should have been prioritized first");
    let sharedAudioAccesss = A(A(strategies).map(s => s.sharedAudioAccess)).compact();
    assert.equal(sharedAudioAccesss.length, strategies.length, "audio element should have been included with the strategies");
  });

  test("for mobile devices, audio element should still be passed if a custom strategy is used", async function(assert) {
    let urls        = ["first-test-url.mp3", "second-test-url.mp3", "third-test-url.mp3"];
    let connections = ['DummyConnection', 'Howler', 'NativeAudio'];
    const service = this.owner.lookup('service:stereo').loadConnections(connections)

    stubConnectionCreateWithSuccess(service, "NativeAudio", sandbox);
    stubConnectionCreateWithSuccess(service, "DummyConnection", sandbox);
    stubConnectionCreateWithSuccess(service, "Howler", sandbox);

    let strategySpy       = sandbox.spy(service, '_prepareMobileStrategies');
    let customStrategySpy = sandbox.spy(service, '_prepareStrategies');
    let strategyOrderSpy  = sandbox.spy(service, '_prepareAllStrategies');

    service.set('isMobileDevice', true);

    await service.load(urls, {useConnections:['DummyConnection']})
    assert.equal(strategySpy.callCount, 0, "Mobile strategy should not been used");
    assert.equal(customStrategySpy.callCount, 1, "custom strategy should have been used");
    assert.equal(strategyOrderSpy.callCount, 1, "Should have called internal find method with strategies");

    let correctOrder = [
      `${connections[0]}:${urls[0]}`,
      `${connections[0]}:${urls[1]}`,
      `${connections[0]}:${urls[2]}`,
    ];

    let actualOrder = [];
    let strategies = strategyOrderSpy.firstCall.returnValue;

    strategies.forEach(strategy => {
      actualOrder.push(`${strategy.connectionKey}:${strategy.url}`);
    });

    assert.deepEqual(actualOrder, correctOrder, "Custom strategy should have been used");
    let sharedAudioAccesses = A(A(strategies).map(s => s.sharedAudioAccess)).compact();
    assert.equal(sharedAudioAccesses.length, strategies.length, "audio element should have been included with the strategies");


  });

  test('you can specify alwaysUseSingleAudioElement in config to always use a single audio element', function(assert) {
    const service = this.owner.factoryFor('service:stereo').create({
      options: {
        emberStereo: {
          alwaysUseSingleAudioElement: true,
          connections: [
            { name: 'DummyConnection' },
          ]
        }
      }
    })
    service.loadConnections(['DummyConnection'])
    assert.equal(service.alwaysUseSingleAudioElement, true);
  });

  test("shared audio element should be passed if alwaysUseSingleAudioElement config option is specified", async function(assert) {
    let urls        = ["/good/1000/1.mp3", "/good/1000/2.mp3", "/good/1000/3.mp3"];
    const service = this.owner.factoryFor('service:stereo').create({
      options: {
        emberStereo: {
          alwaysUseSingleAudioElement: true,
          connections: [
            { name: 'DummyConnection' },
          ]
        }
      }
    })
    service.loadConnections(['DummyConnection'])

    let strategyOrderSpy  = sandbox.spy(service, '_prepareAllStrategies');

    service.set('isMobileDevice', false);
    service.set('alwaysUseSingleAudioElement', true);

    await service.load(urls, {useConnections:['DummyConnection']});
    let strategies = strategyOrderSpy.getCall(0).returnValue;

    let sharedAudioAccesss = A(A(strategies).map(s => s.sharedAudioAccess)).compact();
    assert.equal(sharedAudioAccesss.length, strategies.length, "audio element should have been included with the strategies");
  });

  test("individual native audio sounds keep track of their own state", async function(assert) {
    let connections = ['NativeAudio'];
    const service = this.owner.lookup('service:stereo');
    service.loadConnections([{name: connections[0]}])

    let s1url       = "/assets/silence.mp3";
    let s2url       = "/assets/silence2.mp3";

    let { sound: sound1 } = await service.load(s1url);
    let { sound: sound2 } = await service.load(s2url);
    sound1.position = 2000
    assert.equal(sound2._currentPosition(), 0, "second sound should have its own position");

    await sound2.play();
    sound2.position = 1000;

    assert.equal(sound1._currentPosition(), 2000, "first sound should still have its own position");
    assert.equal(sound2._currentPosition(), 1000, "second sound should still have its own position");

    await sound1.play();
    assert.equal(sound1._currentPosition(), 2000, "first sound should still have its own position");
    sound2.position = 9000;
    await sound2.play();
    assert.equal(sound2._currentPosition(), 9000, "second sound should still have its own position");
  });

  test("sound can play on native audio using shared element one after the other", async function(assert) {
    assert.expect(3)
    const service = this.owner.lookup('service:stereo').loadConnections(['NativeAudio'])
    stubConnectionCreateWithSuccess(service, "NativeAudio", sandbox);

    let getSharedCount = 0;
    class FakeAudio {
      control(sound) {
        this.sound = sound;
        return this;
      }

      play() {
        this.sound.trigger('audio-playing', { sound: this.sound })
        this.sound.isPlaying = true;
        return Promise.resolve();
      }
      setAttribute(prop, value) {
        if (prop === 'src' && value !== this.src) {
          this.sound.trigger('audio-ended')
        }

        this[prop] = value;
      }
    }

    let fakeAudioElement = new FakeAudio;

    sandbox.mock(fakeAudioElement);
    sandbox.stub(service._connections['NativeAudio'].prototype, 'requestControl').callsFake(function() {
      if (this.sharedAudioAccess) {
        getSharedCount = getSharedCount + 1;
        return fakeAudioElement.control(this)
      } else {
        return fakeAudioElement.control(this)
      }
    })

    let s1url       = "/assets/silence.mp3";
    let s2url       = "/assets/silence2.mp3";

    service.set('alwaysUseSingleAudioElement', true);
    service.set('isMobileDevice', true);

    let { sound: silence1 } = await service.load(s1url);
    let sharedAccess = silence1.sharedAudioAccess;

    silence1.one('audio-ended', async function() {
      assert.ok("audio ended event was fired");

      let { sound: silence2 } = await service.play(s2url)
      assert.deepEqual(sharedAccess.audioElement, silence2.audioElement, "second sound should be using shared element");

      silence2.stop();
    });

    assert.deepEqual(sharedAccess.audioElement, silence1.audioElement, "sound should be using shared element");

    await silence1.play();
    silence1.position = 10 * 60 * 1000;

    await settled();
  });

  test("service has access to the current sound inside the play callback", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/assets/silence.mp3";

    let { sound } = await service.play(s1url);
    assert.equal(sound.position, service.get('position'));
  });

  test("sound events get relayed at the service level", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/1000/silence.mp3";
    let s2url       = "/good/1000/silence2.mp3";

    let sound1PlayEventTriggered;
    let sound2PlayEventTriggered;
    let sound1PauseEventTriggered;
    let sound2PauseEventTriggered;

    service.on('audio-played', ({sound}) => {
      sound1PlayEventTriggered = urlToIdentifier(sound.url) === urlToIdentifier(s1url);
      sound2PlayEventTriggered = urlToIdentifier(sound.url) === urlToIdentifier(s2url);
    });

    service.on('audio-paused', ({sound}) => {
      sound1PauseEventTriggered = urlToIdentifier(sound.url) === urlToIdentifier(s1url);
      sound2PauseEventTriggered = urlToIdentifier(sound.url) === urlToIdentifier(s2url);
    });

    await service.play(s1url)
    await settled();
    assert.equal(sound1PlayEventTriggered, true, "sound 1 play event should have been triggered");

    let { sound } = await service.play(s2url);
    await settled();

    assert.equal(sound1PauseEventTriggered, true, "sound 1 pause event should have been triggered");
    assert.equal(sound2PlayEventTriggered, true, "sound 2 play event should have been triggered");
    sound.pause();
    assert.equal(sound2PauseEventTriggered, false, "sound 2 pause event should not have been triggered");
  });

  test("service triggers `current-sound-changed` event when sounds change", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/1000/silence.mp3";
    let s2url       = "/good/1000/silence2.mp3";

    service.one('current-sound-changed', ({sound, previousSound}) => {
      assert.equal(previousSound, undefined, "there should not a previous sound");
      assert.equal(sound.url, s1url, "current sound should be the first sound");
    });

    await service.play(s1url);

    service.one('current-sound-changed', ({sound, previousSound}) => {
      assert.equal(previousSound.url, s1url, "previous sound should be this sound");
      assert.equal(sound.url, s2url);
    });

    await service.play(s2url)
  });

  test("metadata can be sent with a play and load request and it will stay with the sound", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/1000/silence.mp3";
    let s2url       = "/good/1000/silence2.mp3";

    let storyId = 12544;
    let { sound:sound1 } = await service.play(s1url, {metadata: {
      storyId: storyId
    }})
    assert.equal(sound1.metadata.storyId, storyId, "storyId should be in metadata");
    let { sound:sound2 } = await service.play(s2url);
    assert.equal(sound2.metadata.storyId, undefined, "metadata hasn't been set and shouldn't exist");
    assert.equal(sound1.metadata.storyId, storyId, "storyId should be in saved sound");
  });

  test("current-sound-interrupted event gets fired when a new `play` request happens while a sound is playing", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/1000/silence.mp3";
    let s2url       = "/good/1000/silence2.mp3";

    assert.expect(1);

    let handler = ({sound}) => {
      assert.equal(sound.url, s1url, "current sound should be reported as interrupted");
    }

    service.one('current-sound-interrupted', handler);
    await service.play(s1url);
    await service.play(s2url);
  });

  test("current-sound-interrupted event gets fired when another sound starts playing while one is already playing", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/1000/silence.mp3";
    let s2url       = "/good/1000/silence2.mp3";

    let result;
    service.on('current-sound-interrupted', ({sound}) => {
      result = sound;
    });

    let { sound: sound1 } = await service.play(s1url);
    await service.play(s2url);

    assert.equal(result, sound1, "current sound should be the one that got interrupted");
  });

  test("current-sound-interrupted event does not fire when position gets changed", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])

    let s1url       = "/good/10000/silence.mp3";

    let callCount = 0;
    service.on('current-sound-interrupted', () => {
      callCount = callCount + 1;
    });

    let { sound } = await service.play(s1url);
    sound.position = 100
    sound.position = 1500
    assert.equal(callCount, 0, "interrupt should not have been called");
  });

  test("new-load-request gets fired on new load and play requests", async function(assert) {
    assert.expect(4)
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])

    let s1url       = "/assets/silence.mp3";
    let s2url       = "/assets/silence2.mp3";

    let count = 0;
    let handler = (opts) => {
      let {urlsOrPromise, options} = opts;

      if (count == 0) {
        assert.equal(urlsOrPromise, s1url, "url should equal url passed in");
        assert.equal(options.metadata.id, 1, "metadata id should be equal");
      }
      else if (count === 1) {
        assert.equal(urlsOrPromise, s2url, "url should equal url passed in");
        assert.equal(options.metadata.id, undefined, "metadata id should be undefined");
        service.off('new-load-request', handler);
        // done();
      }
      count = count + 1;
    }

    service.on('new-load-request', handler);

    await service.play(s1url, {metadata: {id: 1}});
    await service.load(s2url);
  });

  test("new-load-request gets fired on new load requests that are cached", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/assets/silence.mp3";

    assert.expect(4);

    let count = 0;
    service.on('new-load-request', ({urlsOrPromise, options}) => {
      if (count == 0) {
        assert.equal(urlsOrPromise, s1url, "url should equal url passed in");
        assert.equal(options.metadata.id, 1, "metadata id should be equale");
      }
      else if (count === 1) {
        assert.equal(urlsOrPromise, s1url, "url should equal url passed in");
        assert.equal(options.metadata.id, 2, "metadata id should be 2");
      }
      count = count + 1;
    });

    await service.load(s1url, {metadata: {id: 1}});
    await service.load(s1url, {metadata: {id: 2}});
  });

  test("audio-position-will-change gets fired on position changes", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/15000/test";

    assert.expect(2);

    service.on('audio-position-will-change', ({currentPosition, newPosition}) => {
      assert.equal(currentPosition, 0, "current position should be zero");
      assert.equal(newPosition, 5000, "new position should be 5000");
    });

    await service.play(s1url);
    service.set('position', 5000);
  });

  test("audio-will-rewind gets fired on rewind", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/15000/test2";
    let done        = assert.async();
    let count       = 0;

    service.on('audio-will-rewind', ({currentPosition, newPosition}) => {
      if (count === 0) {
        assert.equal(currentPosition, 5000, "current position should be 5000");
        assert.equal(newPosition, 4000, "new position should be 4000");
        count = count + 1;
      }
      else if (count === 1) {
        assert.equal(currentPosition, 4000, "current position should be 4000");
        assert.equal(newPosition, 0, "new position should be 0");
        done();
      }
    });

    await service.play(s1url, {position: 5000});
    service.rewind(1000);

    service.rewind(6000);
  });

  test("audio-will-fast-forward gets fired on fast forward", async function(assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection'])
    let s1url       = "/good/15000/1.mp3";
    assert.expect(2);

    service.on('audio-will-fast-forward', ({currentPosition, newPosition}) => {
      assert.equal(currentPosition, 5000, "current position should be 5000");
      assert.equal(newPosition, 6000, "new position should be 6000");
    });

    await service.play(s1url, {position: 5000});
    service.fastForward(1000);
  });

  test("altering a sound's url during the pre-load event will not prevent the cache", async function(assert) {
    let url = '/good/15000/1.mp3';

    let soundCache = new SoundCache();
    let service = this.owner.lookup('service:stereo').loadConnections(['DummyConnection']);

    service.soundCache = soundCache

    let cacheSpy = sandbox.spy(soundCache, 'cache');
    let findSpy = sandbox.spy(soundCache, 'find');

    let urlSpy = sandbox.spy(urls => urls.forEach((url, i) => urls[i] = `${url}?foo=bar`));

    service.on('pre-load', urlSpy);

    await service.play(url);
    service.pause();
    await service.play(url)
    assert.equal(cacheSpy.firstCall.args[0].url, `${url}?foo=bar`, 'cache lookup with expected value');
    assert.deepEqual(findSpy.secondCall.args[0], [cacheSpy.firstCall.args[0].url], 'lookup key is the same as the cached key');
    assert.equal(urlSpy.callCount, 2, 'callback is called');
  });
});
