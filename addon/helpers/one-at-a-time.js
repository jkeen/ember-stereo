import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import { A as emberArray } from '@ember/array';

@classic
export default class OneAtATime extends EmberObject.extend(Evented) {
  @service('hifi-sync')
  sync;

  init() {
    this.set('sounds', emberArray());

    this.sync.onPauseOtherTabs(() => {
      this.get('sounds').forEach(this._pauseSound);
    })
  }

  register(sound) {
    let sounds = this.get("sounds");
    sound.on('audio-played', () => this.pauseAll(sound));
    if (!sounds.includes(sound)) {
      sounds.pushObject(sound);
    }

    this.sync.handleSoundUpdates(sound);
  }

  pauseAll(sound) {
    this.get('sounds').without(sound).forEach(this._pauseSound);
    this.sync.pauseOtherTabs();
  }

  _pauseSound(s) { 
    s.pause(); 
  }
}
