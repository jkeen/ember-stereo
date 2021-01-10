import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';

export default Helper.extend({
  hifi: service(),

  compute(url) {
    return this.hifi.isPlaying && (this.hifi.currentSound.url == url);
  }
});
