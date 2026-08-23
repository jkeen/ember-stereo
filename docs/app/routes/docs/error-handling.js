import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DocsErrorHandlingRoute extends Route {
  @service router;

  redirect() {
    this.router.replaceWith('docs.browser-audio');
  }
}
