import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

@classic
export default class HifiLoad extends Helper {
  @service
  hifi;

  compute([url], metadata = {}) {
    return () => {
      return this.hifi.load(url, { metadata }).then(result => result.sound);
    }
  }
}

