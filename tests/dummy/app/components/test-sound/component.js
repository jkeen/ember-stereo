import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import debug from 'debug';
import { get } from '@ember/object';

export default class TestSound extends Component {
  @service stereo;

  get isLoaded() {
    return (this.sound && !this.sound.isLoading)
  }

  get isPlaying() {
    return this.args.sound.isPlaying
  }

  get isStream() {
    get(this.args, 'debug.expectedValues.isStream')
  }

  get duration() {
    get(this.args, 'debug.expectedValues.duration')
  }

  @action
  async loadUrl() {
    debug('ember-stereo:test-sound')('loading url');
    return this.args.url
  }

  @task({restartable: true, maxConcurrency: 1})
  * playSound() {
    let { sound } = yield this.stereo.play(this.args.url, {
      metadata: {
        title: this.args.title,
        debug: this.args.debug
      }
    })
    this.sound = sound;
  }

  @task({restartable: true, maxConcurrency: 1})
  * loadSound() {
    let { sound } = yield this.stereo.load(this.args.url, {
      metadata: {
        title: this.args.title,
        debug: this.args.debug
      }
    })
    this.sound = sound;
  }

}

