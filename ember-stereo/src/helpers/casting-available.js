import { service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
 * `{{casting-available}}` — true when a cast target (AirPlay/Cast) is reachable.
 *
 * @class CastingAvailableHelper
 */
export default class CastingAvailable extends Helper {
  @service stereo;

  compute() {
    // Asking whether casting is available means the app uses casting — kick off
    // the lazy Chromecast SDK load (idempotent) so Cast targets get detected.
    this.stereo.ensureChromecastSetup();
    return this.stereo.isCastingAvailable;
  }
}
