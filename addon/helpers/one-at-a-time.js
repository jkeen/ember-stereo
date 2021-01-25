import { inject as service } from '@ember/service';
import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import { A as emberArray } from '@ember/array';
import classic from 'ember-classic-decorator';


export default class OneAtATime {
  // @service('hifi-sync')
  // sync;

  constructor() {
    this.sounds = emberArray();

    // this.sync.on('system:pause', () => {
    //   this.sounds.forEach(this._pauseSound);
    // })

    // this.sync.on('system:play', (data) => {
    //   let sound = this.sounds.filter(s => s.url == data.url)[0]
    //   if (sound) {
    //     sound.play();
    //   }
    // })
  }

  register(sound) {
    let sounds = this.sounds;
    sound.on('audio-played', () => this.pauseAll(sound));
    if (!sounds.includes(sound)) {
      sounds.pushObject(sound);
    }

    // this.sync.handleSoundUpdates(sound);
  }

  pauseAll(sound) {
    this.sounds.without(sound).forEach(this._pauseSound);
    // this.sync.pause();
  }

  _pauseSound(s) { 
    s.pause(); 
  }
}
