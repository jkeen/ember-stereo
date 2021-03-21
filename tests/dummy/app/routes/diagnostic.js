import Route from '@ember/routing/route';
import testSounds from 'dummy/utils/test-sounds';
import { inject as service } from '@ember/service';
export default class Diagnostic extends Route {
  @service hifi;

  model() {
    return {
      testSounds: testSounds,
      connections:  Object.values(this.hifi._connections)
    };
  }
}
