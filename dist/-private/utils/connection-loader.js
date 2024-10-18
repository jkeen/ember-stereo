import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';

var _class, _descriptor, _descriptor2;
/* This class loads system/user connections */
let ConnectionLoader = (_class = class ConnectionLoader {
  constructor(service, connectionsToLoad) {
    _initializerDefineProperty(this, "loaded", _descriptor, this);
    _initializerDefineProperty(this, "connectionOrder", _descriptor2, this);
    this.service = service;
    this.load(connectionsToLoad);
    this.connectionOrder = connectionsToLoad.map(info => {
      return typeof info === 'string' ? info : info.name;
    });
  }

  // get loaded connection objects in order specified by system options
  get connections() {
    return this.names.map(name => this.loaded[name]);
  }
  get names() {
    return this.connectionOrder.filter(name => !!this.loaded[name]);
  }
  get(name) {
    return this.loaded[name];
  }

  /**
   * Loads the connections as specified in the config options
   *
   * @method load
   * @private
   * @param {Array} connectionOptions
   * @return {Object} instantiated connections
   */

  load(connectionsToLoad) {
    assert(`[ember-stereo] ConnectionLoader needs an array of connection, you provided ${connectionsToLoad}`, !isEmpty(connectionsToLoad));
    connectionsToLoad.forEach(connectionOption => {
      let name, connection;
      if (typeof connectionOption === 'string') {
        name = connectionOption;
        connection = this.activate({
          name,
          config: {}
        });
      } else {
        name = connectionOption.name;
        connection = this.activate(connectionOption);
      }
      this.loaded[name] = connection;
    });
  }

  /**
   * Activates the a single connection
   *
   * @method activate
   * @private
   * @param {Object} {name, config}
   * @return {Connection} instantiated Connection
   */

  activate({
    name,
    config
  } = {}) {
    const Connection = this.lookup(name);
    assert('[ember-stereo] Could not find stereo connection ${name}.', name);
    Connection.setup(config);
    return Connection;
  }

  /**
   * Looks up the connection from the container. Prioritizes the consuming app's
   * connections over the addon's connections.
   *
   * @method lookup
   * @param {String} connectionName
   * @private
   * @return {Connection} a local connection or a connection from the addon
   */

  lookup(connectionName) {
    assert('[ember-stereo] Could not find a stereo connection without a name.', connectionName);
    const dasherizedConnectionName = dasherize(connectionName);
    const availableConnection = getOwner(this.service).lookup(`ember-stereo@stereo-connection:${dasherizedConnectionName}`);
    const localConnection = getOwner(this.service).lookup(`stereo-connection:${dasherizedConnectionName}`);
    assert(`[ember-stereo] Could not load stereo connection ${dasherizedConnectionName}`, localConnection || availableConnection);
    return localConnection ? localConnection : availableConnection;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "loaded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "connectionOrder", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class);

export { ConnectionLoader as default };
//# sourceMappingURL=connection-loader.js.map
