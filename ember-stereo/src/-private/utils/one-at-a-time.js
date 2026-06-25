import { A as emberArray } from '@ember/array';
import debug from 'debug';
import hasEqualUrls from './has-equal-urls';
import { service } from '@ember/service';
export default class OneAtATime {
  @service stereo;

  constructor() {
    this.sounds = emberArray();
    // The exact 'audio-played' handler bound for each registered sound, so
    // unregister can remove the same reference it added.
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

  // Drop a torn-down connection so the list doesn't grow unbounded across
  // swaps and pauseAll stops calling pause() on dead backends.
  unregister(sound) {
    let handler = this._playedHandlers.get(sound);
    if (handler) {
      sound.off('audio-played', handler);
      this._playedHandlers.delete(sound);
    }
    this.sounds.removeObject(sound);
  }

  pauseAll(sound) {
    this.sounds.forEach((s) => {
      if (!hasEqualUrls(s.url, sound.url)) {
        debug('ember-stereo:one-at-at-time')(`pausing ${s.url}`);
        s.pause();
      }
    });
    debug('ember-stereo:one-at-at-time')(`playing ${sound.url}`);
  }
}
