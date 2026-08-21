import { tracked } from '@glimmer/tracking';
import { isTesting, macroCondition } from '@embroider/macros';
import { task, timeout } from 'ember-concurrency';

const DURATION_SAMPLE_LIMIT = 20;

// A live source hands over audio as fast as it happens, so its duration climbs about a second per second.
const SLOWEST_LIVE_GROWTH = 0.5;
const FASTEST_LIVE_GROWTH = 2;

// Enough elapsed time that a one-off correction can't average out to realtime.
const MIN_LIVE_SPAN_MS = 1000;

// Firefox moves the duration in steps rather than smoothly, so growth is read across the window.
const MIN_LIVE_INCREASES = 2;

// Opera reports huge finite durations instead of Infinity.
const IMPLAUSIBLE_DURATION_MS = 172800000; // 2 days

// A seekable range that doesn't start at zero is a sliding window, not a recording.
const SEEKABLE_START_TOLERANCE = 1;

/**
 * Whether a series of duration samples grows in step with the clock, which is
 * what separates a live source from a browser refining its estimate of a
 * recording. Exported to be tested without waiting on the sampler.
 *
 * @param {Array} samples `{ durationMs, timeMs }` readings, oldest first
 * @return {Boolean}
 */
export function durationGrowsWithTheClock(samples = []) {
  let measured = samples.filter((sample) => Number.isFinite(sample.durationMs));

  if (measured.length < 2) {
    return false;
  }

  let oldest = measured[0];
  let newest = measured[measured.length - 1];
  let span = newest.timeMs - oldest.timeMs;

  if (span < MIN_LIVE_SPAN_MS) {
    return false;
  }

  let increases = 0;
  for (let index = 1; index < measured.length; index++) {
    if (measured[index].durationMs > measured[index - 1].durationMs) {
      increases++;
    }
  }

  if (increases < MIN_LIVE_INCREASES) {
    return false;
  }

  let growthRate = (newest.durationMs - oldest.durationMs) / span;

  return growthRate >= SLOWEST_LIVE_GROWTH && growthRate <= FASTEST_LIVE_GROWTH;
}

/**
 * A stream with no obvious mime-type or extension often reports a duration that grows
 * as it plays rather than `Infinity`, hacks were scattered to accomodate for this before.
 * Now all that mess can mostly be contained in this class.
 *
 * @class MediaLength
 */
export default class MediaLength {
  @tracked _samples = [];
  @tracked _provedLive = false;

  constructor({ sampleMs = 250 } = {}) {
    this.sampleMs = sampleMs;
    this._lastRecordedMs = null;
  }

  record(durationMs, timeMs = Date.now()) {
    if (!Number.isFinite(durationMs)) {
      return;
    }
    this._samples = [
      ...this._samples.slice(-(DURATION_SAMPLE_LIMIT - 1)),
      { durationMs, timeMs },
    ];
    this._provedLive ||= durationGrowsWithTheClock(this._samples);
  }

  // A prior connection to the same source already measured this, and re-deriving it costs a second of wrong duration.
  assumeLive() {
    this._provedLive = true;
  }

  // Replaying a stream reloads the element, so the readings that proved it live start over.
  sourceReloaded() {
    this._samples = [];
    this._lastRecordedMs = null;
  }

  // Sampling is how it learns, so it lives with the thing being learned.
  watchTask = task(
    { restartable: true },
    async ({ durationMs, isPlaying, onReclassified }) => {
      if (macroCondition(isTesting())) {
        return;
      }

      let wasLive = this.isLive;

      while (isPlaying()) {
        this.record(durationMs());

        if (this.isLive !== wasLive) {
          wasLive = this.isLive;
          onReclassified();
        }

        await timeout(this.sampleMs);
      }
    }
  );

  get isLive() {
    return this._provedLive;
  }

  // A range that starts past zero is a sliding window over a live edge, not a length.
  seekableMs(seekable) {
    if (!seekable?.length) {
      return null;
    }

    let start = seekable.start(0);
    let end = seekable.end(seekable.length - 1);

    if (start > SEEKABLE_START_TOLERANCE || !Number.isFinite(end) || end <= 0) {
      return null;
    }

    this._lastRecordedMs = end * 1000;
    return this._lastRecordedMs;
  }

  // A still-airing HLS archive has no #EXT-X-ENDLIST, so duration grows without bound yet the media still seeks.
  seekableWindowMs({ elementDurationMs, seekable }) {
    if (!seekable?.length || Number.isFinite(elementDurationMs)) {
      return 0;
    }
    let window = (seekable.end(seekable.length - 1) - seekable.start(0)) * 1000;
    return Number.isFinite(window) ? window : 0;
  }

  estimate({ elementDurationMs, seekable }) {
    if (elementDurationMs > IMPLAUSIBLE_DURATION_MS || this.isLive) {
      let recorded = Number.isFinite(elementDurationMs)
        ? null
        : this.seekableMs(seekable) ?? this._lastRecordedMs;
      return recorded ?? Infinity;
    }
    return elementDurationMs;
  }
}
