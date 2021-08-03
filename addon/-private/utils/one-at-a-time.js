import { A as emberArray } from '@ember/array';
import debug from 'debug';
import hasEqualUrls from './has-equal-urls';

export default class OneAtATime {
  constructor() {
    this.sounds = emberArray();
  }

  register(sound) {
    let sounds = this.sounds;
    sound.on('audio-played', () => this.pauseAll(sound));
    if (!sounds.includes(sound)) {
      sounds.pushObject(sound);
    }
  }

  pauseAll(sound) {
    this.sounds.forEach(s => {
      if (!hasEqualUrls(s.url, sound.url)) {
        debug('ember-stereo:one-at-at-time')(`pausing ${s.url}`)
        s.pause();
      }
    });
    debug('ember-stereo:one-at-at-time')(`playing ${sound.url}`)
  }
}
