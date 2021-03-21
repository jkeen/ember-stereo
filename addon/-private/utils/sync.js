import { tracked } from '@glimmer/tracking';
import Evented from 'ember-hifi/-private/utils/evented';
import {
  BroadcastChannel,
  createLeaderElection
} from 'broadcast-channel';
import SoundCache from 'ember-hifi/-private/utils/sound-cache';
import { makeArray } from '@ember/array';
import { task } from 'ember-concurrency'
import resolveUrls from 'ember-hifi/-private/utils/resolve-urls';

export default class HifiSync extends Evented {
  prefix = 'hifi:sync:'

  @tracked status;
  @tracked syncCache

  REPORTABLE_STATES = ['audio-played', 'audio-paused', 'audio-loading', 'audio-ready', 'audio-load-error']

  constructor(hifi) {
    super();
    this.hifi = hifi;
    this.syncCache = new SoundCache('hifi-sync');
    this.channel = new BroadcastChannel(this.prefix, {
        type: 'localstorage',
        webWorkerSupport: false
    });
    this.channel.addEventListener('message', this.handleMessage.bind(this));
    this.elector = createLeaderElection(this.channel);

    this.elector.awaitLeadership().then(()=> {
      console.log('this tab is now leader');
    });

    this.REPORTABLE_STATES.forEach(event => {
      this.hifi.on(event, this.reportSoundState.bind(this))
    })
    this.hifi.on('audio-played', this.pauseAll.bind(this));

    this.sendRequest('status');
    window.addEventListener('beforeunload', this.willDestroy.bind(this));
  }

  @task
  *remoteLoad(urlsOrPromise, options) {
    let urls = yield resolveUrls(urlsOrPromise);
    options.remote = false
    this.channel.postMessage({
      request: {
        action: 'system:load',
        data: {
          urlsOrPromise,
          options
        }
      }
    });
    return yield { sound: {} }
  }

  @task
  *remotePlay(urlsOrPromise, options) {
    let urls = yield resolveUrls(urlsOrPromise);
    options.remote = false

    this.channel.postMessage({
      request: {
        action: 'system:play',
        data: {
          urlsOrPromise,
          options
        }
      }
    });

    return yield { sound: {} }
  }


  reportSoundState(info) {
    let { sound } = info;
    this.channel.postMessage({
      response: {
        action: 'sound:update',
        data: sound.syncState
      }
    });
  }

  pauseAll() {
    this.channel.postMessage({
      request: {
        action: 'system:pause'
      }
    })
  }

  sendRequest(action) {
    this.channel.postMessage({
      request: {
        action
      }
    })
  }

  handleMessage(payload) {
    let { request, response } = payload;

    if (response) {
      this.handleResponse(payload)
    }
    else {
      this.handleRequest(payload)
    }
  }

  async handleResponse(payload) {
    let { response } = payload;
    let { action, data } = response;

    if (action == 'status') {
      makeArray(data).forEach((sound) => {
        this.syncCache.cache(sound);
        this.hifi.trigger('resync', { sound });
      });
    }
    else if (action == 'sound:update') {
      this.syncCache.cache(data)
      this.hifi.trigger('resync', {sound: data});
    }
  }

  async handleRequest(payload) {
    let { request } = payload;
    let { action, data } = request;

    if (action === 'system:pause') {
      this.hifi.currentSound?.pause();
    }
    else if (action === 'system:play') {
      let { sound, failures } = await this.hifi.play(data.urlsOrPromise, data.options);

      payload.response = {
        action,
        data: {
          sound: sound?.syncState,
          failures: failures
        }
      }
      this.channel.postMessage(payload);

    }
    else if (action === 'system:load') {
      let { sound, failures } = await this.hifi.load(data.urlsOrPromise, data.options)
      payload.response = {
        action,
        data: {
          sound: sound?.syncState,
          failures: failures
        }
      }
      this.channel.postMessage(payload);
    }
    else if (action == 'status') {
      payload.response = {
        action,
        data: this.currentCacheStatus()
      }
      this.channel.postMessage(payload);
    }
    else if (action == 'reset') {
      this.syncCache.reset();
      this.hifi.trigger('resync');
    }
  }

  willDestroy() {
    this.channel.postMessage({request: {action: 'reset'}});
    this.channel.postMessage({request: {action: 'status'}});
    this.REPORTABLE_STATES.forEach(event => {
      this.hifi.off(event, this.reportSoundState.bind(this))
    })
    this.hifi.off('audio-played', this.pauseAll.bind(this));
    this.channel.removeEventListener('message', this.handleMessage.bind(this));
    this.channel.close();
  }

  isPlayingElsewhere(url) {
    // TODO: use same logic as findLoaded

    let state = this.getState(url)
    return (state && state.isPlaying && state.fromTab != this.tabId)
  }

  // play(url) {
  //   this.broadcast('system:play', { url: url, time: new Date() });
  // }

  currentCacheStatus() {
    let status = [];
    let urls = this.hifi.soundCache.cachedList;
    urls.forEach(url => {
      let sound = this.hifi.soundCache.find(url);

      if (sound) {
        status.push(sound.syncState);
      }
    });

    return status;
  }
}
