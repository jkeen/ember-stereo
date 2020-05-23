import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default Service.extend({
  hifi: service(),
  debugLogger: service('hifi-debug'),

  init() {
    this.listeners = {};
    this.tabId = Math.random().toString().slice(2,7);
    this._super(...arguments);
  },

  isPlayingElsewhere(sound) {
    let state = this._state(sound.url)
    if (state && state.isPlaying == true) {
      return true;
    }
  },

  _sendUpdate(sound) {
    this._publish(sound.url, {
      isPlaying: sound.isPlaying,
      position: sound.position
    });
  },

  handleSoundUpdates(sound) {
    sound.on('audio-played',           () => this._sendUpdate(sound));
    sound.on('audio-paused',           () => this._sendUpdate(sound));
    sound.on('audio-position-changed', () => this._sendUpdate(sound));

    this._subscribe(sound.url, (e) => {
      if (sound.isPlaying && !e.isPlaying) {
        sound.set('isPlaying', false);
      }

      else if (!sound.isPlaying && e.isPlaying) {
        sound.set('isPlaying', true);
        // sound.trigger('audio-played')
      }

      if (e.position && sound.position != e.position) {
        sound.set('position', e.position);
      }
    });
  },

  /* Pause other tabs */
  onPauseOtherTabs(callback) {
    this._subscribe('hifi:system', (e) => {
      if (e.action == 'pause') {
        callback();
      }
    })
  },

  pauseOtherTabs() {
    this._publish('hifi:system', { action: 'pause' });
  },

  // _merge(key, hash) {
  //   let state = this._state(key)
  //   let data = Object.assign((state || {}), hash)
  //   this.debugLogger.log(`sync:send`, `${key}: ${JSON.stringify(data)}`)

  //   this._publish(key, data);
  // },

  _isSame(oldState, newState)  {
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
  },

  _publish(key, data) {
    const newState = this._serializeData(data);
    if (!this._isSame(this._state(key), JSON.parse(newState))) {

      this.debugLogger.log(`sync:send`, `${key}: ${JSON.stringify(newState)}`)
      localStorage.setItem(key, newState);
    }

    // // Dispatch to local event listener as well
    // var event = new Event("storage");
    // event.key = key;
    // event.newValue = jsonData;
    // window.dispatchEvent(event);
  },

  _state(key){
    const dataJSON = localStorage.getItem(key);

    if (dataJSON) {
      return this._deserializeData(dataJSON);
    }
  },

  _subscribe(key, callback) {
    if (!this.listeners[key]) {
      // Not yet any listener for this topic
      this.listeners[key] = [];

      window.addEventListener('storage', (e) => {
        if (e.key === key) {
          let data = this._deserializeData(e.newValue);
          if (data.fromTab !== this.tabId) { // ignore events from ourselves
            this.debugLogger.log(`sync:receive`, `${key}: ${JSON.stringify(data)}`)
            this.listeners[key].forEach((v /*, _k */) => v(data))
          }
        }
      }, false);
    }
    this.listeners[key].push(callback)
  },

  _serializeData(data) {
    data.fromTab = this.tabId;
    return JSON.stringify(data);
  },

  _deserializeData(payload) {
    var data = JSON.parse(payload);

    return data;
  }
});
