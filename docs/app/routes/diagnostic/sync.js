import Route from '@ember/routing/route';
import testSounds from 'docs/utils/test-sounds';

export default class Sync extends Route {
  model() {
    return {
      testSounds: testSounds.slice(0, 3),
    };
  }
}
