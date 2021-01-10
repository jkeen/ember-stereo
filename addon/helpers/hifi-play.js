import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  hifi: service(),
  compute([url], metadata = {}) {
    return this.hifi.play(url, { metadata });
  }
});
