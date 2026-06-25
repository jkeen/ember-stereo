import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import Strategy from 'ember-stereo/-private/utils/strategy';
export default class StrategyBreakdown extends Component {
  @service stereo;
  @tracked sound;

  constructor() {
    super(...arguments);
    this.sound = this.stereo.findSound(this.args.url);
  }

  get loadWasAttempted() {
    return this.sound && (this.sound.isResolved || this.sound.isErrored);
  }

  get strategyResults() {
    // The Sound records the strategies it tried (in order) on `_debug`.
    if (this.sound && (this.sound.isResolved || this.sound.isErrored)) {
      return this.filledOutResults(this.sound._debug);
    }

    return this.stereo.connectionLoader.connections.map((connection) => {
      return new Strategy(
        connection,
        this.args.url ? new StereoUrl(this.args.url) : new StereoUrl('./')
      );
    });
  }

  filledOutResults(results) {
    // `_debug` holds the tried strategies, but is only an array once the Sound
    // actually ran its waterfall — a Sound that resolved by adopting an
    // already-cached connection never built strategies.
    let tried = Array.isArray(results) ? results : [];
    return this.stereo.connectionLoader.connections.map((connection) => {
      let found = tried.find((r) => r.connection.name === connection.name);
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
