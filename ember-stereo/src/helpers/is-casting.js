import { service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
 * `{{is-casting}}` — true while audio is routed to a remote device (AirPlay/Cast).
 *
 * @class IsCastingHelper
 */
export default class IsCasting extends Helper {
  @service stereo;

  compute() {
    return this.stereo.isCasting;
  }
}
