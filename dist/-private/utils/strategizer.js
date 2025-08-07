import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-fbb42d30.js';
import { tracked } from '@glimmer/tracking';
import Strategy from './strategy.js';
import StereoUrl from './stereo-url.js';
import { makeArray, A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { cached } from 'tracked-toolbox';
import { assert } from '@ember/debug';
import { setOwner, getOwner } from '@ember/application';

var _class, _descriptor, _descriptor2;
let Strategizer = (_class = class Strategizer {
  constructor(urls, options) {
    _initializerDefineProperty(this, "urls", _descriptor, this);
    _initializerDefineProperty(this, "options", _descriptor2, this);
    assert('urls must be provided to the strategizer', !isEmpty(urls));
    this.urls = urls;
    this.connections = options.connections;
    this.metadata = options.metadata;
    this.options = options;
  }
  buildStrategy(connection, url) {
    let passthroughOptions = {};
    if (this.options.xhr) {
      passthroughOptions.xhr = this.options?.xhr;
    }
    let strategyOptions = {
      metadata: this.options.metadata,
      sharedAudioAccess: this.useSharedAudioAccess ? this.sharedAudioAccess : undefined,
      options: passthroughOptions
    };
    let strategy = new Strategy(connection, new StereoUrl(url), strategyOptions);
    setOwner(strategy, getOwner(this));
    return strategy;
  }
  get sharedAudioAccess() {
    return this.options.sharedAudioAccess;
  }
  get useSharedAudioAccess() {
    return !!this.options.useSharedAudioAccess;
  }
  get useMobileStrategy() {
    return !!this.options.isMobileDevice;
  }
  get useStandardStrategy() {
    return !this.useCustomStrategy && !this.useMobileStrategy;
  }
  get useCustomStrategy() {
    return !isEmpty(this.options.useConnections);
  }
  get specifiedConnections() {
    let connections = [];
    if (this.options.useConnections) {
      makeArray(this.options.useConnections).forEach(conn => {
        let match = this.connections.find(c => c.key == conn || c.key == conn.key);
        if (match) {
          connections.push(match);
        }
      });
    } else {
      connections = this.connections;
    }
    if (isEmpty(connections)) {
      throw new Error('No connections selected');
    }
    return connections;
  }

  /* Given a list of urls, prepare the strategy that we think will succeed best
   *
   * Breadth first: we try each url on each compatible connection in order
   * [{connection: NativeAudio, url: url1},
   *  {connection: HLS, url: url1},
   *  {connection: Other, url: url1},
   *  {connection: NativeAudio, url: url2},
   *  {connection: HLS, url: url2},
   *  {connection: Other, url: url2}]
   */

  get strategies() {
    let strategies = A();
    this.urls.forEach(url => {
      this.specifiedConnections.forEach(connection => {
        strategies.push(this.buildStrategy(connection, url));
      });
    });
    if (this.useMobileStrategy) {
      /*
       * Take our standard strategy and reorder it to prioritize native audio
       * first since it's most likely to succeed and play immediately with our
       * audio unlock logic
        * we try each url on each compatible connection in order
       * [{connection: NativeAudio, url: url1},
       *  {connection: NativeAudio, url: url2},
       *  {connection: HLS, url: url1},
       *  {connection: Other, url: url1},
       *  {connection: HLS, url: url2},
       *  {connection: Other, url: url2}]
       *
       * */

      let nativeStrategies = strategies.filter(f => f.connectionKey == 'NativeAudio');
      let otherStrategies = strategies.filter(f => f.connectionKey != 'NativeAudio');
      let orderedStrategies = nativeStrategies.concat(otherStrategies);
      return orderedStrategies;
    }
    return strategies;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "urls", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "options", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "strategies", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "strategies"), _class.prototype)), _class);

export { Strategizer as default };
//# sourceMappingURL=strategizer.js.map
