import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import Strategy from 'ember-stereo/-private/utils/strategy';
export default class StrategyBreakdown extends Component {
  @service stereo;
  @tracked soundProxy;

  constructor() {
    super(...arguments);
    this.soundProxy = this.stereo.soundProxy(this.args.url);
  }

  get loadWasAttempted() {
    return (
      this.soundProxy &&
      (this.soundProxy.isResolved || this.soundProxy.isErrored)
    );
  }

  get strategyResults() {
    if (this.soundProxy && this.soundProxy.isResolved) {
      return this.filledOutResults(this.soundProxy.value._debug);
    } else if (this.soundProxy && this.soundProxy.isErrored) {
      return this.filledOutResults(this.soundProxy.errors._debug);
    }

    return this.stereo.connectionLoader.connections.map((connection) => {
      return new Strategy(
        connection,
        this.args.url ? new StereoUrl(this.args.url) : new StereoUrl('./')
      );
    });
  }

  filledOutResults(results) {
    return this.stereo.connectionLoader.connections.map((connection) => {
      let found = (results ?? []).find(
        (r) => r.connection.name === connection.name
      );
      if (found) {
        return found;
      } else {
        return new Strategy(
          connection,
          this.args.url ? new StereoUrl(this.args.url) : new StereoUrl('./')
        );
      }
    });
  }
}
