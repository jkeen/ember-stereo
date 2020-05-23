import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency'


export default Helper.extend({
  hifi: service(),

  load: task(function *(url, metadata = {}) {
    let { sound } = yield this.hifi.load(url, { metadata });
    return sound;
  }).drop(),

  compute(url, metadata = {}) {
    return this.load.perform(url, { metadata }).then(r => r.sound)
  }
});
