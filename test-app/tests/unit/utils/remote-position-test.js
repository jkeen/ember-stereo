import { module, test } from 'qunit';
import RemotePosition from 'ember-stereo/-private/casting/remote-position';

module('Unit | Utility | remote-position', function () {
  test('a stream runs on the stopwatch and ignores what the transport reports', function (assert) {
    let position = new RemotePosition();
    position.anchor(1000);

    let playing = position.positionFor({
      reportedMs: 0,
      isPlaying: true,
      isStream: true,
    });
    assert.ok(playing >= 1000, 'drifts forward from the anchor while playing');
    assert.ok(playing < 61000, 'drifts by a sane amount, not wildly');

    assert.strictEqual(
      position.positionFor({ reportedMs: 0, isStream: true }),
      1000,
      'freezes at the anchor while paused',
    );
  });

  test('a settling seek ignores a stale report', function (assert) {
    let position = new RemotePosition();
    position.beginSeek(60000);

    assert.true(position.isSettling, 'distrusts the transport after a seek');
    assert.strictEqual(
      position.positionFor({ reportedMs: 10000 }),
      60000,
      'reports the seek target, not the pre-seek clock',
    );
  });

  test('catching up ends the settle window early', function (assert) {
    let position = new RemotePosition();
    position.beginSeek(60000);
    position.positionFor({ reportedMs: 60500 });

    assert.false(position.isSettling, 'the transport caught up');
    assert.strictEqual(
      position.positionFor({ reportedMs: 61000 }),
      61000,
      'back to trusting the transport',
    );
  });

  test('the window expiring ends the settle even if the transport never catches up', function (assert) {
    let position = new RemotePosition({ windowMs: 0 });
    position.beginSeek(60000);

    assert.false(position.isSettling, 'the window is already spent');
    assert.strictEqual(
      position.positionFor({ reportedMs: 10000 }),
      10000,
      'adopts the report rather than distrusting it forever',
    );
  });

  test('a frozen clock falls back to the stopwatch while playing', function (assert) {
    let position = new RemotePosition();
    position.anchor(0);
    position.positionFor({ reportedMs: 5000, isPlaying: true });

    assert.ok(
      position.positionFor({ reportedMs: 5000, isPlaying: true }) >= 5000,
      'an unchanged report drifts forward instead of freezing',
    );
    assert.strictEqual(
      position.positionFor({ reportedMs: 5000 }),
      5000,
      'a paused frozen clock holds at the last adopted position',
    );
  });

  test('seed adopts a position without opening a settle window', function (assert) {
    let position = new RemotePosition();
    position.beginSeek(60000);
    position.seed(0);

    assert.false(position.isSettling, 'seeding clears any pending seek');
    assert.strictEqual(
      position.positionFor({ reportedMs: 250 }),
      250,
      'trusts the transport immediately after seeding',
    );
  });
});
