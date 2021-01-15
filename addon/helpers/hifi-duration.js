import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

@classic
export default class HifiDuration extends Helper {
  @service hifi;

  compute(compare) {
    return this.hifi.isPlaying && (this.hifi.currentSound.url == compare);
  }
}
