import { reads, equal } from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { action } from '@ember/object'; 

export default Component.extend({
  layout,
  hifi: service(),
  classNames: ['sound', 'sound-display', 'is-loaded'],
  classNameBindings: ['isCurrentSound', 'isPlaying', 'showDebugInfo'],
  attributeBindings:['connectionName:data-connection-name'],
  isLoaded: computed('sound', 'sound.isLoading', function() {
    return (this.sound && !this.sound.isLoading)
  }),

  isPlaying: reads('sound.isPlaying'),
  isStream: reads('sound.isStream'),
  isFastForwardable: reads('sound.isFastForwardable'),
  isRewindable: reads('sound.isRewindable'),
  title: reads('sound.metadata.title'),
  url: reads('sound.url'),
  duration: reads('sound.duration'),
  position: reads('sound.position'),
  connectionName: reads('sound.connectionName'),
  durationIsInfinity: equal('duration', Infinity),

  isCurrentSound: computed('hifi.currentSound', 'sound', function() {
    return (this.hifi.currentSound && this.sound && this.hifi.currentSound.url === this.sound.url);
  }),

  onRemoval: function() {},

  didReceiveAttrs() {
    if (!this.sound) {
      this.loadSound.perform();
    }
  },

  playSound: task(function *() {
    let { sound } = yield this.hifi.play(this.url, { metadata: {title: this.title}});
    this.set('sound', sound);
  }),

  loadSound: task(function *() {
    let { sound } = yield this.hifi.load(this.url, { metadata: {title: this.title}});
    this.set('sound', sound);
  }),

  @action
  async removeSound() {
    this.onRemoval();
    this.hifi.soundCache.remove(this.sound);
    this.sound.stop();
  },

  async fastForward() {
    this.sound.fastForward(3000);
  },

  async rewind() {
    this.sound.rewind(3000);
  },

  async play() {
    if (this.isLoaded) {
      this.sound.play();
    }
    else {
      this.playSound.perform()
    }
  },

  async stop() {
    this.sound.stop();
  },

  async pause() {
    this.sound.pause();
  },

  async togglePause() {
    if (this.sound.isPlaying) {
      await this.pause();
    }
    else if (!this.sound.isPlaying) {
      await this.play()
    }
    else {
      await this.playSound.perform();
    }

  }

});
