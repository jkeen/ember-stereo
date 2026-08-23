import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DocsAudioFormatRoute extends Route {
  @service router;

  redirect() {
    this.router.replaceWith('docs.browser-audio');
  }
}
