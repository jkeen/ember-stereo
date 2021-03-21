import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { getMimeType } from "ember-hifi/-private/utils/mime-types";
import { get, set } from "@ember/object";
import resolveUrls from "ember-hifi/-private/utils/resolve-urls";
import deepSet from "ember-deep-set";
import { tracked } from "@glimmer/tracking";
export default class ConnectionDisplay extends Component {
  @service hifi;

  enabled = true;
  @tracked lastResult = null;

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

  _setupLoadRequestMonitor() {
    // Intercept load requests and push the results into the created sound. This powers the "strategy"
    // area of the debug information in the sound diagnostic

    this.hifi.on(
      "new-load-request",
      async ({ loadPromise, urlsOrPromise, options }) => {
        // TODO: change this event to provide the urls
        let urlsToTry = await resolveUrls(urlsOrPromise);

        let strategies = [];

        if (options.useConnections) {
          // If the consumer has specified a connection to prefer, use it
          let connectionNames = options.useConnections;
          strategies = this.hifi._prepareStrategies(urlsToTry, connectionNames);
        } else if (this.hifi.get("isMobileDevice")) {
          // If we're on a mobile device, we want to try NativeAudio first
          strategies = this.hifi._prepareMobileStrategies(urlsToTry);
        } else {
          strategies = this.hifi._prepareStandardStrategies(urlsToTry);
        }

        let url = urlsToTry[0];

        let mimeType =
          typeof url === "string" ? getMimeType(url) : url.mimeType;

        let result = {
          url,
          title: options?.metadata?.title,
          canPlay: this.args.connection.canPlay(url),
          mimeType: mimeType,
          canPlayMimeType: this.args.connection.canPlayMimeType(mimeType),
          canUseConnection: this.args.connection.canUseConnection(url),
          connectionName: this.args.connection.toString(),
        };

        loadPromise.then(({ sound }) => {
          if (!sound) return;

          let results = sound?.metadata?.debug?.results || [];

          set(result, "thisConnection", this.args.connection.toString());
          set(result, "connectionResult", sound.connectionName);
          set(this, "lastResult", result);
          set(
            result,
            "didPlay",
            this.args.connection.toString() === sound.connectionName
          );
          results.push(result);

          let sortedResults = results
            .sort((result) => {
              return strategies.indexOf(
                (s) => s.connectionName === result.connectionName
              );
            })
            .reverse();

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
        });
      }
    );
  }
}
