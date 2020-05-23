import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  hifi: service(),
  async compute(url, metadata = {}) {
    let { sound } = await this.hifi.play(url, { metadata });
    return sound;
  }
});
