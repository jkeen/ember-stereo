import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import debug from 'debug';
import { loadCastSdk } from './google-cast-sdk-loader.js';

const log = debug('ember-stereo:google-cast-sdk');
const SAVED_SESSION_KEY = 'ember-stereo:cast:session-id';

/**
 * Owns the Cast SDK lifecycle and the session's single `RemotePlayer`/
 * `RemotePlayerController` pair, which `Chromecast` sounds share the way
 * {@link SharedAudioAccess} shares the `<audio>` element.
 *
 * @private
 * @hide
 * @class GoogleCastSdk
 */
class GoogleCastSdk {
  constructor() {
    _defineProperty(this, "owner", null);
    _defineProperty(this, "_player", null);
    _defineProperty(this, "_controller", null);
    _defineProperty(this, "_session", null);
    _defineProperty(this, "_handlers", null);
    _defineProperty(this, "_contextListeners", null);
    _defineProperty(this, "_context", null);
    _defineProperty(this, "_setupStarted", false);
  }
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
    let {
      CastState,
      CastContextEventType,
      SessionState
    } = framework;
    let syncAvailability = () => {
      handlers.onAvailabilityChange(context.getCastState() !== CastState.NO_DEVICES_AVAILABLE);
    };

    // Held so teardown can remove them. The SDK context outlives the service.
    this._contextListeners = {
      [CastContextEventType.CAST_STATE_CHANGED]: syncAvailability,
      [CastContextEventType.SESSION_STATE_CHANGED]: event => {
        this.debug(`chromecast session: ${event.sessionState}`);
        if (event.sessionState === SessionState.SESSION_STARTED || event.sessionState === SessionState.SESSION_RESUMED) {
          this._saveSessionId(context.getCurrentSession());
          this.attach(context.getCurrentSession(), framework);
          handlers.onSessionStarted();
        } else if (event.sessionState === SessionState.SESSION_ENDED) {
          this._clearSavedSessionId();
          this.forgetSession();
          handlers.onSessionEnded();
        }
      }
    };
    Object.keys(this._contextListeners).forEach(event => context.addEventListener(event, this._contextListeners[event]));
    syncAvailability();
    this._rejoinSavedSession(context);
  }

  // A fresh browser has no auto-join memory, but a receiver session survives it and can be rejoined by id.
  _rejoinSavedSession(context) {
    let savedId = this._savedSessionId();
    if (!savedId || context.getCurrentSession()) {
      return;
    }
    this.debug(`asking to rejoin saved cast session ${savedId}`);
    try {
      window.chrome.cast.requestSessionById(savedId);
    } catch (e) {
      this.debug(`could not request saved session: ${e}`);
    }
  }
  _saveSessionId(session) {
    let sessionId = session?.getSessionId?.();
    if (!sessionId) {
      return;
    }
    try {
      window.localStorage.setItem(SAVED_SESSION_KEY, sessionId);
    } catch (e) {
      this.debug(`could not save session id: ${e}`);
    }
  }
  _clearSavedSessionId() {
    try {
      window.localStorage.removeItem(SAVED_SESSION_KEY);
    } catch (e) {
      this.debug(`could not clear session id: ${e}`);
    }
  }
  _savedSessionId() {
    try {
      return window.localStorage.getItem(SAVED_SESSION_KEY);
    } catch (e) {
      return null;
    }
  }
  teardown() {
    if (this._context && this._contextListeners) {
      Object.keys(this._contextListeners).forEach(event => this._context.removeEventListener(event, this._contextListeners[event]));
    }
    this._contextListeners = null;
    this._context = null;
    this._setupStarted = false;
    this.forgetSession();
  }
  requestSession() {
    this._context?.requestSession().catch(error => {
      this.debug(`cast requestSession error: ${error}`);
    });
  }
  endSession() {
    let stopCastingOnTheDevice = true;
    this._context?.endCurrentSession(stopCastingOnTheDevice);
  }
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
      [EVENT.DURATION_CHANGED]: () => this.owner?._onDurationChanged?.()
    };
    Object.keys(this._handlers).forEach(event => this._controller.addEventListener(event, this._handlers[event]));
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
  forgetSession() {
    if (this._controller && this._handlers) {
      Object.keys(this._handlers).forEach(event => this._controller.removeEventListener(event, this._handlers[event]));
    }
    this.owner = null;
    this._handlers = null;
    this._player = null;
    this._controller = null;
    this._session = null;
  }
}

export { GoogleCastSdk as default };
//# sourceMappingURL=google-cast-sdk.js.map
