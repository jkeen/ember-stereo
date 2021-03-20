import { A as emberArray } from '@ember/array';

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
    this.sounds.without(sound).forEach(this._pauseSound);
  }

  _pauseSound(s) {
    s.pause();
  }
}
