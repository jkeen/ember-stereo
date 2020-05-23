import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Helper.extend({
  hifi: service(),
  isPlaying: computed('url', 'hifi.{isPlaying,currentSound}', function() {
    return this.hifi.isPlaying && (this.hifi.currentSound.url == this.url);
  }),

  async compute(url) {
    this.url = url;
    return this.isPlaying;
  }
});
