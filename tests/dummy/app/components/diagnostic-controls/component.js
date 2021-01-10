import Component from '@ember/component';
import layout from './template';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import move from 'ember-animated/motions/move';
import { parallel } from 'ember-animated';
import scale from 'ember-animated/motions/scale';
import { task } from 'ember-concurrency';
export default Component.extend({
  layout,

  hifi: service(),
  hifiCache: service(),
  classNames: ['diagnostic-controls'],

  dormantItems: computed('testSounds', 'hifiCache.cachedCount', function() {
    return this.testSounds.filter(item => !this.hifiCache._cache[item.url])
  }),

  playCustomSound: task(function *() {
    yield this.hifi.play(this.url, {
      metadata: {
        title: this.title
      }
    }).catch(({failures}) => {
      console.error(failures);
    });
  }).drop(),

  loadCustomSound: task(function *() {
    try {
      yield this.hifi.load(this.url, {
        metadata: {
          title: this.title
        }
      }).catch(({failures}) => {
        console.error(failures);
      });
    }
    catch(e) {
      this.set('error', e);
    }
  }).drop(),

  //eslint-disable-next-line
  transition: function * (context) {
     let { keptSprites, sentSprites, receivedSprites } = context;

     keptSprites.forEach(sprite => {
       parallel(move(sprite), scale(sprite));
     });

     sentSprites.forEach(sprite => {
       parallel(move(sprite), scale(sprite));
     });

     receivedSprites.forEach(sprite => {
       sprite.moveToFinalPosition();
     });
   }
});
