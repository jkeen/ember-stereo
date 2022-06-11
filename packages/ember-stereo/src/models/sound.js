import { tracked } from '@glimmer/tracking';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

import { task } from 'ember-concurrency';
import { trackedFunction } from 'ember-resources/util/function';
import Evented from 'ember-stereo/-private/utils/evented';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';

/** *
 * @class Sound
 * @constructor
 *
 *
  let sound = new Sound('http://streaming.koop.org/stream.mp3')
  let sound = new Sound('http://streaming.koop.org/stream.mp3', {
    connections: ['HLS']
  })

  let sound = new Sound(['http://streaming.koop.org/stream.mp3', 'http://streaming.koop.org/stream.aac'] {
    connections: ['HLS']
  })

  sound.isLoading //=> false
  sound.load()
  sound.isLoading //=> true

*/

export default class Sound extends Evented {
  @service stereo;
  @tracked _identifier;
  @tracked _options;

  constructor(identifiers, options = {}) {
    super(...arguments);

    this._identifier = identifiers; // could be array, could be single, could be promise
    this._options = options;
  }

  get loadOptions() {
    return assign(
      {
        metadata: {},
        sharedAudioAccess: this.stereo.sharedAudioAccess.unlock(),
        useSharedAudioAccess: this.stereo.useSharedAudioAccess,
        isMobileDevice: this.stereo.isMobileDevice,
        connections: this.stereo.connectionLoader.connections,
      },
      this._options
    );
  }

  resolver = trackedFunction(this, async () => {
    return await this.stereo.resolveIdentifier.perform(this._identifier);
  });

  get identifier() {
    return this.resolver.value;
  }

  async load() {
    return this.loadTask.perform();
  }

  @task({ restartable: true, evented: true })
  *loadTask(urlsOrPromise, _options) {
    let strategizer = this.stereo.strategizerFor(this.identifier, this.loadOptions);
    let { sound, error } = yield strategizer.tryLoading();
  }

  async play() {}
}
