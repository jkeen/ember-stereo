import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import { A as emberArray } from '@ember/array';
import { inject as service } from '@ember/service';

export default EmberObject.extend(Evented, {
  sync: service('hifi-sync'),

  init() {
    this.set('sounds', emberArray());

    this.sync.onPauseOtherTabs(() => {
      this.get('sounds').forEach(this._pauseSound);
    })
  },

  register(sound) {
    let sounds = this.get("sounds");
    sound.on('audio-played', () => this.pauseAll(sound));
    if (!sounds.includes(sound)) {
      sounds.pushObject(sound);
    }

    this.sync.handleSoundUpdates(sound);
  },

  pauseAll(sound) {
    this.get('sounds').without(sound).forEach(this._pauseSound);
    this.sync.pauseOtherTabs();
  },

  _pauseSound(s) { s.pause(); }

});
