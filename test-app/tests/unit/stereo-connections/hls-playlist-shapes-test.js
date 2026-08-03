import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { waitUntil } from '@ember/test-helpers';

// Real playlists, served from test-app/public/hls. See the README there — they
// differ only in #EXT-X-ENDLIST, PLAYLIST-TYPE and MEDIA-SEQUENCE, which is
// what anything telling them apart has to read.
//
// These deliberately skip setupStereoTest: it stubs document.createElement so
// media elements are fake, and hls.js can't attach to one of those.
const VOD = '/hls/vod.m3u8';
const SLIDING_LIVE = '/hls/sliding-live.m3u8';
// The header an encoder in the wild ships for a show still on air, with the
// segments pointed at local files.
const EVENT_TIMESTAMPED = '/hls/event-timestamped.m3u8';

module('Unit | Connection | HLS playlist shapes', function (hooks) {
  setupTest(hooks);

  async function load(owner, url, options = {}) {
    let stereo = owner.lookup('service:stereo').loadConnections(['HLS']);
    let { sound } = await stereo.load(url, {
      useConnections: ['HLS'],
      ...options,
    });

    // Infinity is > 0 too, so this waits for any answer, not a finite one.
    await waitUntil(() => sound.duration > 0, { timeout: 5000 });

    return sound;
  }

  test('a finished recording is bounded and seekable', async function (assert) {
    let sound = await load(this.owner, VOD);

    assert.false(sound.isStream, 'not a stream');
    assert.true(Number.isFinite(sound.duration), 'with a real duration');
    assert.true(sound.isSeekable, 'and it can be scrubbed');
  });

  test('a show still on air is live, with the length it has so far', async function (assert) {
    let sound = await load(this.owner, EVENT_TIMESTAMPED);

    assert.true(sound.isLive, 'no ENDLIST, so it is still being written');
    assert.true(
      Number.isFinite(sound.duration),
      'and its beginning is still there to measure from',
    );
    assert.strictEqual(
      sound.isStream,
      sound.duration === Infinity,
      'so isStream agrees with the duration it reports',
    );
    assert.false(sound.isStream, 'which makes it a recording, not a stream');
    assert.true(sound.isSeekable, 'seekable back to the start of the show');
  });

  // Nothing in the media says the origin is moving — hls.js sizes the
  // MediaSource from what it holds either way — so an app serving one says so.
  test('a playlist whose segments fall off the back reads as a recording', async function (assert) {
    let sound = await load(this.owner, SLIDING_LIVE);

    assert.false(sound.isStream, 'undeclared, it looks like any other archive');
  });

  test('declaring an endless duration settles it', async function (assert) {
    let sound = await load(this.owner, SLIDING_LIVE, { duration: Infinity });

    assert.true(sound.isStream, 'the app said so, and nothing measured it');
  });
});
