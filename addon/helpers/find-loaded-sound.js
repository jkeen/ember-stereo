import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';

export default class FindLoadedSound extends StereoBaseIsHelper {
  name = 'find-loaded-sound'

  get result() {
    if (this.identifier === 'system') {
      return this.stereo.currentSound;
    }
    else {
      return this.sound;
    }
  }
}
