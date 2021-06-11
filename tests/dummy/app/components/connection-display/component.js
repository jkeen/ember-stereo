import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import deepSet from "ember-deep-set";
import { tracked } from "@glimmer/tracking";
import StereoUrl from "ember-stereo/-private/utils/stereo-url";
export default class ConnectionDisplay extends Component {
  @service stereo;

  enabled = true;
  @tracked lastResult = null;
  idList = {}

  constructor() {
    super(...arguments);
    this.connectionName = this.args.connection.toString();

    this._setupLoadRequestMonitor();
    this._setupCanPlayMonitor();
  }

  get hasLastResult() {
    return !!this.lastResult;
  }

  get lastResultCouldHaveBeenOurs() {
    return this.lastResult?.canPlay;
  }

  get lastResultWasOurs() {
    return (
      this.lastResult &&
      this.lastResult?.connectionResult === this.lastResult?.thisConnection
    );
  }

  _setupCanPlayMonitor() {
    this.canUseConnection = this.args.connection.canUseConnection();
    let _canPlay = this.args.connection.canPlay;
    this.args.connection.canPlay = (urlOrPromise) => {
      if (!this.enabled) {
        return false; // we've disabled it in the diagnostic
      }

      return _canPlay.call(this.args.connection, urlOrPromise);
    };
  }

  decorateLoadInfo(sound, urls, strategies, options) {
    let url = urls[0];
    let mimeType = new StereoUrl(url).mimeType;

    let result = {
      url,
      title: options?.metadata?.title,
      canPlay: this.args.connection.canPlay(url),
      mimeType: mimeType,
      canPlayMimeType: this.args.connection.canPlayMimeType(mimeType),
      canUseConnection: this.args.connection.canUseConnection(url),
      connectionName: this.args.connection.toString(),
      connectionResult: sound.connectionName,
      didPlay: this.args.connection.toString() === sound.connectionName,
    };

    let results = sound?.metadata?.debug?.results || [];
    this.lastResult = result;
    results.push(result);
    let sortedResults = results.sort((result) => strategies.indexOf((s) => s.connectionName === result.connectionName)).reverse();
    let triedToPlay = true;
    let debugResults = sortedResults.map((result) => {
      result.triedToPlay = triedToPlay;

      if (result.didPlay) {
        triedToPlay = false;
      }

      return result;
    });

    deepSet(sound, "metadata.debug.results", debugResults);
    deepSet(sound, "metadata.debug.strategies", strategies);
  }

  _setupLoadRequestMonitor() {
    // Intercept load requests and push the results into the created sound. This powers the "strategy"
    // area of the debug information in the sound diagnostic

    this.stereo.on("--new-load-request-strategies", ({ urls, strategies, options }) => {
      this.stereo.on("audio-loaded", ({ sound }) => {
        if (urls.map(i => new StereoUrl(i).href).includes(new StereoUrl(sound.url).href)) {
          if (!this.idList[sound.url]) {
            this.decorateLoadInfo(sound, urls, strategies, options);
            this.idList[sound.url] = true;
          }
        }
      })
    })
  }
}
