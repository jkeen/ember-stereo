export default class Strategy {

  sharedAudioAccess = null;
  error = null

  constructor(connection, url, config = {}) {
    this.connection = connection
    this.url = url
    this.config = config
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

  create() {
    return (new this.connection);
  }
}
