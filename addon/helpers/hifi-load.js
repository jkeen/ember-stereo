import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
  A helper to load a sound
  ```hbs
    <button {{on 'click' (hifi-load this.url)}}>
      Load
    </button>
  ```
  @class HifiLoad
  @type Helper
  @param {String} url
  */
@classic
export default class HifiLoad extends Helper {
  @service
  hifi;

  /**
    @method compute
    @param {String} [url]
    @return {Function}
  */
  compute([urls], metadata = {}) {
    return () => {
      return this.hifi.load(urls, { metadata }).then(result => result.sound);
    }
  }
}

