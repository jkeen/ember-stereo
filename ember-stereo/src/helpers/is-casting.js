import { service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
 * `{{is-casting}}` is true while audio plays on a remote device (AirPlay/Cast).
 *
 * @class IsCastingHelper
 */
export default class IsCasting extends Helper {
  @service stereo;

  compute() {
    return this.stereo.isCasting;
  }
}
