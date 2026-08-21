import { isTesting, macroCondition } from '@embroider/macros';
import NativeAudio from './native-audio';
import isSameAudio from '../-private/utils/is-same-audio';
import RemotePosition from '../-private/casting/remote-position';

// Safari fires a spurious 'ended' after a fresh-src seek while AirPlaying.
const END_TOLERANCE_MS = 1500;

const HAVE_METADATA = 1;

/**
 * NativeAudio but driving the shared cast audio element. It overrides whatever touches the
 * element in a way the device does not follow
 *
 * @class NativeAudioCasting
 * @extends NativeAudio
 */
export default class NativeAudioCasting extends NativeAudio {
  static key = 'NativeAudioCasting';
  static toString() {
    return 'NativeAudioCasting';
  }

  // The device fetches whatever url it's handed.
  static canPlay() {
    return true;
  }

  // setup() runs from the BaseSound constructor, before any class field initialiser.
  get _remotePosition() {
    return (this.__remotePosition ??= new RemotePosition());
  }

  // Changing this element's src makes Safari drop and rebuild the device connection.
  requestControl() {
    this.options?.onSourceChange?.();
    return super.requestControl();
  }

  // Any src reset on the cast element drops the AirPlay route.
  defeatBrowserCaching() {}

  // A direct currentTime write leaves the device silent.
  _seekToLiveEdge(audio) {
    // A paused element was just loaded, so it already sits at the live edge.
    if (audio.paused) {
      return;
    }

    let seekable = audio.seekable;
    if (!seekable?.length) {
      return;
    }
    this._setPosition(seekable.end(seekable.length - 1) * 1000);
  }

  // The cast element has no crossorigin to drop, so retrying only costs the device.
  get shouldRetry() {
    return false;
  }

  setup() {
    let element = this.requestControl();
    this._registerEvents(element);
    this.retryCount = 0;

    if (macroCondition(isTesting())) {
      element.muted = true;
    }

    if (!isSameAudio(element.src, this.url, { exact: true })) {
      this.debug(`casting: pointing cast element at ${this.url}`);
      element.src = this.url;
      element.load();
      this.options?.onSourceChange?.();
    } else if (element.readyState >= HAVE_METADATA) {
      this.debug('casting: cast element already loaded this url; not reloading');
      this._onAudioReady();
    }
  }

  _reportedPosition() {
    let element = this.audioElement;
    if (!element || element.readyState < HAVE_METADATA) {
      return null;
    }
    return (element.currentTime || 0) * 1000;
  }

  // A live stream's currentTime restarts per connection.
  seedPosition(positionMs) {
    this._remotePosition.seed(positionMs);
    this._position = positionMs;
  }

  _currentPosition() {
    return this._remotePosition.positionFor({
      reportedMs: this._reportedPosition(),
      isPlaying: this.isPlaying,
      isStream: this.isStream,
    });
  }

  _setPosition(positionMs) {
    this._remotePosition.beginSeek(positionMs);

    let element = this.audioElement;
    let seconds = positionMs / 1000;
    let apply = () => {
      // A {once:true} listener has already self-removed by now, so drop the stale ref.
      this._pendingSeekElement = null;
      this._pendingSeekApply = null;
      try {
        // While routed, a plain currentTime write often moves only the local clock.
        if (element.webkitCurrentPlaybackTargetIsWireless && !element.paused) {
          element.pause();
          element.currentTime = seconds;
          let played = element.play();
          if (played && typeof played.catch === 'function') {
            played.catch(() => {});
          }
        } else {
          element.currentTime = seconds;
        }
      } catch (e) {}
    };

    if (element.readyState >= HAVE_METADATA) {
      apply();
    } else {
      this._cancelPendingSeek();
      this._pendingSeekElement = element;
      this._pendingSeekApply = apply;
      element.addEventListener('loadedmetadata', apply, { once: true });
    }

    return positionMs;
  }

  _cancelPendingSeek() {
    if (this._pendingSeekElement && this._pendingSeekApply) {
      this._pendingSeekElement.removeEventListener(
        'loadedmetadata',
        this._pendingSeekApply,
      );
    }
    this._pendingSeekElement = null;
    this._pendingSeekApply = null;
  }

  play(options) {
    let result = super.play(options);
    this._remotePosition.reanchor(this.isPlaying);
    return result;
  }

  pause() {
    this._remotePosition.reanchor(this.isPlaying);
    this.audioElement?.pause();
    this.trigger('audio-paused', { sound: this });
  }

  stop() {
    this.pause();
  }

  _onAudioPaused() {
    // Safari fires a spurious 'pause' right after a seek while AirPlaying.
    if (this._remotePosition.isSettling) {
      return;
    }
    super._onAudioPaused();
  }

  _onAudioEnded() {
    if (this._isGenuineEnd()) {
      super._onAudioEnded();
    }
  }

  _isGenuineEnd() {
    let element = this.audioElement;
    if (!element || !Number.isFinite(element.duration)) {
      return false;
    }
    let durationMs = element.duration * 1000;
    let positionMs = (element.currentTime || 0) * 1000;
    return durationMs > 0 && positionMs >= durationMs - END_TOLERANCE_MS;
  }

  _setVolume(volume) {
    if (macroCondition(isTesting())) {
      this.debug(`skipping set volume in test env: ${volume}`);
      return;
    }
    super._setVolume(volume);
  }

  teardown() {
    this._mediaLength.watchTask.cancelAll();
    this._cancelPendingSeek();
    this.trigger('_will_destroy', { sound: this });
    this._unregisterEvents(
      this.sharedAudioAccess?.audioElement ?? this.audioElement,
    );
    this.isDestroyed = true;
  }
}
