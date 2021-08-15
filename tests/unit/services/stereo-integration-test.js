// import { registerWaiter } from '@ember/test';
import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { dummyStereo } from '../../../tests/helpers/stereo-integration-helpers';
// import Ember from 'ember';

// let originalOnError = Ember.onerror;
// function catchExpectedErrors(expectedErrors) {
//   Ember.onerror = function(error) {
//     if (!expectedErrors.includes(error.message.replace(/(Uncaught\s)?Error:\s/, ""))) {
//       // some environments will throw Uncaught Error, some will throw Error
//       originalOnError.apply(window, arguments);
//     }
//   }
// }

module('Unit | Service | stereo integration test.js', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:stereo', dummyStereo);
    this.stereo = this.owner.lookup('service:stereo')
    this.stereo.loadConnections([{name: 'DummyConnection'}])

  });

  // hooks.afterEach(function() {
  //   window.onerror = originalOnError;
  // });

  test('it activates local connections', function (assert) {
    const service = this.owner.lookup('service:stereo')
    service.loadConnections([{ name: 'LocalDummyConnection', config: { 'testOption': 'dummy' } }])

    assert.deepEqual(service.connectionLoader.names, ['LocalDummyConnection'], 'it activated the LocalDummyConnection');
    assert.equal(service.connectionLoader.get('LocalDummyConnection').config.testOption, 'dummy', 'it passes config options to the LocalDummyConnection');
  });

  test('playing good url works', async function(assert) {
    let service = this.owner.lookup('service:audio')

    let { sound } = await service.playGood()
    assert.ok(sound);
  });

  test('playing a blank url fails', async function(assert) {
    let service = this.owner.lookup('service:audio')
    let failures, results;

    try {
      await service.playBlank();
    } catch(r) {
      results = r;
      failures = results.failures;
      assert.notOk(failures, "should not be failures");
    }
  });

  test('it sets fixed duration correctly', async function(assert) {
    let stereo = this.owner.lookup('service:stereo');
    stereo.loadConnections([{name: 'DummyConnection'}]);

    let { sound } = await stereo.load('/good/2500/test')
    assert.equal(sound.duration, 2500);
  });

  test('by default it succeeds and pretends its a 1 second long file', async function(assert) {
    let stereo = this.owner.lookup('service:stereo');
    stereo.loadConnections([{name: 'DummyConnection'}]);

    let { sound } = await stereo.load('http://test.example')
    assert.equal(sound.duration, 1000);
  });

  test('it sets stream duration correctly', async function(assert) {
    let stereo = this.owner.lookup('service:stereo');
    stereo.loadConnections([{name: 'DummyConnection'}]);

    let { sound } = await stereo.load('/good/stream/test')
    assert.equal(sound.duration, Infinity, "duration should be infinity");
    assert.true(sound.isStream, "should be stream");
  });

  test('it simulates play', function(assert) {
    // registerWaiter(this, function() {
    //   return this.sound && this.sound._tickInterval * ticks === this.sound._currentPosition();
    // });
    let done = assert.async();
    assert.expect(3);
    let service = this.owner.factoryFor('service:audio').create({});
    let stereo = service.get('stereo');
    let ticks = 5;

    stereo.play('/good/1500/test/yes').then(({sound}) => {
      this.sound = sound;
      let tickInterval = sound._tickInterval;
      assert.equal(sound._currentPosition(), 0, "initial position should be 0");
      later(() => {
        assert.equal(sound._currentPosition(), tickInterval * ticks, `position should be ${tickInterval * ticks}`);
        assert.true(sound.isPlaying, "should be playing");
        done();
        sound.stop();
      }, (tickInterval * (ticks + 1)))
    });
  });

  test('it can not rewind before 0', async function(assert) {
    let done = assert.async();
    let stereo = this.owner.lookup('service:stereo');

    stereo.one('audio-will-rewind', ({newPosition}) => {
      assert.equal(newPosition, 0, "sound should be at the start");
      done();
    });

    await stereo.play('/good/10000/test')
    stereo.rewind(5000);
  });

  test('it can not fast forward past duration', function(assert) {
    let done = assert.async();
    let service = this.owner.factoryFor('service:audio').create({});
    let stereo = service.get('stereo');

    stereo.play('/good/1000/test').then(() => {
      stereo.fastForward(5000);
      assert.equal(stereo.get('position'), 1000, "sound should be at the end");
      done();
    });
  });

  test('it sends an audio-ended event when the sound ends',function(assert) {
    let done = assert.async();
    let stereo = this.owner.lookup('service:stereo');

    stereo.one('audio-ended', ({sound}) => {
      assert.equal(sound.position, 1000, "sound should be at the end");
      done();
    });

    stereo.play('/good/1000/test').then(() => {
      stereo.set('position', 15000);
    })
  });
});
