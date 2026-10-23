import { A } from '@ember/array';
import debug from 'debug';

class OneAtATime {
  constructor() {
    this.sounds = A();
    this._playedHandlers = new WeakMap();
  }
  register(sound) {
    let sounds = this.sounds;
    if (sounds.includes(sound)) {
      return;
    }
    let handler = () => this.pauseAll(sound);
    this._playedHandlers.set(sound, handler);
    sound.on('audio-played', handler);
    sounds.pushObject(sound);
  }
  unregister(sound) {
    let handler = this._playedHandlers.get(sound);
    if (handler) {
      sound.off('audio-played', handler);
      this._playedHandlers.delete(sound);
    }
    this.sounds.removeObject(sound);
  }
  pauseAll(sound) {
    this.sounds.forEach(s => {
      if (s !== sound) {
        debug('ember-stereo:one-at-at-time')(`pausing ${s.url}`);
        s.pause();
      }
    });
    debug('ember-stereo:one-at-at-time')(`playing ${sound.url}`);
  }
}

export { OneAtATime as default };
//# sourceMappingURL=one-at-a-time.js.map
