import { module, test } from 'qunit';
import DeadReckonClock from 'ember-stereo/-private/utils/dead-reckon-clock';

// The shared dead-reckon clock for the cast connections (Chromecast,
// NativeAudioCasting). Mixed onto a bare base here to test it in isolation.
class Clocked extends DeadReckonClock(class {}) {
  isPlaying = true;
}

module('Unit | Utility | dead-reckon-clock', function () {
  test('estimates elapsed from the anchor + wall-clock drift while playing', function (assert) {
    let clock = new Clocked();
    clock._anchor(1000);

    assert.ok(
      clock._estimate() >= 1000,
      'estimate is at least the anchored position while playing',
    );
    assert.ok(
      clock._estimate() < 1000 + 60000,
      'estimate drifts forward by a sane amount, not wildly',
    );
  });

  test('freezes at the anchor when paused', function (assert) {
    let clock = new Clocked();
    clock._anchor(2500);
    clock.isPlaying = false;

    assert.strictEqual(
      clock._estimate(),
      2500,
      'a paused clock reports exactly the anchor, with no drift',
    );
  });

  test('re-anchoring resets the baseline', function (assert) {
    let clock = new Clocked();
    clock._anchor(1000);
    clock._anchor(5000);
    clock.isPlaying = false;

    assert.strictEqual(clock._estimate(), 5000, 'the latest anchor wins');
  });
});
