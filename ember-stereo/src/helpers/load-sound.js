import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import prepareOptions from '../-private/utils/prepare-options';
import { didCancel } from 'ember-concurrency';
/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (load-sound @identifier}}>
      Load
    </button>
  ```
  @class {{load-sound}}
  @type {Helper}
  */
export default class LoadSound extends Helper {
  @service stereo;

  /**
    @method compute
    @param {Any} identifier url, urls, url objects, promise that resolves to a url
    @param {Hash} metadata? metadata that should be included with the sound
    @param {[String]} useConnections? array of connection names in preference order
    @return {Function}
  */

  compute([urls], options = {}) {
    options = prepareOptions(options);

    return () => {
      try {
        return this.stereo.load(urls, options).then((result) => result.sound);
      } catch (e) {
        if (!didCancel(e)) {
          throw e;
        }
      }
    };
  }
}
