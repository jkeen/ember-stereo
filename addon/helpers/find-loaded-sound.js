import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

export default class FindLoadedSound extends StereoBaseIsHelper {
  name = 'find-loaded-sound'

  get result() {
    return this.sound;
  }
}
