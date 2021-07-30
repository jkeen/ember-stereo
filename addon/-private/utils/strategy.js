import { tracked } from '@glimmer/tracking';
export default class Strategy {
  @tracked stereoUrl;
  @tracked config

  sharedAudioAccess = null;
  error = null
  success = false
  tried = false

  constructor(connection, url, config = {}) {
    this.connection = connection
    // assert('[ember-stereo] strategy constructor requires a StereoUrl', (stereoUrl.url && stereoUrl.mimeType))

    this.stereoUrl = url
    this.config = config || {}
    this.sharedAudioAccess = config.sharedAudioAccess
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
    if (!this.url) { return false }
    return this.connection.canUseConnection(this.url);
  }

  get canPlayMimeType() {
    if (!this.url) { return false }
    return this.connection.canPlayMimeType(this.mimeType);
  }

  get canPlay() {
    if (!this.url) { return false }
    return this.connection.canPlay(this.url, this.mimeType);
  }

  createSound() {
    return new (this.connection)({
      url: this.url,
      connectionName: this.connectionName,
      connectionKey: this.connectionKey,
      sharedAudioAccess: this.sharedAudioAccess,
      options: this.options
    })
  }
}
