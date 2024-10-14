import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { tracked } from '@glimmer/tracking';
import { cached } from 'tracked-toolbox';
import { setOwner, getOwner } from '@ember/application';

var _class, _descriptor, _descriptor2;
let Strategy = (_class = class Strategy {
  constructor(connection, stereoUrl, config = {}) {
    _initializerDefineProperty(this, "stereoUrl", _descriptor, this);
    _initializerDefineProperty(this, "config", _descriptor2, this);
    _defineProperty(this, "sharedAudioAccess", null);
    _defineProperty(this, "error", null);
    _defineProperty(this, "erroredSound", null);
    _defineProperty(this, "success", false);
    _defineProperty(this, "tried", false);
    this.connection = connection;
    // assert('[ember-stereo] strategy constructor requires a StereoUrl', (stereoUrl.url && stereoUrl.mimeType))

    this.stereoUrl = stereoUrl;
    this.config = config || {};
    this.sharedAudioAccess = config.sharedAudioAccess;
  }
  get url() {
    if (this.stereoUrl) {
      return this.stereoUrl.url;
    }
    return null;
  }
  get mimeType() {
    if (this.stereoUrl) {
      return this.stereoUrl.mimeType;
    }
    return null;
  }
  get name() {
    return this.connectionName;
  }
  get connectionName() {
    return this.connection.toString();
  }
  get key() {
    return this.connection.key;
  }
  get connectionKey() {
    return this.key;
  }
  get options() {
    return this.config.options;
  }
  get canUseConnection() {
    if (!this.url) {
      return false;
    }
    return this.connection.canUseConnection(this.url);
  }
  get canPlayMimeType() {
    if (!this.url) {
      return false;
    }
    return this.connection.canPlayMimeType(this.mimeType);
  }
  get canPlay() {
    if (!this.url) {
      return false;
    }
    return this.connection.canPlay(this.url, this.mimeType);
  }
  createSound() {
    let sound = new this.connection({
      url: this.url,
      connectionName: this.connectionName,
      connectionKey: this.connectionKey,
      sharedAudioAccess: this.sharedAudioAccess,
      options: this.options
    });
    setOwner(sound, getOwner(this));
    return sound;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "stereoUrl", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "config", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "canUseConnection", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "canUseConnection"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "canPlayMimeType", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "canPlayMimeType"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "canPlay", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "canPlay"), _class.prototype)), _class);

export { Strategy as default };
//# sourceMappingURL=strategy.js.map
