import { inject as service } from '@ember/service';
import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import { A as emberArray } from '@ember/array';
import classic from 'ember-classic-decorator';

@classic
export default class OneAtATime extends EmberObject.extend(Evented) {
  @service('hifi-sync')
  sync;

  init() {
    this.set('sounds', emberArray());

    this.sync.on('system:pause', () => {
      this.get('sounds').forEach(this._pauseSound);
    })

    this.sync.on('system:play', (data) => {
      let sound = this.get('sounds').filter(s => s.url == data.url)[0]
      if (sound) {
        sound.play();
      }
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
    this.sync.pause();
  }

  _pauseSound(s) { 
    s.pause(); 
  }
}
