import { tracked } from '@glimmer/tracking';
import Strategy from './strategy';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import { makeArray, A as emberArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { cached } from 'tracked-toolbox';
import { assert } from '@ember/debug';
import { getOwner, setOwner } from '@ember/application';
export default class Strategizer {
  @tracked urls;
  @tracked options;

  constructor(urls, options) {
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
      sharedAudioAccess: this.useSharedAudioAccess
        ? this.sharedAudioAccess
        : undefined,
      options: passthroughOptions,
    };

    let strategy = new Strategy(
      connection,
      new StereoUrl(url),
      strategyOptions
    );
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
      makeArray(this.options.useConnections).forEach((conn) => {
        let match = this.connections.find(
          (c) => c.key == conn || c.key == conn.key
        );
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

  @cached
  get strategies() {
    let strategies = emberArray();
    this.urls.forEach((url) => {
      this.specifiedConnections.forEach((connection) => {
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

      let nativeStrategies = strategies.filter(
        (f) => f.connectionKey == 'NativeAudio'
      );
      let otherStrategies = strategies.filter(
        (f) => f.connectionKey != 'NativeAudio'
      );
      let orderedStrategies = nativeStrategies.concat(otherStrategies);

      return orderedStrategies;
    }

    return strategies;
  }
}
