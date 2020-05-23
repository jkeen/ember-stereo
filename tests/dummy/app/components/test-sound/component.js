import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,
  tagName: '',
  hifi: service(),
  isLoaded: computed('sound', 'sound.isLoading', function() {
    return (this.sound && !this.sound.isLoading)
  }),

  title: reads('item.title'),
  url: reads('item.url'),

  isPlaying: reads('sound.isPlaying'),

  isStream: reads('item.debug.expectedValues.isStream'),
  duration: reads('item.debug.expectedValues.duration'),

  playSound: task(function *() {
    let { sound } = yield this.hifi.play(this.url, {
      metadata: {
        title: this.title,
        debug: {
          expectedValues: this.item.expectedValues
        }
      }
    });
    this.set('sound', sound);
  }),

  loadSound: task(function *() {
    let { sound } = yield this.hifi.load(this.url, {
      metadata: {
        title: this.title,
        debug: {
          expectedValues: this.item.expectedValues
        }
      }
    });
    this.set('sound', sound);
  }),

});
