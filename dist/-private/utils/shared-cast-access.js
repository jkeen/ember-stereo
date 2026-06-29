import { b as _defineProperty } from '../../_rollupPluginBabelHelpers-hULyhLkN.js';
import debug from 'debug';

const log = debug('ember-stereo:shared-cast-access');

/**
 * Shares a single Google Cast session between multiple `Chromecast` sounds, the
 * same way {@link SharedAudioAccess} shares one `<audio>` element between
 * `NativeAudio` sounds.
 *
 * A Cast session has exactly ONE media pipeline: one `RemotePlayer` +
 * `RemotePlayerController` reflect the session's single current media globally.
 * If every `Chromecast` connection made its own `RemotePlayer`, they would all
 * see every state change and fight over the session. Instead, one
 * `SharedCastAccess` owns the single player/controller (the analogue of the one
 * route-holding outlet element) and hands out control via the same
 * `requestControl`/`releaseControl`/`hasControl` handshake: when a new sound
 * takes control the previous owner is released (and pauses itself), so only the
 * owner ever drives the session or relays its events.
 *
 * @private
 * @class SharedCastAccess
 */
class SharedCastAccess {
  constructor() {
    _defineProperty(this, "owner", null);
    _defineProperty(this, "_player", null);
    _defineProperty(this, "_controller", null);
    _defineProperty(this, "_session", null);
    _defineProperty(this, "_handlers", null);
  }
  debug(message) {
    log(message);
  }

  // Bind to the live session once it starts. Idempotent across SESSION_RESUMED:
  // keep the existing player/controller, just refresh the session reference.
  attach(session, framework) {
    this._session = session;
    if (this._player) {
      return this;
    }
    this._player = new framework.RemotePlayer();
    this._controller = new framework.RemotePlayerController(this._player);
    let E = framework.RemotePlayerEventType;
    // Registered ONCE on the single controller and dispatched to the current
    // owner only — so superseded sounds can't relay the session's state.
    this._handlers = {
      [E.PLAYER_STATE_CHANGED]: () => this.owner?._onPlayerStateChanged?.(),
      [E.DURATION_CHANGED]: () => this.owner?._onDurationChanged?.()
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

  // Hand control to `who`, releasing the prior owner first (its releaseControl
  // pauses it locally so its position loop exits). Mirrors SharedAudioAccess.
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

  // The session ended: tear down the shared player/controller so the next
  // session starts clean. Never called per-sound (sounds only releaseControl).
  detach() {
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

export { SharedCastAccess as default };
//# sourceMappingURL=shared-cast-access.js.map
