import debug from 'debug';
import { loadCastSdk } from './cast-sdk-loader';
const log = debug('ember-stereo:shared-cast-access');

/**
 * Owns the Cast SDK lifecycle and the session's single `RemotePlayer`/
 * `RemotePlayerController` pair, which `Chromecast` sounds share the way
 * {@link SharedAudioAccess} shares the `<audio>` element.
 *
 * @private
 * @hide
 * @class SharedCastAccess
 */
export default class SharedCastAccess {
  owner = null;
  _player = null;
  _controller = null;
  _session = null;
  _handlers = null;
  _context = null;
  _setupStarted = false;

  debug(message) {
    log(message);
  }

  get context() {
    return this._context;
  }

  ensureSetup(handlers) {
    if (this._setupStarted) {
      return;
    }
    this._setupStarted = true;
    this._setup(handlers);
  }

  async _setup(handlers) {
    let context = await loadCastSdk();
    if (!context || handlers.isAbandoned?.()) {
      return;
    }
    this._context = context;
    let framework = window.cast.framework;
    let { CastState, CastContextEventType, SessionState } = framework;

    let syncAvailability = () => {
      handlers.onAvailabilityChange(
        context.getCastState() !== CastState.NO_DEVICES_AVAILABLE,
      );
    };

    context.addEventListener(
      CastContextEventType.CAST_STATE_CHANGED,
      syncAvailability,
    );
    context.addEventListener(
      CastContextEventType.SESSION_STATE_CHANGED,
      (event) => {
        this.debug(`chromecast session: ${event.sessionState}`);
        if (
          event.sessionState === SessionState.SESSION_STARTED ||
          event.sessionState === SessionState.SESSION_RESUMED
        ) {
          this.attach(context.getCurrentSession(), framework);
          handlers.onSessionStarted();
        } else if (event.sessionState === SessionState.SESSION_ENDED) {
          this.detach();
          handlers.onSessionEnded();
        }
      },
    );
    syncAvailability();
  }

  requestSession() {
    this._context?.requestSession().catch((error) => {
      this.debug(`cast requestSession error: ${error}`);
    });
  }

  endSession() {
    this._context?.endCurrentSession(true);
  }

  // AirPlay/WebKit withholds the device name, so only the Chromecast half lives here.
  get deviceName() {
    let device = this._session?.getCastDevice?.();
    return device?.friendlyName || 'Chromecast';
  }

  attach(session, framework) {
    this._session = session;
    if (this._player) {
      return this;
    }
    this._player = new framework.RemotePlayer();
    this._controller = new framework.RemotePlayerController(this._player);

    let EVENT = framework.RemotePlayerEventType;
    this._handlers = {
      [EVENT.PLAYER_STATE_CHANGED]: () => this.owner?._onPlayerStateChanged?.(),
      [EVENT.DURATION_CHANGED]: () => this.owner?._onDurationChanged?.(),
    };
    Object.keys(this._handlers).forEach((event) =>
      this._controller.addEventListener(event, this._handlers[event]),
    );
    return this;
  }

  get player() {
    return this._player;
  }

  get controller() {
    return this._controller;
  }

  get session() {
    return this._session;
  }

  requestControl(who) {
    let owner = this.owner;
    if (owner && owner !== who) {
      this.debug('coordinating peaceful transfer of power');
      owner.releaseControl();
    }
    this.owner = who;
    return this._player;
  }

  hasControl(who) {
    return this.owner === who;
  }

  releaseControl(who) {
    if (this.hasControl(who)) {
      this.owner = null;
    }
  }

  detach() {
    if (this._controller && this._handlers) {
      Object.keys(this._handlers).forEach((event) =>
        this._controller.removeEventListener(event, this._handlers[event]),
      );
    }
    this.owner = null;
    this._handlers = null;
    this._player = null;
    this._controller = null;
    this._session = null;
  }
}
