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

  prefix = 'hifi:sync:'

  init() {
    this.listeners = {};
    this.tabId = Math.random().toString().slice(2,7);
    super.init(...arguments);

    window.addEventListener('storage', (e) => this._notifyOfChanges(e));
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
    window.removeEventListener('storage', (e) => this._notifyOfChanges(e));
  }
  
  _notifyOfChanges(e) {
    if (!e.key && e.storageArea) { // a key was deleted
      Object.keys(e.storageArea).forEach(key => {
        let listenerKey = key.replace(this.prefix, '');
        next(() => {
          this.trigger(listenerKey, {});
        });
      })
    }
    else if (e.key.startsWith(this.prefix)) {
      let listenerKey = e.key.replace(this.prefix, '');
      let data = this._deserializeData(e.newValue);
      
      next(() => {
        this.trigger(listenerKey, data);
      });
    }
    debug('ember-hifi:sync')('notify of changes');
  }
  
  isPlayingElsewhere(url) {
    // TODO: use same logic as findLoaded

    let state = this.getState(url)
    return (state && state.isPlaying && state.fromTab != this.tabId)
  }

  handleSoundUpdates(sound) {
    sound.on('audio-played',           (s) => s.syncState());
    sound.on('audio-paused',           (s) => s.syncState());
    sound.on('audio-position-changed', (s) => s.syncState());
  }

  play(url) {
    this.broadcast('system:play', { url: url, time: new Date() });
  }

  pause() {
    this.broadcast('system:pause', { time: new Date() });
  }

  cleanupStates() {
    try {
      let keys = Object.keys(localStorage)
      keys.forEach(key => {
        let state = this.getState(key.replace(this.prefix, ''));
        if (state && state.fromTab == this.tabId) {
          localStorage.setItem(key, JSON.stringify({}));
          localStorage.removeItem(key)
        }
      })  
    }
    catch(e) {}
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
      this._writeKey(key, newState);
    }
    // // Dispatch to local event listener as well
    // var event = new Event("storage");
    // event.key = key;
    // event.newValue = jsonData;
    // window.dispatchEvent(event);
  }

  getState(key) {
    const dataJSON = this._readKey(key);

    if (dataJSON) {
      return this._deserializeData(dataJSON);
    }
  }

  _readKey(key) {
    return localStorage.getItem(`${this.prefix}${key}`);
  }

  _writeKey(key, data) {
    localStorage.setItem(`${this.prefix}${key}`, data);
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
