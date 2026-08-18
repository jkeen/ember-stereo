import Route from '@ember/routing/route';
import testSounds from 'docs/utils/test-sounds';

export default class Index extends Route {
  model() {
    return { testSounds };
  }
}
