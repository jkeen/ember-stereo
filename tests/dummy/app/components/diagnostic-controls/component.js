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
  classNames: ['diagnostic-controls'],

  dormantItems: computed('hifi.soundCache.{_cache,cachedCount}', 'testSounds', function() {
    return this.testSounds.filter(item => !this.hifi.soundCache._cache[item.url])
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
