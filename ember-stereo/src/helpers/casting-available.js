import { service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
 * `{{casting-available}}` is true when a cast target (AirPlay/Cast) is reachable.
 *
 * @class CastingAvailableHelper
 */
export default class CastingAvailable extends Helper {
  @service stereo;

  compute() {
    this.stereo.ensureCastSdkSetup();
    return this.stereo.isCastingAvailable;
  }
}
