import Route from '@ember/routing/route';
import testSounds from 'docs/utils/test-sounds';
import { inject as service } from '@ember/service';
export default class Diagnostic extends Route {
  @service stereo;

  model() {
    return {
      testSounds: testSounds,
      connections: this.stereo.connectionLoader.connections,
    };
  }
}
