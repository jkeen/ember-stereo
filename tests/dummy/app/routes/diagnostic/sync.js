import Route from '@ember/routing/route';
import testSounds from 'dummy/utils/test-sounds';

export default class Sync extends Route {
  model() {
    return {
      testSounds: testSounds.slice(0, 3),
    };
  }
}
