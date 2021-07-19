import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import move from 'ember-animated/motions/move';
import { parallel } from 'ember-animated';
import scale from 'ember-animated/motions/scale';
import { task } from 'ember-concurrency';

export default class DiagnosticControls extends Component {
  @service stereo

  get dormantItems() {
    return this.args.testSounds.filter(item => !this.stereo.soundCache._cache[item.url]);
  }

  @task({drop: true})
  * playCustomSound() {
    yield this.stereo.play(this.url, {
      metadata: {
        title: this.title
      }
    }).catch(({failures}) => {
      console.error(failures);
    });
  }

  @task({drop: true})
  * loadCustomSound() {
    try {
      yield this.stereo.load(this.url, {
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
  }

  //eslint-disable-next-line
  *transition(context) {
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
}
