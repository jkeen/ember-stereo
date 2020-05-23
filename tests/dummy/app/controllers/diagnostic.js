import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import testSounds from '../utils/test-sounds';

/* TODO: check expected values visually to make sure expected input in browser X = expected output */

export default Controller.extend({
  hifi: service(),
  init() {
    this.set('testSounds', testSounds);
    this._super(...arguments);
  },

  connections: computed("hifi._connections", function() {
    return Object.values(this.hifi._connections);
  }),
});
