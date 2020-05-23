import Route from '@ember/routing/route';
import testSounds from '../utils/test-sounds';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default Route.extend({
  hifi: service(),

  model() {
    return {
      testSounds: testSounds,
      connections:  Object.values(this.hifi._connections)
    };
  }
});
