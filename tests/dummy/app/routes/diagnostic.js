import Route from '@ember/routing/route';
import testSounds from '../utils/test-sounds';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default Route.extend({
  hifi: service(),

  beforeModel() {
    window.addEventListener('storage', (e) => {
      if (e.key === 'test') {
        this.hifi.play('https://fm939.wnyc.org/wnycfm.aac');
      }
    }, false);
  },

  model() {
    return {
      testSounds: testSounds,
      connections:  Object.values(this.hifi._connections)
    };
  },

  afterModel() {
    localStorage.setItem('test', 'ok');
  }
});
