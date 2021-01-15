import classic from 'ember-classic-decorator';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import debug from 'debug';
import Evented from '@ember/object/evented';
import { next } from '@ember/runloop';
import { throttle } from '@ember/runloop';
@classic
export default class HifiSync extends Service.extend(Evented) {
  @service hifi;
  @service('hifi-cache') cache;

  init() {
    this.listeners = {};
    this.tabId = Math.random().toString().slice(2,7);
    super.init(...arguments);


    window.addEventListener('storage', (e) => this._notifyOfChanges());
    window.addEventListener('beforeunload', () => this.cleanupStates());
  }

  _receiveLog() {
    debug('ember-hifi:sync:receive')(...arguments);
  }

  _sendLog() {
    debug('ember-hifi:sync:send')(...arguments);
  }

  sendLog() {
    this._sendLog(...arguments);
    // throttle(this, this._sendLog, m, 1000);
  }

  receiveLog() {
    this._receiveLog(...arguments);
    // throttle(this, this._receiveLog, m, 1000);
  }

  willDestroy() {
    window.removeEventListener('storage', (e) => this._notifyOfChanges());
  }
  
  _notifyOfChanges() {
    debug('ember-hifi:sync')('notify of changes');
    next(() => this.trigger('change'));
  }
  
  isPlayingElsewhere(url) {
    let state = this.getState(url)
    return (state && state.isPlaying)
  }

  handleSoundUpdates(sound) {
    sound.on('audio-played',           (s) => s.syncState());
    sound.on('audio-paused',           (s) => s.syncState());
    sound.on('audio-position-changed', (s) => s.syncState());

    // this.subscribe(sound.url, (e) => {
    //   if (sound.isPlaying && !e.isPlaying) {
    //     sound.set('isPlaying', false);
    //   }

    //   else if (!sound.isPlaying && e.isPlaying) {
    //     sound.set('isPlaying', true);
    //     // sound.trigger('audio-played')
    //   }

    //   if (e.position && sound.position != e.position) {
    //     sound.set('position', e.position);
    //   }
    // });
  }

  register(url, callback) {
    this.subscribe(url, callback);
  }

  /* Pause other tabs */
  onPauseOtherTabs(callback) {
    this.subscribe('hifi:system', (e) => {
      if (e.action == 'pause') {
        callback();
      }
    })
  }

  pauseOtherTabs() {
    this.broadcast('hifi:system', { action: 'pause' });
  }


  cleanupStates() {
    let keys = Object.keys(localStorage).filter(s => this.getState(s)['fromTab'] == this.tabId);
    keys.forEach(key => {
      this.broadcast(key, {});
      localStorage.removeItem(key)
    })
  }

  // _merge(key, hash) {
  //   let state = this.getState(key)
  //   let data = Object.assign((state || {}), hash)
  //   this.debugLogger.log(`sync:send`, `${key}: ${JSON.stringify(data)}`)

  //   this.broadcast(key, data);
  // },

  _isSame(oldState, newState) {
    if (!oldState && newState) { return false }
    if (oldState && !newState) { return false }
    
    var aProps = Object.getOwnPropertyNames(newState);
    var bProps = Object.getOwnPropertyNames(oldState);

    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      if (newState[propName] !== oldState[propName]) {
        return false;
      }
    }

    return true;
  }

  broadcast(key, data) {
    const newState = this._serializeData(data);
    if (!this._isSame(this.getState(key), JSON.parse(newState))) {
      this.sendLog(key, JSON.parse(newState));
      localStorage.setItem(key, newState);
    }
    // // Dispatch to local event listener as well
    // var event = new Event("storage");
    // event.key = key;
    // event.newValue = jsonData;
    // window.dispatchEvent(event);
  }

  getState(key) {
    const dataJSON = localStorage.getItem(key);

    if (dataJSON) {
      return this._deserializeData(dataJSON);
    }
  }

  subscribe(key, callback) {
    if (!this.listeners[key]) {
      // Not yet any listener for this topic
      this.listeners[key] = [];

      window.addEventListener('storage', (e) => {
        if (e.key === key) {
          let data = this._deserializeData(e.newValue);
          if (data.fromTab !== this.tabId) { // ignore events from ourselves
            this.receiveLog(key, data);
            this.listeners[key].forEach((v /*, _k */) => v(data))
          }
        }
      }, false);
    }
    this.listeners[key].push(callback)
  }

  _serializeData(data) {
    data.fromTab = this.tabId;
    return JSON.stringify(data);
  }

  _deserializeData(payload) {
    var data = JSON.parse(payload);

    return data;
  }
}
