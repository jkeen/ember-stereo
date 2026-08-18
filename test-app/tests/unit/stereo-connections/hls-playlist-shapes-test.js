import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { waitUntil } from '@ember/test-helpers';

// Real playlists, served from test-app/public/hls. They differ only in #EXT-X-ENDLIST,
// PLAYLIST-TYPE and MEDIA-SEQUENCE.
//
// setupStereoTest stubs document.createElement, and hls.js can't attach to a fake element.
const VOD = '/hls/vod.m3u8';
const SLIDING_LIVE = '/hls/sliding-live.m3u8';
// The header an encoder ships for a show still on air, with segments pointed at local files.
const EVENT_TIMESTAMPED = '/hls/event-timestamped.m3u8';

module('Unit | Connection | HLS playlist shapes', function (hooks) {
  setupTest(hooks);

  async function load(owner, url, options = {}) {
    let stereo = owner.lookup('service:stereo').loadConnections(['HLS']);
    let { connection } = await stereo.load(url, {
      useConnections: ['HLS'],
      ...options,
    });

    // Infinity is > 0 too, so this waits for any answer, not a finite one.
    await waitUntil(() => connection.duration > 0, { timeout: 5000 });

    return connection;
  }

  test('a finished recording is bounded and seekable', async function (assert) {
    let connection = await load(this.owner, VOD);

    assert.false(connection.isStream, 'not a stream');
    assert.true(Number.isFinite(connection.duration), 'with a real duration');
    assert.true(connection.isSeekable, 'and it can be scrubbed');
  });

  test('a show still on air is live, with the length it has so far', async function (assert) {
    let connection = await load(this.owner, EVENT_TIMESTAMPED);

    assert.true(connection.isLive, 'no ENDLIST, so it is still being written');
    assert.true(
      Number.isFinite(connection.duration),
      'and its beginning is still there to measure from',
    );
    assert.strictEqual(
      connection.isStream,
      connection.duration === Infinity,
      'so isStream agrees with the duration it reports',
    );
    assert.false(
      connection.isStream,
      'which makes it a recording, not a stream',
    );
    assert.true(
      connection.isSeekable,
      'seekable back to the start of the show',
    );
  });

  test('a playlist whose segments fall off the back reads as a recording', async function (assert) {
    let connection = await load(this.owner, SLIDING_LIVE);

    assert.false(
      connection.isStream,
      'undeclared, it looks like any other archive',
    );
  });

  test('declaring an endless duration settles it', async function (assert) {
    let connection = await load(this.owner, SLIDING_LIVE, {
      duration: Infinity,
    });

    assert.true(
      connection.isStream,
      'the app said so, and nothing measured it',
    );
  });
});
