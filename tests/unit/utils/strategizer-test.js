import { module, test } from 'qunit';
import Strategizer from 'ember-stereo/-private/utils/strategizer';
import Strategy from 'ember-stereo/-private/utils/strategy';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import { setupTest } from 'ember-qunit';
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Unit | Utility | strategizer', function (hooks) {
  setupTest(hooks);
  setupStereoTest(hooks);
  var service;
  hooks.beforeEach(function () {
    service = this.owner.lookup('service:stereo').loadConnections(['LocalDummyConnection', 'NativeAudio']);
    service.useSharedAudioAccess = false
  });
  hooks.afterEach(function () {
    service.destroy()
  });

  test('yields strategies', async function (assert) {
    assert.expect(4);
    let urls = ['/good/10000/sound.mp3']

    let strategizer = new Strategizer(urls, {
      connections: service.connections
    })

    strategizer.strategies.forEach(strategy => {
      assert.true((strategy instanceof Strategy), 'strategy is an instance of Strategy')
      assert.equal(strategy.url, new StereoUrl('/good/10000/sound.mp3').url, "url is fully qualified")
    });
  });

  test('passes audio element to strategy if specified', async function (assert) {
    assert.expect(5);

    let urls = ['/good/10000/sound.mp3']

    let strategizer = new Strategizer(urls, {
      connections: service.connections,
      useSharedAudioAccess: true,
      sharedAudioAccess: { audio: 'shared-key' }
    })

    assert.true(strategizer.useSharedAudioAccess, 'use shared audio access')

    strategizer.strategies.forEach(strategy => {
      assert.equal(strategy.url, new StereoUrl('/good/10000/sound.mp3').url, "url is fully qualified")
      assert.equal(strategy.sharedAudioAccess.audio, 'shared-key')
    })
  });

  test('does not pass shared audio to strategy if not specified', async function (assert) {
    assert.expect(3);

    let urls = ['/good/10000/sound.mp3']

    let strategizer = new Strategizer(urls, {
      connections: service.connections,
      useSharedAudioAccess: false,
      sharedAudioAccess: { audio: 'shared-key' }
    })

    assert.false(strategizer.useSharedAudioAccess, 'do not use shared audio access')

    strategizer.strategies.forEach(strategy => {
      assert.equal(strategy.sharedAudioAccess, undefined)
    })
  });

  test('should have correct order for standard strategy attempt', async function (assert) {
    let urls = ['/good/10000/sound.mp3', '/good/10000/sound.aac']

    let strategizer = new Strategizer(urls, {
      connections: service.connections
    })

    assert.true(strategizer.useStandardStrategy)
    assert.false(strategizer.useMobileStrategy)
    assert.false(strategizer.useCustomStrategy)

    let strategies = strategizer.strategies.map(strat => [
      strat.connectionName,
      strat.url
    ])

    assert.deepEqual(strategies, [
      [
        "Local Dummy Connection",
        new StereoUrl(urls[0]).url
      ],
      [
        "Native Audio",
        new StereoUrl(urls[0]).url
      ],
      [
        "Local Dummy Connection",
        new StereoUrl(urls[1]).url
      ],
      [
        "Native Audio",
        new StereoUrl(urls[1]).url
      ]
    ])
  });

  test('should have correct order for mobile strategy attempt', async function (assert) {
    let urls = ['/good/10000/sound.mp3', '/good/10000/sound.aac']

    let strategizer = new Strategizer(urls, {
      connections: service.connections,
      isMobileDevice: true
    })

    assert.false(strategizer.useStandardStrategy)
    assert.true(strategizer.useMobileStrategy)
    assert.false(strategizer.useCustomStrategy)

    let strategies = strategizer.strategies.map(strat => [
      strat.connectionName,
      strat.url
    ])

    assert.deepEqual(strategies, [
      [
        "Native Audio",
        new StereoUrl(urls[0]).url
      ],
      [
        "Native Audio",
        new StereoUrl(urls[1]).url
      ],
      [
        "Local Dummy Connection",
        new StereoUrl(urls[0]).url
      ],
      [
        "Local Dummy Connection",
        new StereoUrl(urls[1]).url
      ]
    ])
  });

  test('should have correct order for custom strategy attempt', async function (assert) {
    let urls = ['/good/10000/sound.mp3', '/good/10000/sound.aac']

    let strategizer = new Strategizer(urls, {
      connections: service.connections,
      useConnections: ['NativeAudio'],
      isMobileDevice: true
    })

    assert.false(strategizer.useStandardStrategy)
    assert.true(strategizer.useCustomStrategy)

    let strategies = strategizer.strategies.map(strat => [
      strat.connectionName,
      strat.url
    ])

    assert.deepEqual(strategies, [
      [
        "Native Audio",
        new StereoUrl(urls[0]).url
      ],
      [
        "Native Audio",
        new StereoUrl(urls[1]).url
      ],
    ])
  });

  test('it throws an error if no connections are specified', async function (assert) {
    assert.expect(1)
    let urls = ['/good/10000/sound.mp3', '/good/10000/sound.aac']

    try {
      new Strategizer(urls, {
        connections: service.connections,
        useConnections: [],
      }).strategies

    } catch (r) {
      assert.equal(r.message, "No connections selected");
    }
  })
});




