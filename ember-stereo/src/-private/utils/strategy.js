import { tracked, cached } from '@glimmer/tracking';
import { setOwner, getOwner } from '@ember/application';

export default class Strategy {
  @tracked stereoUrl;
  @tracked config;

  sharedAudioAccess = null;
  error = null;
  erroredConnection = null;
  success = false;
  tried = false;

  constructor(connectionClass, stereoUrl, config = {}) {
    this.connectionClass = connectionClass;
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
    return this.connectionClass.toString();
  }

  get key() {
    return this.connectionClass.key;
  }

  get connectionKey() {
    return this.key;
  }

  get options() {
    return this.config.options;
  }

  @cached
  get canUseConnection() {
    if (!this.url) {
      return false;
    }
    return this.connectionClass.canUseConnection(this.url);
  }

  @cached
  get canPlayMimeType() {
    if (!this.url) {
      return false;
    }
    return this.connectionClass.canPlayMimeType(this.mimeType);
  }

  @cached
  get canPlay() {
    if (!this.url) {
      return false;
    }
    return this.connectionClass.canPlay(this.url, this.mimeType);
  }

  createConnection(overrides = {}) {
    let connection = new this.connectionClass({
      url: this.url,
      connectionName: this.connectionName,
      connectionKey: this.connectionKey,
      sharedAudioAccess: this.sharedAudioAccess,
      metadata: this.config.metadata,
      options: this.options,
      ...overrides,
    });

    setOwner(connection, getOwner(this));
    return connection;
  }
}
