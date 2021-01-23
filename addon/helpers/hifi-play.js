import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
@classic
export default class HifiPlay extends Helper {
  @service
  hifi;

  compute([urls], metadata = {}) {
    return () => {
      return this.hifi.play(urls, { metadata }).then(result => result.sound);  
    }
  }
}

