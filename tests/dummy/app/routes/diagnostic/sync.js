import Route from '@ember/routing/route';

export default class Sync extends Route {
  model() {
    return this.modelFor('diagnostic')
  }
}
