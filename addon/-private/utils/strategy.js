import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
export default class Strategy {
  sharedAudioAccess = null;
  error = null
  success = false
  tried = false

  constructor(connection, url, config = {}) {
    this.connection = connection

    this.stereoUrl = new StereoUrl(url);

    this.url = this.stereoUrl.url
    this.mimeTYpe = this.stereoUrl.mimeType;
    this.config = config
  }

  get mimeType() {
    return new StereoUrl(this.url).mimeType;
  }

  get name() {
    return this.connection.toString();
  }

  get connectionName() {
    return this.name;
  }

  get key() {
    return this.connection.key;
  }

  get connectionKey() {
    return this.key;
  }

  get options() {
    return this.config?.options;
  }

  get canUseConnection() {
    return this.connection.canUseConnection(this.url);
  }

  get canPlayMimeType() {
    return this.connection.canPlayMimeType(this.mimeType);
  }

  get canPlay() {
    return this.connection.canPlay(this.stereoUrl);
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
