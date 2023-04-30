import { getMimeType } from 'ember-stereo/-private/utils/mime-types';
import { module, test } from 'qunit';

module('Unit | Utility | mime types', function () {
  test('it works', function (assert) {
    let mp3Url =
      'http://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/takeaway/takeaway022616-apple.mp3';
    let mp3UrlWithParams = mp3Url + '?foobar';
    let hlsUrl =
      'http://wnyc-wowza.streamguys.com/wnycfm/wnycfm.sdp/playlist.m3u8';
    let unknownUrl = 'http://fm939.wnyc.org/wnycfm';

    let mp3Mime = getMimeType(mp3Url);
    let mp3MimeWithParams = getMimeType(mp3UrlWithParams);
    let m3u8Mime = getMimeType(hlsUrl);
    let unknownMime = getMimeType(unknownUrl);

    assert.strictEqual(mp3Mime, 'audio/mpeg');
    assert.strictEqual(mp3MimeWithParams, 'audio/mpeg');
    assert.strictEqual(m3u8Mime, 'application/vnd.apple.mpegurl');
    assert.false(unknownMime);
  });
});
